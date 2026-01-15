module.exports.generateChatTitle = (messages) => {
    if (!messages.length) return "New Chat";

    const combined = messages
        .map(m => m.content)
        .join(" ")
        .slice(0, 120);

    return combined
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .trim()
        .slice(0, 40);
};