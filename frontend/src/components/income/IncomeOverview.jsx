import { useEffect, useState } from "react";
import { prepareIncomeBarChartData } from "../../lib/helper";
import { Plus } from "lucide-react";
import CustomBarChart from "../charts/CustomBarChart";

export default function IncomeOverview({ currency, transactions, onAddIncome }) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        // console.log("ChartData:", prepareIncomeBarChartData(transactions));
        setChartData(result);

    }, [transactions]);

    if (!currency) return null;

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div className="">
                    <h5 className="text-base sm:text-lg">Income Overview</h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your earnings over time and analyze your income trends.
                    </p>
                </div>

                <button
                    onClick={onAddIncome}
                    className="add-btn"
                >
                    <Plus size={16} />
                    Add Income
                </button>
            </div>

            <div className="mt-10">
                <CustomBarChart data={chartData} currency={currency} />
            </div>
        </div>
    );
}