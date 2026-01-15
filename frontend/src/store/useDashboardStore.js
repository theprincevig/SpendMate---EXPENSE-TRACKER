import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { API_PATHS } from '../utils/apiPaths';

export const useDashboardStore = create((set) => ({
    loading: false,
    dashboardData: null,

    getDashboardData: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
            const data = res.data;

            set({ dashboardData: data });
            return data;

        } catch (error) {
            console.error(`Get dashboard error: ${error}`);
            throw error;

        } finally {
            set({ loading: false });
        }
    },
}));