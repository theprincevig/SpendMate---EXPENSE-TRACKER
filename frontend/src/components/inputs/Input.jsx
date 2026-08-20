import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';

export default function Input({
    icon,
    type,
    label,
    value,
    placeholder,
    onChange,
    error
}) {
    const [showPassword, setShowPassword] = useState(false);

    function toggleShowPassword() {
        setShowPassword(!showPassword);
    }

    return (
        <div className="relative mb-8">
            <label className="text-sm text-slate-800">{ label }</label>

            <div 
                className={`
                    input-box 
                    ${error 
                        ? "bg-red-100 border-red-200" 
                        : "bg-slate-100 border-slate-200"
                    }
                `}
            >
                <span className="text-zinc-500">{icon}</span>
                <input 
                    type={type === "password" ? showPassword ? "text" : "password" : type} 
                    placeholder={placeholder} 
                    value={value} 
                    onChange={(e) => onChange(e)}
                    className="w-full bg-transparent outline-none"
                />

                {type === "password" && (
                    <>
                        {showPassword ? (
                            <Eye 
                                size={20} 
                                className="text-base-content/40 cursor-pointer" 
                                onClick={() => toggleShowPassword()}
                            />
                        ) : (
                            <EyeOff 
                                size={20}
                                className="text-base-content/40 cursor-pointer" 
                                onClick={() => toggleShowPassword()}
                            />
                        )}
                    </>
                )}
            </div>

            {error && <div className="absolute -bottom-5 left-5 text-xs text-red-500">{error}</div>}
        </div>
    );
}