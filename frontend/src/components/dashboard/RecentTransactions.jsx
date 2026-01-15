import { ArrowRight } from "lucide-react";
import moment from 'moment';
import TransactionsInfoCard from "../cards/TransactionsInfoCard";

export default function RecentTransactions({ currency, transactions, onSeeMore }) {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Recent Transactions</h5>
                <button 
                    className="card-btn"
                    onClick={onSeeMore}
                >
                    See All <ArrowRight size={14} />
                </button>
            </div>

            <div className="mt-6">
                {transactions?.slice(0,5)?.map((item) => (
                    <TransactionsInfoCard 
                        key={item._id}
                        type={item.type}
                        icon={item.icon}
                        amount={item.amount}
                        title={item.type === 'expense' ? item.category : item.source}
                        date={moment(item.date).format("Do MMM YYYY")}
                        currency={currency}
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    );
}