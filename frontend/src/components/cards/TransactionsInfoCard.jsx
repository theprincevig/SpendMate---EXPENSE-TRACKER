import { Bug, Trash2, TrendingDown, TrendingUp } from "lucide-react";
import { formatAmount } from "../../lib/helper";

export default function TransactionsInfoCard({ title, icon, date, amount, type, currency, onDelete, hideDeleteBtn }) {
    function getAmountStyles() {
        return type === 'income' ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";
    }

    return (
        <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
            <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-500 bg-gray-100 rounded-full">
                {icon ? (
                    <img 
                        src={icon} 
                        alt={title} 
                        className="w-6 h-6"
                    />
                ) : (
                    <Bug />
                )}
            </div>

            <div className="flex-1 flex items-center justify-between">
                <div className="">
                    <p className="text-sm text-gray-700 font-medium font-[Comfortaa]">{title}</p>
                    <p className="text-xs text-gray-400 mt-1">{date}</p>
                </div>

                <div className="flex items-center gap-2">
                    {!hideDeleteBtn && (
                        <button
                            onClick={onDelete}
                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                            <Trash2 size={16} />
                        </button>
                    )}

                    <div
                        className={`
                            flex items-center gap-2 px-3 py-1.5 rounded-md
                            ${getAmountStyles()}
                        `}
                    >
                        <h6 className="text-xs font-medium">
                            {type === 'income' ? "+" : "-"}
                            {formatAmount(Math.abs(amount), currency)}
                        </h6>
                        {type === 'income' ? <TrendingUp /> : <TrendingDown />}
                    </div>
                </div>
            </div>
        </div>
    );
}