const User = require('../models/user');
const { cloudinary } = require("../config/cloud.Config.js");
const currencyConfig = require('../config/currency.Config.js');

module.exports.viewProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId)
            .select("fullName, email, profilePic, dob, currency");
        
        if (!user) return res.status(404).json({ success: false, message: "User not found." });

        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Show profile error:", error);
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

        await updateUserFields(user, req);
        await user.save();

        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Update profile error:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// --------------------
// Helper function to update fields & cloudinary cleanup
// --------------------
async function updateUserFields(user, req) {
    const { fullName, email, dob, profilePic, currency } = req.body;  // ← Destructure body fields

    if (fullName !== undefined) user.fullName = fullName;   // ← Update fullName if provided
    if (email !== undefined) user.email = email;    // ← Update email if provided
    if (dob !== undefined) user.dob = new Date(dob);  // ← Update dob if provided

    // ---- Currency update ----
    if (currency !== undefined) {
        if (currencyConfig[currency]) {
            user.currency = currency;   // set {code, symbol}
        }
    }

    // --------------------
    // Remove profilePic if explicitly set to default
    // --------------------
    if (profilePic === "") {  // ← If request explicitly sets default avatar
        if (user.profilePic && user.profilePic.includes("res.cloudinary.com")) {    // ← If current pic is from Cloudinary
            try {
                const segments = user.profilePic.split("/");    // ← Split URL into path segments
                const publicIdWithExt = segments[segments.length - 1];  // ← Get filename with extension (e.g., abc.jpg)
                const publicId = `spendMate-cloudinary/${publicIdWithExt.split(".")[0]}`;   // ← Build Cloudinary public ID
                await cloudinary.uploader.destroy(publicId);    // ← Delete old image from Cloudinary
            } catch (error) {
                console.warn("Cloudinary deletion warning:", err.message);  // ⚠️ Would warn about delete failure
            }
        }
        user.profilePic = ""; // ← Reset to default avatar
    }

    // --------------------
    // Replace old profile pic if new one is uploaded
    // --------------------
    if (req.file) { // ← If a new file was uploaded in the request
        if (user.profilePic && user.profilePic.includes("res.cloudinary.com")) {    // ← If there is an old Cloudinary pic
            try {
                const segments = user.profilePic.split("/");    // ← Split URL to get filename
                const publicIdWithExt = segments[segments.length - 1];  // ← Extract filename.ext
                const publicId = `spendMate-cloudinary/${publicIdWithExt.split(".")[0]}`;   // ← Construct public ID
                await cloudinary.uploader.destroy(publicId);    // ← Delete old image from Cloudinary
            } catch (error) {
                console.warn("Cloudinary deletion warning:", err.message);  // ⚠️ Would warn about delete failure
            }
        }
        user.profilePic = ""; // ← Reset to default avatar
    }
}