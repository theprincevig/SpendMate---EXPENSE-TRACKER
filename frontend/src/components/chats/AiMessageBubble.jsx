export default function AiMessageBubble({ message, isLoading = false }) {
    const isUser = message.role === "user";
    const isAI = message.role === "ai";

    return (
        <div 
            className={`
                flex ${isUser ? "justify-end" : "justify-start"}
            `}
        >
            <div
                className={`
                    max-w-[75%] px-4 py-2 rounded-xl text-xs sm:text-sm font-[Comfortaa] font-medium shadow-md
                    ${
                        isUser 
                        ? "bg-emerald-600 text-white rounded-br-none" 
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }
                    ${
                        isAI && isLoading
                        ? "animate-bounce shimmer"
                        : ""
                    }
                `}
            >
                {message.content}
            </div>
        </div>
    );
}