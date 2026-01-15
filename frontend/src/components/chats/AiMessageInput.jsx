import { RefreshCcwIcon, Send } from "lucide-react";
import AiQuickActions from "./AiQuickActions";
import { useAiChatStore } from "../../store/useAiChatStore";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function AiMessageInput({ input, setInput, onSend, disabled }) {
    const { newChat, messages } = useAiChatStore();
    const [spinReset, setSpinReset] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    // Detect typing
    useEffect(() => {
        if (!input) return setIsTyping(false);

        setIsTyping(true);
        const timeout = setTimeout(() => setIsTyping(false), 1200);

        return () => clearTimeout(timeout);
    }, [input]);

    // Reminder for reset chat
    useEffect(() => {
        if (messages.length < 3) return;

        const interval = setInterval(() => {
            if (isTyping || disabled) return;

            setSpinReset(true);
            setTimeout(() => setSpinReset(false), 800);    // Stop spin after animation
        }, 10000);

        return () => clearInterval(interval);
    }, [messages.length, isTyping, disabled]);

    const handleReset = () => {
        newChat();
        toast.success("Reset chat successfully!");
    }

    return (
        <div className="w-full flex flex-col gap-2 p-4 border-t border-gray-200/70">
            <AiQuickActions />

            <div className="w-full flex items-center justify-center gap-2">
                <input 
                    type="text"
                    placeholder={disabled ? "AI is thinking...." : "Ask about your spending...."}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="AI_chat-input"
                    disabled={disabled}
                />
                {input ? (
                    <button
                        onClick={onSend}
                        className="AI_send-btn"
                        disabled={disabled}
                    >
                        <Send size={18} />
                    </button>
                ) : (
                    <button
                        onClick={handleReset}
                        className="AI_send-btn"
                        disabled={disabled}
                        title="New Chat"
                    >
                        <RefreshCcwIcon 
                            size={18} 
                            className={spinReset ? "AI_glow-spin" : ""}
                        />
                    </button>
                )}
            </div>
        </div>
    );
}