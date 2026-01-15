import { Plus } from "lucide-react";
import EmojiPickerPopup from "../EmojiPickerPopup";
import Input from "../inputs/Input";

export default function AddExpenseForm({ expenseFormData, setExpenseFormData, onAddExpense }) {
    function handleChange(field, value) {
        setExpenseFormData((prev) => ({ ...prev, [field]: value }));
    }
    
    return (
        <>
            <EmojiPickerPopup 
                icon={expenseFormData.icon}
                onSelected={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input 
                type="text"
                placeholder="Rent, Groceries, Clothes, etc."
                value={expenseFormData.category}
                label="Expense Category"
                onChange={({ target }) => handleChange("category", target.value)}
            />

            <Input 
                type="number"
                placeholder="Add Amount"
                value={expenseFormData.amount}
                label="Amount"
                onChange={({ target }) => handleChange("amount", target.value)}
            />

            <Input 
                type="date"
                placeholder=""
                value={expenseFormData.date}
                label="Date"
                onChange={({ target }) => handleChange("date", target.value)}
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