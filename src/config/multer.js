"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStorage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const getStorage = (userId, folderId) => {
    const uploadPath = path_1.default.join("storage", `user_${userId}`, `folder_${folderId}`);
    fs_1.default.mkdirSync(uploadPath, { recursive: true });
    return multer_1.default.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, uploadPath);
        },
        filename: (_req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = path_1.default.extname(file.originalname);
            const baseName = path_1.default.basename(file.originalname, ext);
            cb(null, `${baseName}-${uniqueSuffix}${ext}`);
        },
    });
};
exports.getStorage = getStorage;
//# sourceMappingURL=multer.js.map