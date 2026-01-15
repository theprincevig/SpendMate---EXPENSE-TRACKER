const Income = require('../models/income');
const PDFDocument = require('pdfkit');

// Add income source
module.exports.addIncome = async (req, res) => {
    const userId = req.user._id;

    try {
        const { icon, source, amount, date } = req.body;

        // Validation: check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date),
        });

        await newIncome.save();

        return res.status(200).json(newIncome);

    } catch (error) {
        console.error("Add Income Error: ", error);
        return res.status(500).json({
            success: false,
            message: "Error generating add income",
            error: error.message
        });
    }
};

// Get all income source
module.exports.getAllIncome = async (req, res) => {
    const userId = req.user._id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        return res.status(200).json(income);

    } catch (error) {
        console.error("Get Income Error: ", error);
        return res.status(500).json({
            success: false,
            message: "Error generating get all income",
            error: error.message
        });
    }
};

// Download income PDF file format
module.exports.downloadIncomePdf = async (req, res) => {
    const userId = req.user._id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        // PDF document
        const doc = new PDFDocument({ margin: 40 });

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=incomes.pdf");

        doc.pipe(res);
        
        // PDF Title
        doc.fontSize(20).text("Income History", { align: "center", underline: true });
        doc.moveDown(2);

        // Table Header
        doc.fontSize(12).text("Source", 50, doc.y, { continued: true });
        doc.text("Amount", 220, doc.y, { continued: true });
        doc.text("Date", 350);
        doc.moveDown(0.5);

        income.forEach((inc) => {
            doc.fontSize(10);

            doc.text(inc.source, 50, doc.y, { continued: true });
            doc.text(`₹${inc.amount}`, 220, doc.y, { continued: true });
            doc.text(new Date(inc.date).toDateString(), 350);

            doc.moveDown(0.5);
        });

        doc.end();

    } catch (error) {
        console.error("Download Income PDF Error:", error);
        return res.status(500).json({
            success: false,
            message: "Error generating income PDF",
            error: error.message
        });
    }
};

// Delete income source
module.exports.deleteIncome = async (req, res) => {
    const { id } = req.params;

    try {
        await Income.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Income deleted successfully!" });

    } catch (error) {
        console.error("Delete Income Error: ", error);
        return res.status(500).json({
            success: false,
            message: "Error generating delete income",
            error: error.message
        });
    }
};