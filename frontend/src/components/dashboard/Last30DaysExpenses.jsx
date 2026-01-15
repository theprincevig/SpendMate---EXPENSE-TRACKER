import { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../lib/helper";
import CustomBarChart from "../charts/CustomBarChart";


export default function Last30DaysExpenses({ data, currency }) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setChartData(result);

        return () => {}
    }, [data]);

    if (!currency) return null;

    return (
        <div className="card col-span-1">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 30 Days Expenses</h5>
            </div>

            <CustomBarChart data={chartData} currency={currency} />
        </div>
    );
}