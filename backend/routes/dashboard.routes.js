const express = require('express');
const { protect } = require('../middleware/auth.middleware.js');
const { getDashboardData } = require('../controller/dashboard.controller');
const router = express.Router();

router.get(
    "/",
    protect,
    getDashboardData
);

module.exports = router;