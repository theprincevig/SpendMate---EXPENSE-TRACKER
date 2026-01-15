const express = require('express');
const router = express.Router();
const profileController = require('../controller/profile.controller.js');
const { protect } = require('../middleware/authMiddleware.js');
const multer = require('multer');
const { storage } = require('../config/cloud.Config.js');
const upload = multer({ storage });

router.route("/me")
        .get(
            protect,
            profileController.viewProfile
        )
        .put(
            protect,
            upload.single("profilePic"),
            profileController.updateProfile
        );

module.exports = router;