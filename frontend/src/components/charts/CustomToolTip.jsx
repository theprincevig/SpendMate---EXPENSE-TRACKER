import { useExchangeRateStore } from "../../store/useExchangeRateStore";
import { formatPrice } from "../../utils/formatPrice";

export default function CustomToolTip({ active, payload, currency }) {
    if (!active || !payload || !payload.length) return null;

    const { name, value } = payload[0];
    const { rates, isFetchingRates } = useExchangeRateStore();

    return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
            <p className="text-xs font-semibold text-green-800 mb-1">{name}</p>
            <p className="text-sm text-gray-600">
                Amount:{" "}
                <span className="text-sm font-medium text-gray-900">
                    {isFetchingRates && currency !== "INR" ? (
                        <span className=" w-40 h-3 shimmer inline-block" />
                    ) : (
                        <>
                            {formatPrice({
                                amount: value,
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