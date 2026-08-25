import { 
    PieChart, 
    Pie, 
    Cell, 
    Tooltip, 
    ResponsiveContainer, 
    Legend 
} from 'recharts';
import CustomToolTip from './CustomToolTip';
import CustomLegend from './CustomLegend';

import { useExchangeRateStore } from '../../store/useExchangeRateStore';
import { formatPrice } from '../../utils/formatPrice';

export default function CustomPieChart({
    data,
    label,
    totalAmount,
    currency,
    colors,
    showTextAnchor
}) {
    const { rates, isFetchingRates } = useExchangeRateStore();

    return (
        <ResponsiveContainer width="100%" height={380}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    innerRadius={100}
                    labelLine={false}
                >
                    {data.map((entry, index) => (
                        <Cell 
                            key={`cell-${index}`}
                            fill={colors[index % colors.length]}
                        />
                    ))}
                </Pie>
                <Tooltip 
                    content={
                        <CustomToolTip currency={currency} />
                    } 
                />
                <Legend content={<CustomLegend />} />

                {showTextAnchor && (
                    <>
                        <text
                            x="50%"
                            y="50%"
                            dy={-25}
                            textAnchor='middle'
                            fill='#666'
                            fontSize='14px'
                        >
                            {label}
                        </text>
                        <text
                            x="50%"
                            y="50%"
                            dy={8}
                            textAnchor='middle'
                            fill='#333'
                            fontSize='24px'
                            fontWeight='semi-bold'
                        >
                            {isFetchingRates && currency !== "INR" ? (
                                <span className=" w-40 h-3 shimmer inline-block" />
                            ) : (
                                <>
                                    {formatPrice({
                                        amount: totalAmount,
                                        userCurrency: currency,
                                        rates
                                    })}
                                </>
                            )}
                        </text>
                    </>
                )}
            </PieChart>
        </ResponsiveContainer>
    );
}