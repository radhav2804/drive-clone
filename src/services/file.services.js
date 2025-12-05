"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
class FileService {
    static async savefile(userId, folderId, file) {
        //we have to save file metadata in db
        if (folderId) {
            const folder = await prisma_1.default.folder.findFirst({
                where: { id: folderId, userId }
            });
            if (!folder) {
                throw new Error('folder not found or access denied');
            }
        }
        const savedfile = await prisma_1.default.file.create({
            data: {
                name: file.filename,
                path: file.path,
                size: file.size,
                mimeType: file.mimetype,
                folderId,
                userId,
            }
        });
        return savedfile;
    }
    static async getfile(userId, id) {
        const file = await prisma_1.default.file.findFirst({
            where: {
                id, userId
            }
        });
        if (!file) {
            throw new Error("file not found or access denied");
        }
        return file;
    }
    static async deletefile(userId, id) {
        const file = await prisma_1.default.file.findFirst({
            where: {
                id, userId
            }
        });
        if (!file) {
            throw new Error("file not found or access denied");
        }
        await prisma_1.default.file.delete({ where: { id, userId } });
        return file;
    }
}
exports.FileService = FileService;
//# sourceMappingURL=file.services.js.map