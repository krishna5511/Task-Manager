const userModel = require("../models/user.models");
const bcrypt = require("bcryptjs");

const uploadFile = require("../service/storage.service");

// ======================
// GET PROFILE
// ======================
async function getProfile(req, res) {
  try {
    const user = await userModel.findById(req.user._id).select("-password");

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

// ======================
// UPDATE PROFILE
// ======================
async function updateProfile(req, res) {
  try {
    const { name, email, mobileNumber } = req.body;

    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email.trim().toLowerCase();
    if (mobileNumber) updateData.mobileNumber = mobileNumber;

    // Profile Image Upload (Optional)
    if (req.file) {
      const image = await uploadFile(req.file.buffer);

      updateData.profileImage = {
        url: image.url,
        publicId: image.fileId,
      };
    }

    const existingUser = await userModel.findOne({
      $or: [{ email }, { mobileNumber }],
      _id: { $ne: req.user._id },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email or mobile number already exists",
      });
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(req.user._id, updateData, {
        returnDocument: "after",
        runValidators: true,
      })
      .select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

// ======================
// CHANGE PASSWORD
// ======================
async function updatePassword(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Old password and new password are required",
      });
    }

    const user = await userModel.findById(req.user._id).select("+password");

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    user.password = newPassword;

    // pre("save") middleware automatically hash karega
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = {
  getProfile,
  updateProfile,
  updatePassword,
};
