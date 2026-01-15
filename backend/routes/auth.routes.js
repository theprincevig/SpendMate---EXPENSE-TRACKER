const express = require('express');
const router = express.Router();
const authController = require("../controller/auth.controller.js");
const { protect } = require('../middleware/authMiddleware');

router.get("/me", protect, authController.checkAuth);
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", protect, authController.logoutUser);
router.get("/getUser", protect, authController.getUserInfo);

router.post("/change-password", protect, authController.changePassword);

module.exports = router;