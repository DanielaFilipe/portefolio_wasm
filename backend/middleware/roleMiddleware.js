// backend/middleware/roleMiddleware.js
exports.authorizeAdmin = function (req, res, next) {
    if (req.user && req.user.role === "admin") return next();
    return res.status(403).json({ message: "Acesso negado (admin)" });
};