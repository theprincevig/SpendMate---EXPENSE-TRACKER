const express = require('express');
const router = express.Router();
const authController = require("../controller/auth.controller.js");
const { protect } = require('../middleware/auth.middleware.js');

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

router.post("/verify-email", authController.verifyEmail);

router.post("/forgot-password", authController.forgotPassword);
router.post("/forgot-password-otp/verify", authController.verifyForgotPasswordOtp);

router.post("/reset-password/:token", authController.resetPassword);

router.get(
    "/session",
    protect,
    authController.checkAuth
);

router.post(
    "/change-password",
    protect,
    authController.changePassword
);

router.delete(
    "/logout",
    protect,
    authController.logoutUser
);

module.exports = router;