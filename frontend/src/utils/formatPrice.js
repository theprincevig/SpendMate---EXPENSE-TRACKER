import { currencyConfig } from "../config/currency.Config";
import { convertPrice } from "./convertPrice";

export const formatPrice = ({
    amount,
    userCurrency,
    rates
}) => {
    const convertedAmount = convertPrice({
        amount,
        fromCurrency: "INR",
        toCurrency: userCurrency,
        rates
    });

    if (!convertedAmount) return amount;

    // console.log("userCurrency:", userCurrency);
    // console.log("currencyConfig:", currencyConfig);
    // console.log("config for currency:", currencyConfig[userCurrency]);

    const config = currencyConfig[userCurrency];

    if (!config) {
        console.error("Invalid currency:", userCurrency);
        return amount;
    }
                    
    return new Intl.NumberFormat(
        config.locale,
        {
            style: "currency",
            currency: userCurrency
        }
    ).format(convertedAmount);
};