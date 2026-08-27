import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Modal({
    children,
    isOpen,
    onClose,
    title
}) {
    const [showModal, setShowModal] = useState(isOpen);

    // Handle mount/unmount animation
    useEffect(() => {
        if (isOpen) {
            setShowModal(true);
        } else {
            const timer = setTimeout(() => {
                setShowModal(false);
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!showModal) return null;

    return (
        <div 
            onClick={onClose}
            className={`
                fixed inset-0 z-50 flex justify-center items-center 
                bg-black/40 backdrop-blur-md transition-opacity duration-300 
                ${isOpen ? "opacity-100" : "opacity-0"}
            `}
        >
            <div className="relative w-full max-w-2xl p-4">

                {/* Modal box */}
                <div 
                    onClick={(e) => e.stopPropagation()}
                    className={`
                        bg-white rounded-xl shadow-md overflow-hidden 
                        ${isOpen ? "open-y" : "close-y"}
                    `}
                >

                    {/* Header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center transition-all cursor-pointer"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 md:p-5 space-y-4">{children}</div>
                </div>
            </div>
        </div>
    );
}