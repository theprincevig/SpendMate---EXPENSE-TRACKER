import { useEffect, useState } from "react";
import { prepareExpenseLineChartData } from "../../lib/helper";
import { Plus } from "lucide-react";
import CustomLineChart from "../charts/CustomLineChart";

export default function ExpenseOverview({ currency, transactions, onAddExpense }) {
    const [chartData, setChartData] = useState([]);
    
    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        // console.log("ChartData:", prepareExpenseLineChartData(transactions));
        setChartData(result);

    }, [transactions]);

    if (!currency) return null;

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div className="">
                    <h5 className="text-base sm:text-lg">Expense Overview</h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your expenses over time and analyze your expense trends.
                    </p>
                </div>

                <button
                    onClick={onAddExpense}
                    className="add-btn"
                >
                    <Plus size={16} />
                    Add Expense
                </button>
            </div>

            <div className="mt-10">
                <CustomLineChart data={chartData} currency={currency} />
            </div>
        </div>
    );
}