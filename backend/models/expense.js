const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    icon: { type: String },

    category: {                         // E.g, Food, Rent, Groceries
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    },

}, { timestamps: true }
);

module.exports = mongoose.models.Expense || mongoose.model("Expense", expenseSchema);