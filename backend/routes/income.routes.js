const express = require('express');
const router = express.Router();
const incomeController = require('../controller/income.controller.js');
const { protect } = require('../middleware/authMiddleware.js');

router.post("/add", protect, incomeController.addIncome);
router.get("/get", protect, incomeController.getAllIncome);
router.get("/pdf", protect, incomeController.downloadIncomePdf);
router.delete("/delete/:id", protect, incomeController.deleteIncome);

module.exports = router;