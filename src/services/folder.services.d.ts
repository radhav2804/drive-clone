import { Folder } from "@prisma/client";
export declare class FolderService {
    static getOrCreateRootFolder(userId: number): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        parentId: number | null;
        userId: number;
    } | null>;
    static getFolderPath(folderId: number, userId: number): Promise<Folder[]>;
    static getFolderContents(userId: number, folderId?: number): Promise<{
        folder: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            parentId: number | null;
            userId: number;
        };
        subFolders: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            parentId: number | null;
            userId: number;
        }[];
        files: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            userId: number;
            path: string;
            size: number;
            mimeType: string;
            folderId: number | null;
        }[];
        breadcrumbs: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            parentId: number | null;
            userId: number;
        }[];
    }>;
    static createFolder(userId: number, name: string, parentId?: number): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        parentId: number | null;
        userId: number;
    }>;
    static renameFolder(userId: number, folderId: number, newName: string): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        parentId: number | null;
        userId: number;
    }>;
    static deleteFolder(userId: number, folderId: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
//# sourceMappingURL=folder.services.d.ts.map