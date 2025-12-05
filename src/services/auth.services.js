"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../config/prisma"));
const jwt_1 = require("../utils/jwt");
class AuthService {
    static async register(data) {
        const existing = await prisma_1.default.user.findUnique({ where: { email: data.email } });
        if (existing) {
            throw new Error("User already exists");
        }
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        //create user
        const user = await prisma_1.default.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
            }
        });
        //create root folder for user
        await prisma_1.default.folder.create({
            data: {
                name: "root",
                userId: user.id,
                parentId: null,
            }
        });
        const token = (0, jwt_1.signToken)({ userId: user.id, email: user.email });
        return { user, token };
    }
    static async login(data) {
        const user = await prisma_1.default.user.findUnique({ where: { email: data.email } });
        if (!user) {
            throw new Error("Invalid email or password");
        }
        const isMatch = await bcrypt_1.default.compare(data.password, user.password);
        if (!isMatch) {
            throw new Error("Invalid email or password");
        }
        const token = (0, jwt_1.signToken)({ userId: user.id, email: user.email });
        return { user, token };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.services.js.map