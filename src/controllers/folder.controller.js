"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderController = void 0;
const folder_services_1 = require("../services/folder.services");
const folder_schema_1 = require("../schemes/folder.schema");
class FolderController {
    static async getContents(req, res) {
        try {
            console.log("Reaching : ", req);
            const userId = req.user.id;
            const folderIdParam = req.query.folderId;
            const folderId = folderIdParam ? Number(folderIdParam) : undefined;
            const result = await folder_services_1.FolderService.getFolderContents(userId, folderId);
            return res.status(200).json({
                message: "Folder contents fetched successfully",
                data: result,
            });
        }
        catch (err) {
            return res.status(400).json({
                message: err.message || "Failed to fetch folder contents"
            });
        }
    }
    static async createFolder(req, res) {
        try {
            const userId = req.user.id;
            const parsed = folder_schema_1.createFolderSchema.parse(req.body);
            const folder = await folder_services_1.FolderService.createFolder(userId, parsed.name, parsed.parentId);
            return res.status(201).json({
                message: "Folder created successfully",
                data: folder,
            });
        }
        catch (err) {
            if (err?.name === "ZodError") {
                return res.status(400).json({ message: "Validation errors", errors: err.errors });
            }
            return res.status(400).json({
                message: err.message || "Failed to create folder"
            });
        }
    }
    static async rename(req, res) {
        try {
            console.log("===== RENAME DEBUG =====");
            console.log("Request body:", req.body);
            console.log("Request params:", req.params);
            console.log("User:", req.user);
            const userId = req.user.id;
            const folderId = Number(req.params.id);
            console.log("Parsed userId:", userId);
            console.log("Parsed folderId:", folderId);
            const parsed = folder_schema_1.renameFolderSchema.parse(req.body);
            const updated = await folder_services_1.FolderService.renameFolder(userId, folderId, parsed.name);
            return res.status(200).json({
                message: "FOlder renamed successfully",
                data: updated,
            });
        }
        catch (err) {
            console.log("===== ERROR CAUGHT =====");
            console.log("Error name:", err?.name);
            console.log("Error message:", err?.message);
            console.log("Full error:", err);
            if (err?.name === "ZodError") {
                return res.status(400).json({
                    message: "Validation error",
                });
            }
            return res.status(400).json({
                message: err.message || "Failed to rename folder"
            });
        }
    }
    static async delete(req, res) {
        try {
            const userId = req.user.id;
            const folderId = Number(req.params.id);
            const result = await folder_services_1.FolderService.deleteFolder(userId, folderId);
            return res.status(200).json({
                message: "Folder deleted successfully",
                data: result,
            });
        }
        catch (err) {
            return res.status(400).json({
                message: err.message || "Failed to delete folder"
            });
        }
    }
}
exports.FolderController = FolderController;
//# sourceMappingURL=folder.controller.js.map