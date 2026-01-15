import { Brain, ChevronDown, ChevronUp, KeyRound } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AiChatHistory from "./chats/AiChatHistory";

export default function AdvanceSettings() {
    const [open, setOpen] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="relative">
            <div className="bg-white border-t-gray-200/80 shadow-md px-4 py-2">
                {/* Header */}
                <button 
                    onClick={() => setOpen(prev => !prev)}
                    className="w-full flex items-center justify-between p-2"
                >
                    <h1 className="text-sm sm:text-lg font-medium">Advance Settings</h1>
                    {!open ? (
                        <ChevronDown size={18} />
                    ) : (
                        <ChevronUp size={18} />
                    )}
                </button>

                {/* Content */}
                {open && (
                    <div className="h-50 space-y-3 mt-6">
                        {/* AI chat history */}
                        <button 
                            onClick={() => setShowHistory(true)}
                            className="w-full flex items-center gap-2 px-2 py-3 hover:bg-zinc-100 cursor-pointer"
                        >
                            <h3 className="text-xs sm:text-sm">AI Chat History</h3>
                            <Brain size={13} />
                        </button>
                        
                        {/* Change Password */}
                        <div className="w-full flex items-center justify-between p-2 hover:bg-zinc-100">
                            <h3 className="text-xs sm:text-sm">Change Password</h3>
                            <button 
                                onClick={() => navigate("/change-password")}
                                className="card-btn"
                            >
                                Change <KeyRound size={12} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {showHistory && (
                <AiChatHistory onClose={() => setShowHistory(false)} />
            )}
        </div>
    );
}