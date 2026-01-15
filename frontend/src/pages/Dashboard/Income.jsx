import { useEffect, useState } from "react";
import { useIncomeStore } from "../../store/useIncomeStore";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/income/IncomeOverview";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/income/addIncomeForm";
import toast from 'react-hot-toast';
import IncomeList from "../../components/income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import ExpenseNIncomeSkeleton from "../../components/skeletons/ExpenseNIncomeSkeleton";
import { useAuthStore } from "../../store/useAuthStore";

export default function Income() {
    const data = {
        source: "",
        amount: "",
        date: null,
        icon: ""
    };

    const [incomeFormData, setIncomeFormData] = useState(data);
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

    const { authUser } = useAuthStore();
    const currency = authUser?.currencyDetails;

    const { 
        loading,
        incomeData,
        getIncome,
        addIncome,
        downloadIncomePdf,
        deleteIncome
    } = useIncomeStore();

    useEffect(() => {
        getIncome();
        return () => {};
    }, []);

    async function handleAddIncome() {
        // Validation checks
        if (!incomeFormData.source.trim()) return toast.error("Source is required.");

        if (!incomeFormData.amount || isNaN(incomeFormData.amount) || Number(incomeFormData.amount) <= 0) {
            toast.error("Amount should be a valid number greater than 0.");
            return;
        }

        if (!incomeFormData.date) return toast.error("Date is required.");

        try {
            await addIncome(incomeFormData);
            setIncomeFormData(data);
            setOpenAddIncomeModal(false);
            toast.success("Income added successfully!");

        } catch (error) {
            console.error(error.message);
            toast.error(error.response?.data?.message || "Failed to add income.");
        }
    }

    async function handleDownloadIncomeDetails() {
        try {
            await downloadIncomePdf();
            toast.success("Income details PDF downloaded successfully!");
            
        } catch (error) {
            console.error(error.message);
            toast.error(error.response?.data?.message || "Failed to download PDF income details.");
        }
    }

    async function handleDeleteIncome(id) {
        try {
            await deleteIncome(id);
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Income details deleted successfully!");

        } catch (error) {
            console.error(error.message);
            toast.error(error.response?.data?.message || "Failed to delete income details.");
        }
    }

    return (
        <DashboardLayout activeMenu="Income">
            <div className="my-5 mx-auto">
                {loading ? (
                    <ExpenseNIncomeSkeleton />
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="">
                                <IncomeOverview 
                                    currency={currency}
                                    transactions={incomeData}
                                    onAddIncome={() => setOpenAddIncomeModal(true)}
                                />
                            </div>

                            <IncomeList 
                                currency={currency}
                                transactions={incomeData} 
                                onDownloadPDF={handleDownloadIncomeDetails}
                                onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })} 
                            />
                        </div>

                        <Modal
                            isOpen={openAddIncomeModal}
                            onClose={() => setOpenAddIncomeModal(false)}
                            title="Add Income"
                        >
                            <AddIncomeForm 
                                incomeFormData={incomeFormData}
                                setIncomeFormData={setIncomeFormData}
                                onAddIncome={handleAddIncome} 
                            />
                        </Modal>

                        <Modal 
                            isOpen={openDeleteAlert.show}
                            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                            title="Delete Income"
                        >
                            <DeleteAlert 
                                content="Are you sure you want to delete this income details?"
                                onDelete={() => handleDeleteIncome(openDeleteAlert.data)}
                            />
                        </Modal>
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}