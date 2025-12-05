"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_services_1 = require("../services/auth.services");
const auth_schema_1 = require("../schemes/auth.schema");
class AuthController {
    static async register(req, res) {
        try {
            const parsed = auth_schema_1.registerSchema.parse(req.body);
            const result = await auth_services_1.AuthService.register(parsed);
            res.status(201).json({ message: 'User registered successfully', data: result });
        }
        catch (err) {
            if (err?.name === "ZodError") {
                return res.status(400).json({ message: "Validation errors", errors: err.errors });
            }
            return res.status(400).json({ message: err.message || "Registration failed" });
        }
    }
    static async login(req, res) {
        try {
            const parsed = auth_schema_1.loginSchema.parse(req.body);
            const result = await auth_services_1.AuthService.login(parsed);
            return res.status(200).json({
                message: "Login successful", data: result
            });
        }
        catch (err) {
            if (err?.name === "ZodError") {
                return res.status(400).json({ message: "Validation errors", errors: err.errors });
            }
            return res.status(400).json({ message: err.message || "Login failed" });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map