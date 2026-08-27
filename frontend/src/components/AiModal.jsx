import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function AiModal({
    children,
    chatboxOpen,
    chatboxClose,
    chatboxTitle
}) {
    const [showModal, setShowModal] = useState(chatboxOpen);
    
    // Handle mount/unmount animation
    useEffect(() => {
        if (chatboxOpen) {
            setShowModal(true);
        } else {
            const timer = setTimeout(() => {
                setShowModal(false);
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [chatboxOpen]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") chatboxClose();
        };

        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

    if (!showModal) return null;

    return (
        <div
            onClick={chatboxClose}
            className={`
                fixed inset-0 z-50 flex justify-center items-center 
                bg-black/40 backdrop-blur-sm 
                transition-opacity duration-300 
                ${chatboxOpen ? "opacity-100" : "opacity-0"}
            `}
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                className={`
                    relative w-full max-w-4xl px-3 
                    ${chatboxOpen ? "open" : "close"}
                `}
            >
                <div className="bg-white rounded-2xl shadow-xl shadow-emerald-100 overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-emerald-600 p-4">
                        <h3 className="text-lg text-white font-semibold tracking-wide">{chatboxTitle}</h3>
                        <button
                            type="button"
                            onClick={chatboxClose}
                            className="flex items-center justify-center p-1 rounded-full text-white hover:bg-emerald-700 active:scale-95 transition-all cursor-pointer"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="h-[75vh]">{children}</div>
                </div>
            </div>
        </div>
    );
}