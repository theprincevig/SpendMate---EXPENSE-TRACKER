import { useEffect, useState } from "react";
import AiChatBody from "../../components/chats/AiChatBody";
import AiMessageInput from "../../components/chats/AiMessageInput";
import { useAiChatStore } from "../../store/useAiChatStore";
import AiChatboxSkeleton from "../../components/skeletons/AiChatboxSkeleton";

export default function AiChatbox() {
    const { 
        messages,
        sendMessage,
        initialLoading,
        aiTyping,
        activeChatId,
        newChat
    } = useAiChatStore();

    const [input, setInput] = useState("");

    useEffect(() => {
        // If no chat is active, start a new one
        if (!activeChatId) {
            newChat();
        }
    }, [activeChatId, newChat]);

    function handleSend() {
        if (!input.trim() || aiTyping) return;

        sendMessage(input);
        setInput("");
    }

    return (
        <>
            {initialLoading ? (
                <AiChatboxSkeleton />
            ) : (
                <div className="h-full flex flex-col">
                    {/* Message content */}
                    <AiChatBody messages={messages} loading={aiTyping} />

                    {/* Message input */}
                    <AiMessageInput 
                        input={input} 
                        setInput={setInput} 
                        onSend={handleSend}
                        disabled={aiTyping}
                    />
                </div>
            )}
        </>
    );
}