const express = require("express");

const router = express.Router();

const dashboardController = require("../controllers/dashboard.controller");

const authMiddleware = require("../middleware/auth.middleware");

// GET /api/dashboard
router.get(
  "/",
  authMiddleware.authMiddleware,
  dashboardController.getDashboard
);

module.exports = router;