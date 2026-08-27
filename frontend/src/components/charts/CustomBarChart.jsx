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
import { useExchangeRateStore } from '../../store/useExchangeRateStore';
import { formatPrice } from '../../utils/formatPrice';

export default function CustomBarChart({
    data,
    currency,
    labelKey
}) {
    if (!currency) return null;

    const { rates, isFetchingRates } = useExchangeRateStore();

    // Function to alternate colors
    function getBarColor(index) {
        return index % 2 === 0 ? "#74C476" : "#238845";
    }

    function CustomTooltip({ active, payload }) {
        if (!active || !payload || !payload.length) return null;

        // console.log("FULL PAYLOAD:", payload);
        // console.log("DATA OBJECT:", payload[0].payload);

        const { amount } = payload[0].payload;
        const label = payload[0].payload[labelKey];

        return (
            <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                <p className="text-xs font-semibold text-green-800 mb-1">{label}</p>
                <p className="text-sm text-gray-600">
                    Amount:{" "}
                    <span className="text-sm font-medium text-gray-900">
                        {isFetchingRates && currency !== "INR" ? (
                            <span className=" w-40 h-3 shimmer inline-block" />
                        ) : (
                            <>
                                {formatPrice({
                                    amount,
                                    userCurrency: currency,
                                    rates
                                })}
                            </>
                        )}
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

                    <XAxis dataKey={labelKey} tick={{ fontSize: 12, fill: "#555" }} stroke='none' />
                    <YAxis 
                        tick={{ fontSize: 12, fill: "#555" }} 
                        stroke='none' 
                        tickFormatter={
                            (value) => formatPrice({
                                amount: value,
                                userCurrency: currency,
                                rates
                            })
                        }
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