import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { API_PATHS } from '../utils/apiPaths';

export const useExpenseStore = create((set) => ({
    loading: false,
    expenseData: [],

    addExpense: async (expensePayload) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, expensePayload);
            const newExpense = res.data;

            set((state) => ({
                expenseData: [newExpense, ...state.expenseData],
            }));
            return newExpense;

        } catch (error) {
            console.error(`Add expense error: ${error}`);
            throw error;

        } finally {
            set({ loading: false });
        }
    },

    getExpense: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
            const data = res.data;

            set({ expenseData: data });
            return data;

        } catch (error) {
            console.error(`Get expense error: ${error}`);
            throw error;

        } finally {
            set({ loading: false });
        }
    },

    downloadExpensePdf: async () => {
        try {
            const res = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE_PDF, {
                responseType: 'blob'
            });

            // Create a downloadable file
            const fileURL = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = fileURL;
            link.download = "expenses.pdf";
            link.click();

        } catch (error) {
            console.error(`Downlaod expense PDF error: ${error}`);
            throw error;
        }
    },

    deleteExpense: async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

            set((state) => ({
                expenseData: state.expenseData.filter((exp) => exp._id !== id),
            }));
            return true;

        } catch (error) {
            console.error(`Delete expense error: ${error}`);
            throw error;
        }
    }
}));