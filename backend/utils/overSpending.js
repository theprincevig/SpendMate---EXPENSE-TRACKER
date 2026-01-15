module.exports.analyzeOverspending = (expenses) => {
    if (!expenses.length) {
        return {
            isOverspending: false,
            reason: "No expenses found."
        };
    }

    const categoryTotals = {};
    let totalSpent = 0;

    expenses.forEach((e) => {
        totalSpent += e.amount;
        categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    });

    const avgSpend = totalSpent / expenses.length;

    // Find highest category
    let maxCategory = null;
    let maxAmount = 0;

    for (const category in categoryTotals) {
        if (categoryTotals[category] > maxAmount) {
            maxAmount = categoryTotals[category];
            maxCategory = category;
        }
    }

    // Overspending rule (simple & understandable)
    const isOverspending = maxAmount > avgSpend * 2;

    return {
        isOverspending,
        maxCategory,
        maxAmount,
        avgSpend,
        categoryTotals
    }
};