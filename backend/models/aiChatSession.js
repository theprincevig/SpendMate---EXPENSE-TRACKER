const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aiChatSessionSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    title: {
        type: String,
        default: "New Chat",
    },

    isAutoTitle: {
        type: Boolean,
        default: true
    },

    lastMessage: {
        type: String,
        default: ""
    }
}, { timestamps: true }
);

module.exports = mongoose.models.AiChatSession || mongoose.model("AiChatSession", aiChatSessionSchema);