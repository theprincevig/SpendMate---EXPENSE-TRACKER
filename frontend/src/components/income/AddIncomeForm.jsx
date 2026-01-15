import Input from "../inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";
import { Plus } from "lucide-react";

export default function AddIncomeForm({ incomeFormData, setIncomeFormData, onAddIncome }) {
    function handleChange(field, value) {
        setIncomeFormData((prev) => ({ ...prev, [field]: value }));
    }

    return (
        <div>
            <EmojiPickerPopup 
                icon={incomeFormData.icon}
                onSelected={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input 
                type="text"
                placeholder="Freelance, Salary, etc."
                value={incomeFormData.source}
                label="Income Source"
                onChange={({ target }) => handleChange("source", target.value)}
            />

            <Input 
                type="number"
                placeholder="Add Amount"
                value={incomeFormData.amount}
                label="Amount"
                onChange={({ target }) => handleChange("amount", target.value)}
            />

            <Input 
                type="date"
                placeholder=""
                value={incomeFormData.date}
                label="Date"
                onChange={({ target }) => handleChange("date", target.value)}
            />

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    onClick={onAddIncome}
                    className="add-btn hover:add-btn-fill"
                >
                    Add <Plus size={14} />
                </button>
            </div>
        </div>
    );
}