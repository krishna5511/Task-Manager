const express = require("express");
const router = express.Router();
const  authMiddleware  = require("../middleware/auth.middleware");
const userController = require("../controllers/user.controller");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.get("/profile",authMiddleware.authMiddleware,userController.getProfile);
router.patch("/profile",authMiddleware.authMiddleware,upload.single("profileImage"),userController.updateProfile);
router.patch("/change-password",authMiddleware.authMiddleware,userController.updatePassword);

module.exports = router;