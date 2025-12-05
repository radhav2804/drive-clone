"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const folder_controller_1 = require("../controllers/folder.controller");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const router = (0, express_1.Router)();
router.get("/", auth_middlewares_1.requireAuth, folder_controller_1.FolderController.getContents);
router.post("/", auth_middlewares_1.requireAuth, folder_controller_1.FolderController.createFolder);
router.patch("/:id", auth_middlewares_1.requireAuth, folder_controller_1.FolderController.rename);
router.delete("/:id", auth_middlewares_1.requireAuth, folder_controller_1.FolderController.delete);
exports.default = router;
//# sourceMappingURL=folder.routes.js.map