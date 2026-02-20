// =======================
// Imports
// =======================
const User = require('../models/user');
const { cloudinary } = require("../config/cloud.Config.js");
const mongoose = require("mongoose");
const currencyConfig = require('../config/currency.Config.js');

// =======================
// Helpers
// =======================
const SAFE_FIELDS = "fullName email profilePic dob currency";

const deleteFromCloudinary = async (imageUrl) => {
  if (!imageUrl || !imageUrl.includes("res.cloudinary.com")) return;

  try {
    const publicId = imageUrl.split("/").slice(-2).join("/").split(".")[0];

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.warn("Cloudinary delete failed:", error.message);
  }
};

const applyProfileUpdates = async (user, req) => {
  const { fullName, email, dob, profilePic, currency } = req.body;

  if (fullName !== undefined) user.fullName = fullName;
  if (dob !== undefined) user.dob = dob;

  if (email !== undefined && email !== user.email) {
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
      _id: { $ne: user._id }  // Exclude current user
    });

    if (existingUser) throw new Error("Email has been already taken");

    user.email = email.toLowerCase();
  }

  // ---- Currency update ----
  if (currency !== undefined) {
    if (currencyConfig[currency]) {
        user.currency = currency;   // set {code, symbol}
    }
  }

  // Reset to default avatar
  if (profilePic === "/images/avatar.png") {
    await deleteFromCloudinary(user.profilePic);
    user.profilePic = "/images/avatar.png";
  }

  // New image uploaded
  if (req.file) {
    await deleteFromCloudinary(user.profilePic);
    user.profilePic = req.file.path;
  }
};

module.exports.viewProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
            success: false,
            error: "Invalid user id",
            });
        }

        const user = await User.findById(userId).select(SAFE_FIELDS);
        
        if (!user) return res.status(404).json({ success: false, message: "User not found." });

        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("View profile error:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ success: false, message: "User not found." });

        await applyProfileUpdates(user, req);
        await user.save();

        const updatedUser = await User.findById(userId).select(SAFE_FIELDS);

        return res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        if (error.message === "Email already taken") {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }
        console.error("Update profile error:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
