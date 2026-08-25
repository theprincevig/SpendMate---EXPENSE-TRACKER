export const convertPrice = ({
    amount,
    fromCurrency,
    toCurrency,
    rates
}) => {
    if (fromCurrency === toCurrency) {
        return amount;
    }

    if (!rates || Object.keys(rates).length === 0) {
        return null;
    }

    const targetRate = rates[toCurrency];
    if (!targetRate) {
        console.error(`Exchange rate not found for ${toCurrency}`);
        return null;
    }

    // INR -> target
    if (fromCurrency === "INR") {
        return amount * targetRate;
    }

     // source -> INR
    const sourceRate = rates[fromCurrency];
    if (!sourceRate) {
        console.error(`Exchange rate not found for ${fromCurrency}`);
        return null;
    }

    const amountInINR = amount / sourceRate;

    return amountInINR * targetRate;
};