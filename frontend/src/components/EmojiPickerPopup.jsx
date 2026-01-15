import EmojiPicker from 'emoji-picker-react';
import { SmilePlus, X } from 'lucide-react';
import { useState } from 'react';

export default function EmojiPickerPopup({ icon, onSelected }) {
    const [isOpen, setIsOpen] = useState(false);

    function handleEmojiPicker(emoji) {
        onSelected(emoji?.imageUrl);
        setIsOpen(false);
    }

    return (
        <div className="flex flex-col md:flew-row items-start gap-5 mb-6">
            <div
                onClick={() => setIsOpen(true)}
                className='flex items-center gap-4 cursor-pointer'
            >
                <div className='w-10 h-10 flex items-center justify-center text-2xl hover:bg-emerald-50 hover:text-green-600 transition-all duration-200 rounded-lg'>
                    {icon ? (
                        <img 
                            src={icon} 
                            alt="icon" 
                            className='w-10 h-10'
                        />
                    ) : (
                        <SmilePlus size={22} />
                    )}
                </div>

                <p className='text-sm font-semibold font-[Comfortaa]'>
                    {icon ? "Change icon" : "Pick icon"}
                </p>
            </div>

            {isOpen && (
                <div className='relative'>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className='w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer'
                    >
                        <X size={16} />
                    </button>

                    <EmojiPicker 
                        open={isOpen}
                        onEmojiClick={handleEmojiPicker}
                    />
                </div>
            )}
        </div>
    );
}