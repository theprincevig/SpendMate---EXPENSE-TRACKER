import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';

export default function Input({ icon, type, value, label, placeholder, onChange }) {
    const [showPassword, setShowPassword] = useState(false);

    function toggleShowPassword() {
        setShowPassword(!showPassword);
    }


    return (
        <div>
            <label className="text-sm text-slate-800">{ label }</label>

            <div className="input-box">
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
        </div>
    );
}