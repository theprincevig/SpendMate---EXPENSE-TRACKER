import { useEffect, useState } from "react";
import { useExpenseStore } from "../../store/useExpenseStore";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ExpenseOverview from "../../components/expense/ExpenseOverview";
import Modal from "../../components/Modal";
import ExpenseList from "../../components/expense/ExpenseList";
import AddExpenseForm from "../../components/expense/AddExpenseForm";
import DeleteAlert from "../../components/DeleteAlert";
import ExpenseNIncomeSkeleton from "../../components/skeletons/ExpenseNIncomeSkeleton";
import { useAuthStore } from "../../store/useAuthStore";
import AiChatbox from "./AiChatbox";
import AiModal from "../../components/AiModal";
import AiFloatingButton from "../../components/chats/AiFloatingButton";
import { useAiChatStore } from "../../store/useAiChatStore";

export default function Expense() {
    const data = {
        category: "",
        amount: "",
        date: null,
        icon: ""
    };

    const [expenseFormData, setExpenseFormData] = useState(data);
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

    const { authUser } = useAuthStore();
    const { isAiModalOpen, openAiModal, closeAiModal } = useAiChatStore();
    const currency = authUser?.currencyDetails;

    const { 
        loading,
        expenseData,
        getExpense,
        addExpense,
        downloadExpensePdf,
        deleteExpense
    } = useExpenseStore();

    useEffect(() => {
        getExpense();
        return () => {};
    }, []);

    async function handleAddExpense() {
        // Validation checks
        if (!expenseFormData.category.trim()) return toast.error("Category is required.");

        if (!expenseFormData.amount || isNaN(expenseFormData.amount) || Number(expenseFormData.amount) <= 0) {
            toast.error("Amount should be a valid number greater than 0.");
            return;
        }

        if (!expenseFormData.date) return toast.error("Date is required.");

        try {
            await addExpense(expenseFormData);
            setExpenseFormData(data);
            setOpenAddExpenseModal(false);
            toast.success("Expense added successfully!");

        } catch (error) {
            console.error(error.message);
            toast.error(error.response?.data?.message || "Failed to add expense.");
        }
    }

    async function handleDownloadExpenseDetails() {
        try {
            await downloadExpensePdf();
            toast.success("Expense details PDF downloaded successfully!");

        } catch (error) {
            console.error(error.message);
            toast.error(error.response?.data?.message || "Failed to download PDF expense details.");
        }
    }

    async function handleDeleteExpense(id) {
        try {
            await deleteExpense(id);
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Expense details deleted successfully!");

        } catch (error) {
            console.error(error.message);
            toast.error(error.response?.data?.message || "Failed to delete expense details.");
        }
    }


    return (
        <DashboardLayout activeMenu="Expense">
            <div className="my-5 mx-auto">
                {loading ? (
                    <ExpenseNIncomeSkeleton />
                ) : (
                    <>
                        <AiFloatingButton 
                            onClick={openAiModal}
                        />

                        <div className="grid grid-cols-1 gap-6">
                            <ExpenseOverview 
                                currency={currency}
                                transactions={expenseData}
                                onAddExpense={() => setOpenAddExpenseModal(true)}
                            />

                            <ExpenseList 
                                currency={currency}
                                transactions={expenseData} 
                                onDownloadPDF={handleDownloadExpenseDetails}
                                onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })} 
                            />
                        </div>

                        {isAiModalOpen && (
                            <AiModal
                                chatboxOpen={isAiModalOpen}
                                chatboxClose={closeAiModal}
                                chatboxTitle="AI Expense Assistant"
                            >
                                <AiChatbox />
                            </AiModal>
                        )}

                        <Modal
                            isOpen={openAddExpenseModal}
                            onClose={() => setOpenAddExpenseModal(false)}
                            title="Add Expense"
                        >
                            <AddExpenseForm 
                                expenseFormData={expenseFormData}
                                setExpenseFormData={setExpenseFormData}
                                onAddExpense={handleAddExpense} 
                            />
                        </Modal>

                        <Modal 
                            isOpen={openDeleteAlert.show}
                            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                            title="Delete Expense"
                        >
                            <DeleteAlert 
                                content="Are you sure, you want to delete this expense details?"
                                onDelete={() => handleDeleteExpense(openDeleteAlert.data)}
                            />
                        </Modal>
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}