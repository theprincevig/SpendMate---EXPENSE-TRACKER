const Expense = require('../models/expense');
const PDFDocument = require('pdfkit');

// Add expense source
module.exports.addExpense = async (req, res) => {
    const userId = req.user._id;

    try {
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date),
        });

        await newExpense.save();

        return res.status(200).json(newExpense);

    } catch (error) {
        console.error("Add Expense Error: ", error);
        return res.status(500).json({
            success: false,
            message: "Error generating add expense",
            error: error.message
        });
    }
};

// Get all expense source
module.exports.getAllExpense = async (req, res) => {
    const userId = req.user._id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });
        return res.status(200).json(expense);

    } catch (error) {
        console.error("Get Expense Error: ", error);
        return res.status(500).json({
            success: false,
            message: "Error generating get all expense",
            error: error.message
        });
    }
};

// Download expense PDF file format
module.exports.downloadExpensePdf = async (req, res) => {
    const userId = req.user._id;
    
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        // PDF document
        const doc = new PDFDocument({ margin: 40 });

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=expenses.pdf");

        doc.pipe(res);
        
        // PDF Title
        doc.fontSize(20).text("Expense History", { align: "center", underline: true });
        doc.moveDown(2);

        // Table Header
        doc.fontSize(12).text("Category", 50, doc.y, { continued: true });
        doc.text("Amount", 220, doc.y, { continued: true });
        doc.text("Date", 350);
        doc.moveDown(0.5);

        expense.forEach((exp) => {
            doc.fontSize(10);

            doc.text(exp.category, 50, doc.y, { continued: true });
            doc.text(`₹${exp.amount}`, 220, doc.y, { continued: true });
            doc.text(new Date(exp.date).toDateString(), 350);

            doc.moveDown(0.5);
        });

        doc.end();

    } catch (error) {
        console.error("Download expense PDF Error:", error);
        return res.status(500).json({
            success: false,
            message: "Error generating expense PDF",
            error: error.message
        });
    }
};

// Delete expense source
module.exports.deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        await Expense.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Expense deleted successfully!" });

    } catch (error) {
        console.error("Delete Expense Error: ", error);
        return res.status(500).json({
            success: false,
            message: "Error generating delete expense",
            error: error.message
        });
    }
};