"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
class FolderService {
    //safety net , we are already creating a root folder at the time of registration
    static async getOrCreateRootFolder(userId) {
        const root = await prisma_1.default.folder.findFirst({
            where: { userId, parentId: null },
        });
        if (!root) {
            await prisma_1.default.folder.create({
                data: {
                    name: "root",
                    parentId: null,
                    userId,
                },
            });
        }
        return root;
    }
    static async getFolderPath(folderId, userId) {
        const path = [];
        let currentId = folderId;
        while (currentId !== null) {
            const currentFolder = await prisma_1.default.folder.findFirst({
                where: { id: currentId, userId },
            });
            if (!currentFolder)
                break;
            path.unshift(currentFolder);
            currentId = currentFolder.parentId;
        }
        return path;
    }
    static async getFolderContents(userId, folderId) {
        //if no folderId is provided , get root folder contents
        const folder = folderId
            ? await prisma_1.default.folder.findFirst({
                where: { id: folderId, userId },
            })
            : await this.getOrCreateRootFolder(userId);
        //user id -> sare folders and files
        //folder id -> files and subfolders inside that folder
        if (!folder) {
            throw new Error("Folder not found");
        }
        const [subFolders, files, breadcrumbs] = await Promise.all([
            prisma_1.default.folder.findMany({
                where: { parentId: folder.id, userId },
            }),
            prisma_1.default.file.findMany({
                where: { folderId: folder.id, userId },
            }),
            this.getFolderPath(folder.id, userId),
        ]);
        return { folder, subFolders, files, breadcrumbs };
    }
    static async createFolder(userId, name, parentId) {
        //if parentId is provided , check if it exists and belongs to user
        if (parentId) {
            const parent = await prisma_1.default.folder.findFirst({
                where: { id: parentId, userId },
            });
            if (!parent) {
                throw new Error("Parent not found or access denied or not owned by the user");
            }
        }
        const folder = await prisma_1.default.folder.create({
            data: {
                name,
                parentId: parentId || null,
                userId,
            },
        });
        return folder;
    }
    static async renameFolder(userId, folderId, newName) {
        const folder = await prisma_1.default.folder.findFirst({
            where: { id: folderId, userId },
        });
        if (!folder) {
            throw new Error("Folder not found or access denied");
        }
        //prevent renaming  root folder
        if (folder.parentId === null && folder.name === "root") {
            throw new Error("Cannot rename root folder");
        }
        const updatedFolder = await prisma_1.default.folder.update({
            where: { id: folderId },
            data: { name: newName },
        });
        return updatedFolder;
    }
    static async deleteFolder(userId, folderId) {
        const folder = await prisma_1.default.folder.findFirst({
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
        await prisma_1.default.file.deleteMany({
            where: { folderId: folder.id, userId },
        });
        await prisma_1.default.folder.deleteMany({
            where: { parentId: folder.id, userId },
        });
        await prisma_1.default.folder.delete({
            where: { id: folder.id, userId },
        });
        return { success: true, message: "Folder deleted successfully" };
    }
}
exports.FolderService = FolderService;
//# sourceMappingURL=folder.services.js.map