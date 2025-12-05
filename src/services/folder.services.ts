import { success } from "zod";
import prisma from "../config/prisma";
import { Folder } from "@prisma/client";

export class FolderService {
  //safety net , we are already creating a root folder at the time of registration
  static async getOrCreateRootFolder(userId: number) {
    const root = await prisma.folder.findFirst({
      where: { userId, parentId: null },
    });

    if (!root) {
      await prisma.folder.create({
        data: {
          name: "root",
          parentId: null,
          userId,
        },
      });
    }
    return root;
  }

  static async getFolderPath(folderId: number, userId: number): Promise<Folder[]> {
    const path: Folder[] = [];
    let currentId: number | null = folderId;

    while (currentId !== null) {
      const currentFolder: Folder | null = await prisma.folder.findFirst({
        where: { id: currentId, userId },
      });

      if (!currentFolder) break;

      path.unshift(currentFolder);
      currentId = currentFolder.parentId;
    }

    return path;
  }

  static async getFolderContents(userId: number, folderId?: number) {
    //if no folderId is provided , get root folder contents
    const folder = folderId
      ? await prisma.folder.findFirst({
          where: { id: folderId, userId },
        })
      : await this.getOrCreateRootFolder(userId);

    //user id -> sare folders and files
    //folder id -> files and subfolders inside that folder
    if (!folder) {
      throw new Error("Folder not found");
    }

    const [subFolders, files, breadcrumbs] = await Promise.all([
      prisma.folder.findMany({
        where: { parentId: folder.id, userId },
      }),

      prisma.file.findMany({
        where: { folderId: folder.id, userId },
      }),
      
      this.getFolderPath(folder.id, userId),
    ]);

    return { folder, subFolders, files, breadcrumbs };
  }

  static async createFolder(userId: number, name: string, parentId?: number) {
    //if parentId is provided , check if it exists and belongs to user
    if (parentId) {
      const parent = await prisma.folder.findFirst({
        where: { id: parentId, userId },
      });

      if (!parent) {
        throw new Error(
          "Parent not found or access denied or not owned by the user"
        );
      }
    }

    const folder = await prisma.folder.create({
      data: {
        name,
        parentId: parentId || null,
        userId,
      },
    });

    return folder;
  }

  static async renameFolder(userId: number, folderId: number, newName: string) {
    const folder = await prisma.folder.findFirst({
      where: { id: folderId, userId },
    });

    if (!folder) {
      throw new Error("Folder not found or access denied");
    }

    //prevent renaming  root folder
    if (folder.parentId === null && folder.name === "root") {
      throw new Error("Cannot rename root folder");
    }
    const updatedFolder = await prisma.folder.update({
      where: { id: folderId },
      data: { name: newName },
    });
    return updatedFolder;
  }

  static async deleteFolder(userId: number, folderId: number) {
    const folder = await prisma.folder.findFirst({
      where: {
        id: folderId,
        userId,
      },
    });
    if (!folder) {
      throw new Error("Folder not found or access denied");
    }

    //protect root folder from deletion
    if (folder.parentId === null && folder.name === "root") {
      throw new Error("Cannot delete root folder");
    }

    //for now hard delete , for future - soft delete
    await prisma.file.deleteMany({
      where: { folderId: folder.id, userId },
    });
    await prisma.folder.deleteMany({
      where: { parentId: folder.id, userId },
    });

    await prisma.folder.delete({
      where: { id: folder.id, userId },
    });

    return { success: true, message: "Folder deleted successfully" };
  }
}
