const jwt = require("jsonwebtoken");
const userModel = require("../models/user.models");

async function authMiddleware(req, res, next) {
  try {
    // Get Token from Cookie or Authorization Header
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    // Token Missing
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Token is missing.",
      });
    }

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

    // Find User
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    // Attach User to Request
    req.user = user;

    // Go to Next Middleware / Controller
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access. Invalid or expired token.",
    });
  }
}

module.exports = {
  authMiddleware,
}