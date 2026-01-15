import { Trash, X } from "lucide-react";
import { useEffect } from "react";
import { useAiChatStore } from "../../store/useAiChatStore";
import AiChatHistorySkeleton from "../skeletons/AiChatHistorySkeleton";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AiChatHistory({ onClose }) {
    const {
        chatSessions,
        initialLoading,
        loadChatSession,
        openChat,
        deleteChatHistory,
        openAiModal
    } = useAiChatStore();

    const navigate = useNavigate();

    useEffect(() => {
        if (chatSessions.length === 0) {
            loadChatSession();
        }
    }, [chatSessions.length, loadChatSession]);

    const handleOpenChat = (id) => {
        openChat(id);
        openAiModal();
        navigate("/expense");
        onClose();
    }

    const handleDeleteChatHistory = async (e, id) => {
        e.stopPropagation();

        try {
            await deleteChatHistory(id);
            toast.success("Chat delete successfully!");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to delete chat history.");
        }
    }

    return (
        <div className="absolute top-20 -right-4 w-full max-w-sm bg-transparent backdrop-blur-xs">
            <div className="w-full h-80 shadow-xl p-2 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-end mb-4">
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center p-1 rounded-full hover:bg-gray-100 transition-all cursor-pointer"
                    >
                        <X size={14} />
                    </button>
                </div>

                {/* Body */}
                {initialLoading ? (
                    <AiChatHistorySkeleton />
                ) : chatSessions.length === 0 ? (
                    <p className="text-xs text-center sm:text-sm text-gray-500 font-[Comfortaa]">
                        No Chat History Found.
                    </p>
                ) : (
                    <div className="space-y-2">
                        {chatSessions.map((chat) => (
                            <div 
                                key={chat._id}
                                className="flex items-center justify-between hover:bg-gray-100/70 transition-all px-3 py-2"
                            >
                                <div 
                                    onClick={() => handleOpenChat(chat._id)}
                                    className="overflow-hidden cursor-pointer"
                                >
                                    <h3 className="text-xs sm:text-sm text-gray-600 truncate">
                                        {chat.title || "Untitled Chat"}
                                    </h3>
                                </div>

                                {/* Delete */}
                                <button
                                    onClick={(e) => handleDeleteChatHistory(e, chat._id)}
                                    className={`text-gray-500 sm:opacity-50 opacity-100 hover:opacity-100 transition-all cursor-pointer`}
                                >
                                    <Trash size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}