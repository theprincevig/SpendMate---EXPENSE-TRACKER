import { Plus } from "lucide-react";
import EmojiPickerPopup from "../EmojiPickerPopup";
import Input from "../inputs/Input";

export default function AddExpenseForm({
    expenseFormData,
    setExpenseFormData,
    onAddExpense
}) {
    const handleChange = (field) => (e) => {
        setExpenseFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };
    
    return (
        <>
            <EmojiPickerPopup 
                icon={expenseFormData.icon}
                onSelected={(selectedIcon) => {
                    setExpenseFormData(prev => ({
                        ...prev,
                        icon: selectedIcon
                    }));
                }}
            />

            <Input 
                type="text"
                placeholder="Rent, Groceries, Clothes, etc."
                value={expenseFormData.category}
                label="Expense Category"
                onChange={handleChange("category")}
            />

            <Input 
                type="number"
                placeholder="Add Amount"
                value={expenseFormData.amount}
                label="Amount"
                onChange={handleChange("amount")}
            />

            <Input 
                type="date"
                placeholder=""
                value={expenseFormData.date}
                label="Date"
                onChange={handleChange("date")}
            />
            
            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    onClick={onAddExpense}
                    className="add-btn hover:add-btn-fill"
                >
                    Add <Plus size={14} />
                </button>
            </div>
        </>
    );
}