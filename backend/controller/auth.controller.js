const User = require('../models/user');
const currencyConfig = require('../config/currency.Config.js');
const { generateTokenAndCookie } = require('../utils/generateToken');

module.exports.checkAuth = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (error) {
        console.error("Check Auth Error: ", error);
        return res.status(500).json({
            success: false,
            message: "Error check auth user",
            error: error.message
        });
    }
};

module.exports.registerUser = async (req, res) => {
    const { email, password, currency } = req.body;

    // Validation: check for missing fields
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    try {
        // Check if email already exists
        const existing = await User.findOne({ email });
        
        if (existing) return res.status(400).json({ success: false, message: "Email already in use" });

        // Set default currency if not provided
        const selectedCurrency = currencyConfig[currency] ? currency : "INR";

        // Create the new user
        const user = await User.create({
            email,
            password,
            currency: selectedCurrency
        });
        generateTokenAndCookie(user._id, res);

        return res.status(201).json({
            success: true,
            message: "Signup successfully!",
            user,
        });

    } catch (error) {
        console.error("Signup Error: ", error);
        return res.status(500).json({
            success: false,
            message: "Error registering user",
            error: error.message
        });
    }
};

module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ success: false, message: "Invalid credentials." });
        }

        generateTokenAndCookie(user._id, res);

        return res.status(200).json({
            success: true,
            message: "Login successfully!",
            user
        });

    } catch (error) {
        console.error("Login Error: ", error);
        return res.status(500).json({
            success: false,            
            error: error.message
        });
    }

};

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0)
}
module.exports.logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", cookieOptions);
        return res.status(200).json({
            success: true,
            message: "Logged out successfully!"
        });

    } catch (error) {
        console.error("Logout Error: ", error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

module.exports.getUserInfo = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select("-password");

        if (!user) return res.status(404).json({ success: false, message: "User not found." });

        return res.status(200).json({
            success: true,
            user: {
                ...user.toObject(),
                currencyDetails: currencyConfig[user.currency]
            }
        });

    } catch (error) {
        console.error("User info Error: ", error);
        return res.status(500).json({
            success: false,            
            error: error.message
        });
    }
};

module.exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user._id;

    try {
        // Validation
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Old password and new password are required."
            });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: "New password must be at least 8 characters."
            });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found." });

        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) return res.status(400).json({ success: false, message: "Old password is incorrect." });

        // Update password
        user.password = newPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully. Please login again."
        });

    } catch (error) {
        console.error("Change password Error: ", error);
        return res.status(500).json({
            success: false,
            message: "Server error while changing password."
        });
    }
};
