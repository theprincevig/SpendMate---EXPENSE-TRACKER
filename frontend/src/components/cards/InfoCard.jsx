import { useExchangeRateStore } from "../../store/useExchangeRateStore";
import { formatPrice } from "../../utils/formatPrice";

export default function InfoCard({
    icon,
    label,
    value,
    currency,
    color
}) {
    const { rates, isFetchingRates } = useExchangeRateStore();

    return (
        <div className="flex gap-6 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
            <div 
                className={`
                    w-14 h-14 flex items-center justify-center text-xl text-white 
                    rounded-full drop-shadow-xl
                `}
                style={{ background: color }}
            >
                {icon}
            </div>

            <div>
                <h6 className="text-sm text-gray-500 mb-1">{ label }</h6>
                <p className="text-xl">
                    {isFetchingRates && currency !== "INR" ? (
                        <span className=" w-40 h-3 shimmer inline-block" />
                    ) : (
                        <>
                            {formatPrice({
                                amount: value,
                                currency,
                                rates
                            })}
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}