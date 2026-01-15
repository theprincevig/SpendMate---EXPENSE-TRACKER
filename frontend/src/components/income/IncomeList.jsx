import { Download } from "lucide-react";
import TransactionsInfoCard from "../cards/TransactionsInfoCard";
import moment from "moment";

export default function IncomeList({ currency, transactions, onDownloadPDF, onDelete }) {
    if (!Array.isArray(transactions)) return null;

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Income Source</h5>

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
                        Income list is empty yet.
                    </p>
                ) : (
                    transactions?.map((income) => (
                        <TransactionsInfoCard 
                            type="income"
                            key={income._id}
                            title={income.source}
                            amount={Number(income.amount)}
                            icon={income.icon}
                            currency={currency}
                            date={moment(income.date).format("Do MMM YYYY")}
                            onDelete={() => onDelete(income._id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}