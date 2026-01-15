import { ArrowRight } from "lucide-react";
import moment from "moment";
import TransactionsInfoCard from "../cards/TransactionsInfoCard";

export default function ExpenseTransactions({ currency, transactions, onSeeMore }) {
    if (!Array.isArray(transactions)) return null;

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Expenses</h5>

                <button 
                    className="card-btn"
                    onClick={onSeeMore}
                >
                    See All <ArrowRight size={14} />
                </button>
            </div>

            <div className="mt-6">
                {transactions.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center font-[Comfortaa] font-medium">
                        No expense transactions found.
                    </p>
                ) : (
                    transactions?.slice(0,5)?.map((expense) => (
                        <TransactionsInfoCard 
                            key={expense._id}
                            type="expense"
                            title={expense.category}
                            amount={Number(expense.amount)}
                            icon={expense.icon}
                            currency={currency}
                            date={moment(expense.date).format("Do MMM YYYY")}
                            hideDeleteBtn
                        />
                    ))
                )}
            </div>
        </div>
    );
}