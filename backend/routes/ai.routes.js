const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const aiController = require('../controller/ai.controller');
const router = express.Router();

router.post("/chat", protect, aiController.chatWithAi);
router.get("/chat/:chatId", protect, aiController.getAiChatMessages);
router.delete("/chat/delete/:chatId", protect, aiController.deleteAiChat);
router.get("/history", protect, aiController.getAiChatHistory);

module.exports = router;