export const validateExpense = (expenseData) => {
    const errors = {
        category: "",
        amount: "",
        date: "",
    };

    if (!expenseData.category?.trim()) {
        errors.category = "Category is required";
    }

    if (
        !expenseData.amount || 
        isNaN(expenseData.amount) || 
        Number(expenseData.amount) <= 0
    ) {
        errors.amount = "Amount should be a valid number greater than 0";
    }

    if (!expenseData.date) {
        errors.date = "Date is required";
    }

    return errors;
};

export const validateIncome = (incomeData) => {
    const errors = {
        source: "",
        amount: "",
        date: "",
    };

    if (!incomeData.source?.trim()) {
        errors.source = "Source is required";
    }

    if (
        !incomeData.amount || 
        isNaN(incomeData.amount) || 
        Number(incomeData.amount) <= 0
    ) {
        errors.amount = "Amount should be a valid number greater than 0";
    }

    if (!incomeData.date) {
        errors.date = "Date is required";
    }

    return errors;
};

export const hasErrors = (errors) => {
    return Object.values(errors).some((value) => {
        if (typeof value === "string") {
            return value !== "";
        }

        if (Array.isArray(value)) {
            return value.length > 0;
        }

        if (typeof value === "object" && value !== null) {
            return hasErrors(value);
        }

        return false;
    });
};
