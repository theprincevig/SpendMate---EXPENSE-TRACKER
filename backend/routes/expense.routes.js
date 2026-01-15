const express = require('express');
const router = express.Router();
const expenseController = require('../controller/expense.controller.js');
const { protect } = require('../middleware/authMiddleware.js');

router.post("/add", protect, expenseController.addExpense);
router.get("/get", protect, expenseController.getAllExpense);
router.get("/pdf", protect, expenseController.downloadExpensePdf);
router.delete("/delete/:id", protect, expenseController.deleteExpense);

module.exports = router;