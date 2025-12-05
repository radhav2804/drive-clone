"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_controller_1 = require("../controllers/file.controller");
const multer_1 = __importDefault(require("multer"));
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const express_1 = require("express");
const multer_2 = require("../config/multer");
const router = (0, express_1.Router)();
router.post("/upload", auth_middlewares_1.requireAuth, (req, res, next) => {
    const userId = req.user.id;
    // Get folderId from query params instead of body for now
    const folderId = Number(req.query.folderId) || 0;
    console.log("Folder id insife routes: ", folderId);
    const upload = (0, multer_1.default)({ storage: (0, multer_2.getStorage)(userId, folderId) });
    upload.single('file')(req, res, next);
}, file_controller_1.FileController.upload);
router.get("/:id/download", auth_middlewares_1.requireAuth, file_controller_1.FileController.download);
router.delete("/:id", auth_middlewares_1.requireAuth, file_controller_1.FileController.delete);
exports.default = router;
//# sourceMappingURL=file.routes.js.map