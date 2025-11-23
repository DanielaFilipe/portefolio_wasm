// backend/routes/projectRoutes.js
const express = require("express");
const { getProjects, addProject } = require("../controllers/projectController");
const authenticate = require("../middleware/authMiddleware");
const { authorizeAdmin } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", getProjects);                                  // público
router.post("/", authenticate, authorizeAdmin, addProject);    // admin

module.exports = router;