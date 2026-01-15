import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { API_PATHS } from '../utils/apiPaths';

const AI_WELCOME_MESSAGE = {
    role: "ai",
    content: "Hey! Ask me anything about your expenses....😋"
};

export const useAiChatStore = create((set, get) => ({
    chatSessions: [],
    activeChatId: null,
    messages: [],
    initialLoading: true,
    aiTyping: false,
    error: null,

    isAiModalOpen: false,

    openAiModal: () => set({ isAiModalOpen: true }),
    closeAiModal: () => set({ isAiModalOpen: false }),

    /* =============================
       INIT CHAT (LOAD HISTORY)
    ============================== */
    loadChatSession: async () => {
        set({ initialLoading: true, error: null });

        try {
            const res = await axiosInstance.get(API_PATHS.AI.CHAT_HISTORY, {
                withCredentials: true
            });
            const history = res.data;

            set({ chatSessions: history });

        } catch (error) {
            console.error("Load chat history error:", error);
            set({
                messages: [AI_WELCOME_MESSAGE],
                error: "Failed to load chat history."
            });
            throw error;

        } finally {
            set({ initialLoading: false });
        }
    },

    openChat: async (chatId) => {
        set({
            activeChatId: chatId,
            messages: [],
            initialLoading: true,
            error: null
        });

        try {
            const res = await axiosInstance.get(API_PATHS.AI.GET_CHAT_MESSAGES(chatId), {
                withCredentials: true
            });

            const message = res.data;
            set({
                messages: message.length ? message : [AI_WELCOME_MESSAGE]
            });

        } catch (error) {
            console.error("Load chat messages error:", error);
            set({
                messages: [AI_WELCOME_MESSAGE],
                error: "Failed to load chat."
            });
            throw error;

        } finally {
            set({ initialLoading: false });
        }
    },

    sendMessage: async (userMessage) => {
        if (!userMessage.trim()) return;
        const { activeChatId } = get();

        // Add user message instantly
        set((state) => ({
            messages: [
                ...state.messages,
                { role: "user", content: userMessage }
            ],
            aiTyping: true,
            error: null
        }));

        try {
            const res = await axiosInstance.post(API_PATHS.AI.CHAT,
                {
                    message: userMessage,
                    chatId: activeChatId || null
                },
                { withCredentials: true }
            );
            const { reply, chatId, chatSession } = res.data;

            set((state) => {
                const isNewChat = !state.chatSessions.some(c => c._id === chatId);

                return {
                    activeChatId: chatId,
                    messages: [...state.messages, { role: "ai", content: reply }],
                    chatSessions: isNewChat
                        ? [chatSession, ...state.chatSessions]
                        : state.chatSessions
                }
            });

        } catch (error) {
            console.error("AI chat error:", error);
            set((state) => ({
                messages: [
                    ...state.messages,
                    {
                        role: "ai",
                        content: "Sorry, I couldn’t respond right now. Please try again later.",
                    },
                ],
                error: "AI failed to respond.",
            }));
            throw error;

        } finally {
            set({ aiTyping: false });
        }
    },

    newChat: () => {
        set({
            activeChatId: null,
            messages: [AI_WELCOME_MESSAGE],
            error: null
        });
    },

    deleteChatHistory: async (chatId) => {
        try {
            await axiosInstance.delete(API_PATHS.AI.DELETE_CHAT_HISTORY(chatId), {
                withCredentials: true
            });

            set((state) => ({
                chatSessions: state.chatSessions.filter(
                    c => c._id !== chatId
                ),
                ...(state.activeChatId === chatId && {
                    activeChatId: null,
                    messages: [AI_WELCOME_MESSAGE]
                })
            }));

        } catch (error) {
            console.error("Delete chat error:", error);
            set({ error: "Failed to delete chat." });
            throw error;
        }
    },
}));