import { ArrowRight } from "lucide-react";
import moment from "moment";
import TransactionsInfoCard from "../cards/TransactionsInfoCard";

export default function RecentIncome({ currency, transactions, onSeeMore }) {
    if (!Array.isArray(transactions)) return null;

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Income</h5>

                <button
                    onClick={onSeeMore}
                    className="card-btn"
                >
                    See more <ArrowRight size={14} />
                </button>
            </div>

            <div className="mt-6">
                {transactions.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center font-[Comfortaa] font-medium">
                        No income transactions found.
                    </p>
                ) : (
                    transactions?.slice(0,5)?.map((income) => (
                        <TransactionsInfoCard 
                            key={income._id}
                            type="income"
                            title={income.source}
                            amount={Number(income.amount)}
                            icon={income.icon}
                            currency={currency}
                            date={moment(income.date).format("Do MMM YYYY")}
                            hideDeleteBtn
                        />
                    ))
                )}
            </div>
        </div>
    );
}