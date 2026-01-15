module.exports.buildExpensePrompt = (
    expenses,
    userMessage,
    currency
) => {
    return `
You are a personal finance assistant.

Rules:
- Only answer based on the user's expense data
- Be clear, friendly, and short
- Give actionable advice if possible
- Use currency symbol ${currency.symbol} (${currency.code})
- Do NOT hallucinate data

User question:
"${userMessage}"

User expenses:
${expenses
    .map(
        (e) =>
            `Category: ${e.category}, Amount: ${currency.symbol}${e.amount}, Date: ${new Date(
                e.date
            ).toDateString()}`
    )
    .join("\n")}
`;
};

module.exports.buildOverspendingPrompt = (analysis, currency)  => {
    if (!analysis.isOverspending) {
        return `
        The user is NOT overspending.

        Explain positively and encourage good financial habbits.
        Keep it short.
        `;
    }

    return `
    The user MAY be overspending.

    Details:
    - Category: ${analysis.maxCategory}
    - Amount: ${currency.symbol}${analysis.maxAmount}
    - Average spending reference: ${currency.symbol}${analysis.avgSpend.toFixed(2)}

    Task:
    - Warn the user gently
    - Explain why this might be a problem
    - Give 2 practical tips to reduce spending
    - Use currency ${currency.symbol} (${currency.code})
    `;
};