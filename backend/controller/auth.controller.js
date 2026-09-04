const User = require('../models/user');
const currencyConfig = require('../config/currency.Config.js');
const { generateTokenAndCookie, cookieOptions } = require('../utils/generateToken');
const {
    sendOtpEmail,
    sendPasswordResetEmail,
    sendSuccessEmail
} = require('../services/email.service.js');
const {
    generateOtp,
    saveOtp,
    verifyOtp,
    createResetToken,
    verifyResetToken,
    deleteResetToken
} = require('../services/otp.service.js');

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
            error: error.message
        });
    }
};

module.exports.registerUser = async (req, res) => {
    const { email, password, currency } = req.body;

    // Validation: check for missing fields
    if (!email || !password) {
        return res.status(400).json({ success: false, error: "All fields are required." });
    }

    try {
        // Check if email already exists
        const existing = await User.findOne({ email });

        if (existing) {
            return res.status(400).json({ success: false, error: "Email already in use" });
        }

        // Set default currency if not provided
        const selectedCurrency = currencyConfig[currency] ? currency : "INR";

        // Email verification
        const otp = generateOtp();
        await saveOtp(email, otp, "verify");
        await sendOtpEmail(email, otp);

        // Create the new user
        await User.create({
            email,
            password,
            currency: selectedCurrency
        });

        return res.status(201).json({
            success: true,
            message: "Signup successfully! Please verify your email to activate your account."
        });

    } catch (error) {
        console.error("Signup Error: ", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports.verifyEmail = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({
            success: false,
            error: "Email and OTP are required."
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found."
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                error: "Email is already verified."
            });
        }

        const isValid = await verifyOtp(email, otp, "verify");

        if (!isValid) {
            return res.status(400).json({
                success: false,
                error: "Invalid or expired OTP."
            });
        }

        user.isVerified = true;
        await user.save();

        generateTokenAndCookie(user._id, res);

        return res.status(200).json({
            success: true,
            message: "Email verified successfully!",
            user
        });

    } catch (error) {
        console.error("Email Verification Error:", error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, error: "All fields are required." });
    }

    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ success: false, error: "Invalid credentials." });
        }

        if (!user.isVerified) {
            return res.status(403).json({
                success: false,
                error: "Please verify your email before logging in."
            });
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

module.exports.logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", cookieOptions);
        return res.status(200).json({
            success: true,
            message: "Logged out successfully!"
        });

    } catch (error) {
        console.error("Logout Error: ", error);
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
                error: "Old password and new password are required."
            });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                error: "New password must be at least 8 characters."
            });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, error: "User not found." });

        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) return res.status(400).json({ success: false, error: "Old password is incorrect." });

        // Update password
        user.password = newPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully! Please login again."
        });

    } catch (error) {
        console.error("Change Password Error: ", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            error: "Email field is required."
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found."
            });
        }

        const otp = generateOtp();
        await saveOtp(email, otp, "reset");
        await sendOtpEmail(email, otp);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully!"
        });
    } catch (error) {
        console.error("Forgot Password Error: ", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports.verifyForgotPasswordOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({
            success: false,
            error: "Email and OTP are required."
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found."
            });
        }

        const isValid = await verifyOtp(email, otp, "reset");

        if (!isValid) {
            return res.status(400).json({
                success: false,
                error: "Invalid or expired OTP."
            });
        }

        const resetToken = await createResetToken(email);
        await sendPasswordResetEmail(email, resetToken);

        return res.status(200).json({
            success: true,
            message: "OTP verified! Password reset link has been sent to your email."
        });
    } catch (error) {
        console.error("Verify Forgot Password OTP Error: ", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports.resetPassword = async (req, res) => {
    const { newPassword } = req.body;
    const { token } = req.params;

    if (!token || !newPassword) {
        return res.status(400).json({
            success: false,
            error: "Reset token and new password are required."
        });
    }

    try {
        const email = await verifyResetToken(token);

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset token."
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        user.password = newPassword;
        await user.save();

        await deleteResetToken(token);
        await sendSuccessEmail(email);

        return res.status(200).json({
            success: true,
            message: "Password reset successfully!"
        });
    } catch (error) {
        console.error("Reset Password Error:", error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};