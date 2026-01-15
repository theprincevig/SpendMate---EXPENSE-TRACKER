import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell,
    ResponsiveContainer
} from 'recharts';
import { formatAmount } from '../../lib/helper';

export default function CustomBarChart({ data, currency }) {
    if (!currency) return null;

    // Function to alternate colors
    function getBarColor(index) {
        return index % 2 === 0 ? "#74C476" : "#238845";
    }

    function CustomTooltip({ active, payload }) {
        if (!active || !payload || !payload.length) return null;

        const { source, amount } = payload[0].payload;

        return (
            <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                <p className="text-xs font-semibold text-green-800 mb-1">{source}</p>
                <p className="text-sm text-gray-600">
                    Amount:{" "}
                    <span className="text-sm font-medium text-gray-900">
                        {formatAmount(amount, currency)}
                    </span>
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white mt-6">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke='none' />

                    <XAxis dataKey='month' tick={{ fontSize: 12, fill: "#555" }} stroke='none' />
                    <YAxis 
                        tick={{ fontSize: 12, fill: "#555" }} 
                        stroke='none' 
                        tickFormatter={(value) => formatAmount(value, currency)}
                    />

                    <Tooltip content={CustomTooltip} />

                    <Bar 
                        dataKey="amount"
                        fill='#FF8042'
                        radius={[10, 10, 0, 0]}
                        activeDot={{ r: 8, fill: "yellow" }}
                        activeStyle={{ fill: "#15803D" }}
                    >
                        {Array.isArray(data) &&
                            data?.map((_, index) => (
                                <Cell key={index} fill={getBarColor(index)} />
                            ))
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}