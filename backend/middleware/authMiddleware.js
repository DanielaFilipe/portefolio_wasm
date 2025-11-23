
// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = function authenticate(req, res, next) {
    const header = req.header("Authorization");
    const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: "Token ausente" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ message: "Token inválido" });
    }
};