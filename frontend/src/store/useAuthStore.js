import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { API_PATHS } from '../utils/apiPaths';
import { currencyConfig } from '../config/currency.Config';

// helper function for change currency easily
const normalizeUser = (user) => {
    if (!user) return null;

    return {
        ...user,
        currencyDetails: currencyConfig[user.currency] || currencyConfig.INR
    };
}

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false, // Signup loading state
    isLoggingIn: false, // Login loading state
    isUpdatingProfile: false, // Profile update loading state
    isResettingPassword: false, // Reset password loading state

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await axiosInstance.get(API_PATHS.AUTH.CHECK_AUTH);
            const { user } = res.data;

            set({ authUser: normalizeUser(user) });
            return user;

        } catch (error) {
            console.error(`Check Auth error: ${error}`);
            set({ authUser: null });
            return null;

        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, data);
            const { user } = res.data;

            set({ authUser: normalizeUser(user) });
            return user;

        } catch (error) {
            console.error(`Singup error: ${error}`);
            throw error.response?.data || error;

        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, data);
            const { user } = res.data;

            set({ authUser: normalizeUser(user) });
            return user;

        } catch (error) {
            console.error(`Login error: ${error}`);
            throw error.response?.data || error;

        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
            set({ authUser: null });

        } catch (error) {
            console.error(`Logout error: ${error}`);
            throw error.response?.data || error;
        }
    },

    getUserInfo: async () => {
        try {
            const res = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
            const { user } = res.data;

            if (user) {
                set({ authUser: normalizeUser(user) });
                return user;
            }

            return null;

        } catch (error) {
            console.error(`Get User info error: ${error}`);
            throw error.response?.data || error;
        }
    },

    viewProfile: async () => {
        try {
            const res = await axiosInstance.get(API_PATHS.PROFILE.ME);
            const { user } = res.data;

            if (res.data?.user) {
                set({ authUser: normalizeUser(user) });
                return user;
            } else {
                console.error("Failed to fetch user's profile: ", res.data?.error);
                return null;
            }
        } catch (error) {
            console.error(`View profile error: ${error}`);
            throw error.response?.data || error;
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const formData = new FormData();
            if (data.fullName) formData.append("fullName", data.fullName);
            if (data.dob) formData.append("dob", data.dob);
            if (data.profilePic) formData.append("profilePic", data.profilePic);
            if (data.currency) formData.append("currency", data.currency);

            const res = await axiosInstance.put(API_PATHS.PROFILE.ME, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            const { user } = res.data;

            if (res.data?.user) {
                set({ authUser: normalizeUser(user) });
                return user;
            } else {
                console.error("No user object returned from server");
                return null;
            }

        } catch (error) {
            console.error(`Update profile error: ${error}`);
            throw error.response?.data || error;

        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    changePassword: async ({ oldPassword, newPassword }) => {
        set({ isResettingPassword: true });
        try {
            const res = await axiosInstance.post(API_PATHS.AUTH.CHANGE_PASSWORD, { oldPassword, newPassword });

            // Force logout
            await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
            set({ authUser: null });

            return res.data;

        } catch (error) {
            console.error(`Reset password error: ${error}`);
            throw error.response?.data || error;

        } finally {
            set({ isResettingPassword: false });
        }
    },
}));