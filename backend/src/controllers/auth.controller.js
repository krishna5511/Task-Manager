const userModel = require("../models/user.models");
const bcrypt = require("bcryptjs")
const {generateToken} = require("../utils/generateToken")
const uploadFile = require("../service/storage.service");
async function signUpControllers(req, res) {
  try {
    const { name, email, mobileNumber, password } = req.body;

    // Validation
    if (!name || !email || !mobileNumber || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Normalize Email
    const normalizedEmail = email.trim().toLowerCase();

    // Check Existing User
    const isUserAlreadyExist = await userModel.findOne({
      $or: [
        { email: normalizedEmail },
        { mobileNumber }
      ],
    });

    if (isUserAlreadyExist) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create User
    // Password hashing automatically hoga model ke pre('save') middleware me
    const user = await userModel.create({
      name,
      email: normalizedEmail,
      mobileNumber,
      password,
    });

    // Generate JWT
    const token = generateToken(user, res);

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    console.error("Signup Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
}

async function logInControllers(req, res) {
  try {
    let { email, mobileNumber, password } = req.body;

    // Validation
    if ((!email && !mobileNumber) || !password) {
      return res.status(400).json({
        success: false,
        message: "Email/Mobile Number and Password are required",
      });
    }

    // Normalize Email
    if (email) {
      email = email.trim().toLowerCase();
    }

    // Find User
    const user = await userModel
      .findOne({
        $or: [
          { email },
          { mobileNumber }
        ],
      })
      .select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email/mobile number or password",
      });
    }

    // Compare Password
   const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email/mobile number or password",
      });
    }

    // Generate JWT
const token = generateToken(user, res);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
}
async function logOutControllers(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
}
module.exports = {
  signUpControllers,
  logInControllers,
  logOutControllers
};