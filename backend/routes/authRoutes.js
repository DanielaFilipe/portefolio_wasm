// backend/routes/authRoutes.js
const express = require("express");
const { register, login } = require("../controllers/authController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// Registo e Login
router.post("/register", register);
router.post("/login", login);

// DEBUG: retorna o payload do token que o servidor leu
router.get("/me", authenticate, (req, res) => {
    return res.json(req.user); // deve conter { id, username, role, iat, exp }
});

module.exports = router;