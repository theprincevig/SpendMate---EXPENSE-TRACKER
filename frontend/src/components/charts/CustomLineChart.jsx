import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { formatAmount } from '../../lib/helper';

export default function CustomLineChart({ data, currency }) {
    if (!currency) return null;

    function CustomTooltip({ active, payload }) {
        if (!active || !payload || !payload.length) return null;

        const { category, amount } = payload[0].payload;
    
        return (
            <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                <p className="text-xs font-semibold text-red-800 mb-1">{category}</p>
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
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id='incomeGradient' x1='0' y1='0' x2='0' y2='1'>
                            <stop offset="50%" stopColor='#E42222' stopOpacity={0.4} />
                            <stop offset="95%" stopColor='#E42222' stopOpacity={0} />

                        </linearGradient>
                    </defs>

                    <CartesianGrid stroke='none' />
                    <XAxis dataKey='month' tick={{ fontSize: 12, fill: "#555" }} stroke='none' />
                    <YAxis 
                        tick={{ fontSize: 12, fill: "#555" }} 
                        stroke='none' 
                        tickFormatter={(value) => formatAmount(value, currency)}
                    />

                    <Tooltip content={CustomTooltip} />

                    <Area 
                        type="monotone"
                        dataKey="amount"
                        stroke="#E42222"
                        fill="url(#incomeGradient)"
                        strokeWidth={3}
                        dot={{ r: 3, fill: '#AB8DF8' }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}