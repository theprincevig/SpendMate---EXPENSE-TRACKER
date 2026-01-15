import { COLOR_ARRAY } from "../../theme/color";
import CustomPieChart from "../charts/CustomPieChart";

export default function FinanceOverview({ currency, totalBalance, totalIncome, totalExpense }) {
    const balanceData = [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Income", amount: totalIncome },
        { name: "Total Expenses", amount: totalExpense },
    ];

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-xl">Financial Overview</h5>
            </div>

            <CustomPieChart 
                data={balanceData}
                label="Total Balance"
                totalAmount={totalBalance}
                currency={currency}
                colors={COLOR_ARRAY}
                showTextAnchor
            />
        </div>
    );
}