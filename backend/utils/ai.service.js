const OpenAI = require("openai");
const { buildExpensePrompt, buildOverspendingPrompt } = require("../config/ai.Config.js");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function callAI(prompt) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a strict personal finance assistant. Never invent data." },
                { role: "user", content: prompt }
            ],
            temperature: 0.4
        });

        return completion.choices[0].message.content;
    } catch (error) {
        if (error.code === "insufficient_quota") {
            throw new Error("AI_QUOTA_EXCEEDED");
        }
        throw error;
    }
}

module.exports = { 
    getAIResponse: async (expenses, userMessage, currency) => {
        if (!expenses.length) {
            return "You haven't added any expenses yet. Start by adding your expenses so I can help you better 🙂";
        }

        const prompt = buildExpensePrompt(expenses, userMessage, currency);
        return callAI(prompt);
    },

    getOverspendingWarning: async (analysis, currency) => {
        const prompt = buildOverspendingPrompt(analysis, currency);
        return callAI(prompt);
    }
}
