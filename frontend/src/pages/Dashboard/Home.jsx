import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, HandCoins, WalletMinimal } from "lucide-react";

import { useDashboardStore } from "../../store/useDashboardStore";
import { useActiveCurrency } from "../../hooks/useActiveCurrency";
import { COLORS } from "../../theme/color";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import InfoCard from "../../components/cards/InfoCard";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import FinanceOverview from "../../components/dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/dashboard/RecentIncome";
import DashboardSkeleton from "../../components/skeletons/DashboardSkeleton";

export default function Home() {
    const { loading, dashboardData, getDashboardData } = useDashboardStore();
    
    const activeCurrency = useActiveCurrency();
    const navigate = useNavigate();

    useEffect(() => {
        getDashboardData();
    }, []);

    if (!activeCurrency) return null; // safety (auth not loaded yet)

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="my-5 mx-auto">
                {loading ? (
                    <DashboardSkeleton />
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <InfoCard
                                icon={<CreditCard />}
                                label="Total Balance"
                                value={dashboardData?.totalBalance || 0}
                                currency={activeCurrency.code}
                                color={COLORS.WARM_GREENISH_YELLOW}
                            />
                            <InfoCard
                                icon={<WalletMinimal />}
                                label="Total Income"
                                value={dashboardData?.totalIncome || 0}
                                currency={activeCurrency.code}
                                color={COLORS.PRIMARY_MAGENTA}
                            />
                            <InfoCard
                                icon={<HandCoins />}
                                label="Total Expense"
                                value={dashboardData?.totalExpense || 0}
                                currency={activeCurrency.code}
                                color={COLORS.DEEP_LAVENDER}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <RecentTransactions 
                                transactions={dashboardData?.recentTransactions}
                                onSeeMore={() => navigate("/expense")}
                                currency={activeCurrency.code}
                            />

                            <FinanceOverview 
                                currency={activeCurrency.code}
                                totalBalance={dashboardData?.totalBalance || 0}
                                totalIncome={dashboardData?.totalIncome || 0}
                                totalExpense={dashboardData?.totalExpense || 0}
                            />

                            <ExpenseTransactions 
                                currency={activeCurrency.code}
                                transactions={dashboardData?.last30DaysExpenses?.transactions || []}
                                onSeeMore={() => navigate("/expense")}
                            />

                            <Last30DaysExpenses 
                                currency={activeCurrency.code}
                                data={dashboardData?.last30DaysExpenses?.transactions || []}
                            />

                            <RecentIncomeWithChart 
                                currency={activeCurrency.code}
                                data={dashboardData?.last60DaysIncome?.transactions || []}
                                totalIncome={dashboardData?.totalIncome || 0}
                            />

                            <RecentIncome 
                                currency={activeCurrency.code}
                                transactions={dashboardData?.last60DaysIncome?.transactions || []}
                                onSeeMore={() => navigate("/income")}
                            />
                        </div>
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}