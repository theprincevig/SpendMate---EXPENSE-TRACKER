import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { API_PATHS } from '../utils/apiPaths';

export const useIncomeStore = create((set) => ({
    loading: false,
    incomeData: [],

    addIncome: async (incomePayload) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, incomePayload);
            const newIncome = res.data;

            set((state) => ({
                incomeData: [newIncome, ...state.incomeData],
            }));
            return newIncome;

        } catch (error) {
            console.error(`Add income error: ${error}`);
            throw error;

        } finally {
            set({ loading: false });
        }
    },

    getIncome: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
            const data = res.data;

            set({ incomeData: data });
            return data;

        } catch (error) {
            console.error(`Get income error: ${error}`);
            throw error;

        } finally {
            set({ loading: false });
        }
    },

    downloadIncomePdf: async () => {
        try {
            const res = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME_PDF, {
                responseType: 'blob'
            });

            // Create a downloadable file
            const fileURL = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = fileURL;
            link.download = "incomes.pdf";
            link.click();

        } catch (error) {
            console.error(`Downlaod income PDF error: ${error}`);
            throw error;
        }
    },

    deleteIncome: async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

            set((state) => ({
                incomeData: state.incomeData.filter((inc) => inc._id !== id),
            }));
            return true;

        } catch (error) {
            console.error(`Delete income error: ${error}`);
            throw error;
        }
    }
}));