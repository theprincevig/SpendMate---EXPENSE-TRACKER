import { useEffect, useRef } from "react";
import { getChatHeaderDate } from "../../utils/dateUtils";
import AiMessageBubble from "./AiMessageBubble";

export default function AiChatBody({ messages, loading }) {
    const bottomRef = useRef();

    // Auto scrolling
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    return (
        <div className="flex-1 overflow-y-auto space-y-3 px-3 py-4">
            <div className="w-full flex items-center justify-center text-xs sm:text-sm text-slate-600 SansFlex">
                {getChatHeaderDate()}
            </div>
            {messages.map((message, idx) => (
                <AiMessageBubble key={idx} message={message} />
            ))}

            {loading && (
                <AiMessageBubble
                    message={{ role: "ai", content: "Thinking..." }}
                    isLoading
                />
            )}

            {/* Scroll target */}
            <div ref={bottomRef} />
        </div>
    );
}