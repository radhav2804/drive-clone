"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameFolderSchema = exports.createFolderSchema = void 0;
const zod_1 = require("zod");
exports.createFolderSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Folder name must be at least 1 character long"),
    parentId: zod_1.z.number().int().positive().optional(),
});
exports.renameFolderSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Folder name must be at least 1 character long"),
});
//# sourceMappingURL=folder.schema.js.map