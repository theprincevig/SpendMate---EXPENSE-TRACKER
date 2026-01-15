const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    fullName: {
        type: String,
        default: ""
    },

    dob: {
        type: Date,
        default: null
    },

    profilePic: {
        type: String,
        default: "",
    },
    
    currency: {
        type: String,
        enum: ["INR", "USD", "EUR"],
        default: "INR"
    }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.models.User || mongoose.model("User", userSchema);