import Input from "../inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";
import { Plus } from "lucide-react";

export default function AddIncomeForm({
    incomeFormData,
    setIncomeFormData,
    onAddIncome
}) {
    const handleChange = (field) => (e) => {
        setIncomeFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    return (
        <div>
            <EmojiPickerPopup 
                icon={incomeFormData.icon}
                onSelected={handleChange("icon")}
            />

            <Input 
                type="text"
                placeholder="Freelance, Salary, etc."
                value={incomeFormData.source}
                label="Income Source"
                onChange={handleChange("source")}
            />

            <Input 
                type="number"
                placeholder="Add Amount"
                value={incomeFormData.amount}
                label="Amount"
                onChange={handleChange("amount")}
            />

            <Input 
                type="date"
                placeholder=""
                value={incomeFormData.date}
                label="Date"
                onChange={handleChange("date")}
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