"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const folder_routes_1 = __importDefault(require("./folder.routes"));
const file_routes_1 = __importDefault(require("./file.routes"));
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_1.default);
router.use('/folders', folder_routes_1.default);
router.use('/files', file_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map