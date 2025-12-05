"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const file_services_1 = require("../services/file.services");
const path_1 = __importDefault(require("path"));
class FileController {
    static async upload(req, res) {
        try {
            const userId = req.user.id;
            const folderId = Number(req.query.folderId);
            console.log("folder id: ", folderId);
            const file = req.file;
            if (!file)
                throw new Error("File do not exists");
            const saved = await file_services_1.FileService.savefile(userId, folderId, file);
            console.log(saved);
            return res.status(201).json({
                message: "File uploaded successfully.",
                data: saved,
            });
        }
        catch (err) {
            return res.status(400).json({
                message: err.message
            });
        }
    }
    static async download(req, res) {
        try {
            const userId = req.user.id;
            const fileId = Number(req.params.id);
            const file = await file_services_1.FileService.getfile(userId, fileId);
            return res.download(path_1.default.resolve(file.path), file.name);
        }
        catch (err) {
            return res.status(400).json({
                message: err.message
            });
        }
    }
    static async delete(req, res) {
        try {
            const userId = req.user.id;
            const fileId = Number(req.params.id);
            const file = await file_services_1.FileService.deletefile(userId, fileId);
            return res.status(200).json({
                message: "file deleted",
                data: file,
            });
        }
        catch (err) {
            res.status(400).json({
                message: err.message
            });
        }
    }
}
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map