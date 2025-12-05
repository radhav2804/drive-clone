"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jwt_1 = require("../utils/jwt");
const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    try {
        const payload = (0, jwt_1.verifyToken)(token);
        req.user = {
            id: payload.userId,
            email: payload.email,
        };
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Invalid or expired token" });
        return;
    }
};
exports.requireAuth = requireAuth;
//# sourceMappingURL=auth.middlewares.js.map