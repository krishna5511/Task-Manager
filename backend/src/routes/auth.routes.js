const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

//post /api/auth/signUp
router.post("/signup",authController.signUpControllers);
//post /api/auth/logIn
router.post("/logIn",authController.logInControllers);
//post /api/auth/logOut
router.post("/logOut",authController.logOutControllers);
module.exports = router;