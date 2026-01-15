import { Download } from "lucide-react";
import TransactionsInfoCard from "../cards/TransactionsInfoCard";
import moment from "moment";

export default function ExpenseList({ currency, transactions, onDownloadPDF, onDelete }) {
    if (!Array.isArray(transactions)) return null;

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Expense Source</h5>

                <button 
                    onClick={onDownloadPDF}
                    className="card-btn"
                >
                    <Download size={14} /> Download
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                {transactions.length === 0 ? (
                    <p className="text-sm text-slate-500 text-center font-[Comfortaa] font-medium">
                        Expense list is empty yet.
                    </p>
                ) : (
                    transactions?.map((expense) => (
                        <TransactionsInfoCard 
                            type="expense"
                            key={expense._id}
                            title={expense.source}
                            amount={Number(expense.amount)}
                            icon={expense.icon}
                            currency={currency}
                            date={moment(expense.date).format("Do MMM YYYY")}
                            onDelete={() => onDelete(expense._id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}