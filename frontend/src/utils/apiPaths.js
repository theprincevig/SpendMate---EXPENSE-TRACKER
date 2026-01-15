export const BASE_URL = "http://localhost:5000";

export const API_PATHS = {
    AUTH: {
        CHECK_AUTH: "/api/auth/me",
        REGISTER: "/api/auth/register",
        LOGIN: "/api/auth/login",
        LOGOUT: "/api/auth/logout",
        GET_USER_INFO: "/api/auth/getUser",
        CHANGE_PASSWORD: "/api/auth/change-password"
    },
    DASHBOARD: {
        GET_DATA: "/dashboard"
    },
    PROFILE: {
        ME: "/profile/me"
    },
    INCOME: {
        ADD_INCOME: "/income/add",
        GET_ALL_INCOME: "/income/get",
        DELETE_INCOME: (id) => `/income/delete/${id}`,
        DOWNLOAD_INCOME_PDF: "/income/pdf"
    },
    EXPENSE: {
        ADD_EXPENSE: "/expense/add",
        GET_ALL_EXPENSE: "/expense/get",
        DELETE_EXPENSE: (id) => `/expense/delete/${id}`,
        DOWNLOAD_EXPENSE_PDF: "/expense/pdf"
    },
    AI: {
        CHAT: "/ai/chat",
        CHAT_HISTORY: "/ai/history",
        GET_CHAT_MESSAGES: (chatId) => `/ai/chat/${chatId}`,
        DELETE_CHAT_HISTORY: (chatId) => `/ai/chat/delete/${chatId}`
    }
}