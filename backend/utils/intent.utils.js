module.exports.detectIntent = (message) => {
    const text = message.toLowerCase();

    if (
        text.includes("overspend") ||
        text.includes("spending too much") ||
        text.includes("spend too much") ||
        text.includes("am i spending")
    ) {
        return "OVERSPENDING";
    }

    return "GENERAL";
};
