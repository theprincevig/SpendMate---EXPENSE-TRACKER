const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    icon: { type: String },

    source: {                           // Eg., Salary, Freelance, etc.
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
    }
}, { timestamps: true }
);

module.exports = mongoose.models.Income || mongoose.model("Income", incomeSchema);