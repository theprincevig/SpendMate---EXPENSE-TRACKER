const Expense = require("../models/expense");
const AiChat = require("../models/aiChat.js");
const currencyConfig = require("../config/currency.Config.js");
const { getAIResponse, getOverspendingWarning } = require("../utils/ai.service");
const { analyzeOverspending } = require("../utils/overSpending.js");
const { detectIntent } = require("../utils/intent.utils.js");
const AiChatSession = require("../models/aiChatSession.js");
const { generateChatTitle } = require("../utils/chatTitleGenerator.js");

module.exports.chatWithAi = async (req, res) => {
    const { message, chatId } = req.body;
    const userId = req.user._id;

    if (!message) return res.status(400).json({ success: false, message: "Message is required." });

    try {
        let chatSession;

        // Create new chat if not exists
        if (!chatId) {
            chatSession = await AiChatSession.create({
                userId,
                title: message.slice(0, 40),
            });

        } else {
            chatSession = await AiChatSession.findById({ _id: chatId, userId});
            if (!chatSession) return res.status(404).json({ success: false, message: "Chat not found." });
        }
        
        // Save your message
        await AiChat.create({
            chatId: chatSession._id,
            role: "user",
            content: message
        });

        const expenses = await Expense.find({ userId });
        const currency = currencyConfig[req.user.currency] || currencyConfig.INR;
        
        let aiReply;
        if (!expenses.length) {
            aiReply = "You don’t have any expenses yet. Add some expenses and I’ll help you analyze them 😊";

        } else {
            const intent = detectIntent(message);
            aiReply = intent === "OVERSPENDING"
                    ? await getOverspendingWarning(analyzeOverspending(expenses), currency)
                    : await getAIResponse(expenses, message, currency);
        }

        // Save AI reply
        await AiChat.create({
            chatId: chatSession._id,
            role: "ai",
            content: aiReply
        });

        if(chatSession.isAutoTitle) {
            const messageCount = await AiChat.countDocuments({
                chatId: chatSession._id
            });

            if (messageCount >= 3) {
                const recentMessage = await AiChat.find({ chatId: chatSession._id })
                        .sort({ createdAt: 1 })
                        .limit(4);
                
                chatSession.title = generateChatTitle(recentMessage);
                chatSession.isAutoTitle = false;
            }
        }

        await chatSession.save();

        res.status(200).json({
            success: true,
            chatId: chatSession._id,
            reply: aiReply
        });

    } catch (error) {
        console.error("AI Chat Error:", error);
        
        if (error.code === "insufficient_quota") {
            return res.status(500).json({
                success: false,
                reply: "AI usage limit reached. Please try again later."
            });
        }

        res.status(500).json({ message: "AI service failed" });
    }
};

module.exports.getAiChatHistory = async (req, res) => {
    const userId = req.user._id;

    try {
        const chats = await AiChatSession.find({ userId }).sort({ updatedAt: -1 });        
        res.status(200).json(chats);

    } catch (error) {
        console.error("AI Chat History Error:", error);
        res.status(500).json({ message: "Failed to load chat history" });
    }
};

module.exports.getAiChatMessages = async (req, res) => {
    const { chatId } = req.params;
    const userId = req.user._id;

    try {
        const session = await AiChatSession.findOne({ _id: chatId, userId });
        if (!session) return res.status(404).json({ success: false, message: "Chat not found." });

        const messages = await AiChat.find({ chatId })
                .sort({ createdAt: 1 })
                .select("role content createdAt");

        res.status(200).json(messages);
    } catch (error) {
        console.error("Get chat messages Error:", error);
        res.status(500).json({ message: "Failed to load chat messages" });
    }
};

module.exports.deleteAiChat = async (req, res) => {
    const { chatId } = req.params;
    const userId = req.user._id;

    try {
        const session = await AiChatSession.findOne({ _id: chatId, userId });
        if (!session) return res.status(404).json({ success: false, message: "Chat not found." });

        // Delete all messages in the chat
        await AiChat.deleteMany({ chatId });
        await session.deleteOne(); // Delete chat session

        res.status(200).json({ success: true, message: "Chat deleted successfully!" });

    } catch (error) {
        console.error("Delete AI Chat Error:", error);
        res.status(500).json({ message: "Failed to delete chat" });
    }
};