import { MessageCircleDashed } from "lucide-react";
import { useEffect, useState } from "react";

export default function AiFloatingButton({ onClick }) {
    const [bounce, setBounce] = useState(false);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (hovered) return;

            setBounce(true);
            setTimeout(() => setBounce(false), 900);
        }, 30000);

        return () => clearInterval(interval);
    }, [hovered]);

    return (
        <div
            className={`
                absolute group bottom-10 right-10
                ${bounce ? "AI_smart-bounce" : ""}
            `}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <button
                onClick={onClick}
                className={`
                    AI_floating-btn transition-transform duration-300 hover:scale-105 
                    ${!hovered ? "AI_glow" : ""}
                `}
            >
                {/* Icon */}
                <div className="w-11 flex items-center justify-center shrink-0">
                    <MessageCircleDashed size={20} />
                </div>

                {/* Text */}
                <span className="whitespace-nowrap opacity-0 transalte-x-2 font-[Comfortaa] font-medium group-hover:opacity-100 group-hover:transalate-x-0 transition-all duration-300 delay-100">
                    AI Assistant
                </span>
            </button>
        </div>
    );
}