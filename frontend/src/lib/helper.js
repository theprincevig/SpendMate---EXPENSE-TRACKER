import moment from "moment";
import { formatMessageDate } from "../utils/dateUtils";

export const getInitials = (name) => {
    if (!name) return "";
    return name
        .trim()
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("");
};

export const formatNumber = (num, currency) => {
    if (num === null || isNaN(num)) return "";
    return new Intl.NumberFormat(currency.locale).format(num);
};

export const prepareExpenseBarChartData = (data) => {
    if (!Array.isArray(data)) return [];

    return data.map((item) => ({
        category: item?.category,
        amount: Number(item?.amount)
    }));
};

export const prepareIncomeBarChartData = (data) => {
    if (!Array.isArray(data)) return [];

    const sortedData = [...data].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    let lastYear = null;    // track previous year

    return sortedData.map((item) => {
        const currYear = moment(item.date).year();

        // Base formatted date (Today / Yesterday / DD MMM YYYY)
        let formatted = formatMessageDate(item.date);

        // If year is same, hide year like you used before
        if (currYear === lastYear && formatted !== "Today" && formatted !== "Yesterday") {
            formatted = moment(item.date).format("Do MMM");
        }
        
        lastYear = currYear;

        return {
            source: item?.source,
            amount: Number(item?.amount),
            month: formatted
        }
    });
};

export const prepareExpenseLineChartData = (data) => {
    if (!Array.isArray(data)) return [];

    const sortedData = [...data].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    let lastYear = null;    // track previous year

    return sortedData.map((item) => {
        const currYear = moment(item.date).year();

        // Base formatted date (Today / Yesterday / DD MMM YYYY)
        let formatted = formatMessageDate(item.date);

        // If year is same, hide year like you used before
        if (currYear === lastYear && formatted !== "Today" && formatted !== "Yesterday") {
            formatted = moment(item.date).format("Do MMM");
        }
        
        lastYear = currYear;

        return {
            category: item?.category,
            amount: Number(item?.amount),
            month: formatted
        }
    });
};
