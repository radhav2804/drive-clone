export declare class FileService {
    static savefile(userId: number, folderId: number, file: Express.Multer.File): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        path: string;
        size: number;
        mimeType: string;
        folderId: number | null;
    }>;
    static getfile(userId: number, id: number): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        path: string;
        size: number;
        mimeType: string;
        folderId: number | null;
    }>;
    static deletefile(userId: number, id: number): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        path: string;
        size: number;
        mimeType: string;
        folderId: number | null;
    }>;
}
//# sourceMappingURL=file.services.d.ts.map