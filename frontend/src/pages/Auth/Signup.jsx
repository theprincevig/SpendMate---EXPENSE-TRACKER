import { Link, useNavigate } from 'react-router-dom';
import { KeyRound, Loader, Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { hasErrors } from "../../errors/errors";
import { useAuthStore } from "../../store/useAuthStore";
import { validateSignup } from '../../errors/auth.error';

import PasswordStrengthMeter from "../../components/inputs/PasswordStrengthMeter";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/inputs/Input";

export default function Signup() {
    const data = { email: "", password: "" };

    const { isSigningUp, signup } = useAuthStore();

    const [formData, setFormData] = useState(data);
    const [errors, setErrors] = useState(data);
    const navigate = useNavigate();

    const handleChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        setErrors(prev => ({ ...prev, [field]: "" }));
    };

    async function handleSubmit(e) {
        e.preventDefault();

        if (isSigningUp) return;

        const newErrors = validateSignup(formData);
        if (hasErrors(newErrors)) return setErrors(newErrors);

        try {
            await signup(formData);
            setFormData(data);
            navigate("/dashboard");
            toast.success("Welcome to Spendmate!");

        } catch (error) {
            console.error(error.error);
            toast.error(error.error || "Failed to sign up.");
        }
    };

    return (
        <AuthLayout>
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-2xl font-semibold text-black">Create an Account</h3>
                <p className="text-sm text-slate-700 mt-[5px] mb-6">
                    Join us today by entering your details below.
                </p>

                <form onSubmit={handleSubmit}>
                    <Input 
                        icon={<Mail size={18} />}
                        type="text"
                        label="Email"
                        value={formData.email}
                        placeholder="mail@site.com"
                        onChange={handleChange("email")}
                        error={errors.email}
                    />

                    <Input 
                        icon={<KeyRound size={18} />}
                        type="password"
                        label="Password"
                        value={formData.password}
                        placeholder="Enter password"
                        onChange={handleChange("password")}
                        error={errors.password}
                    />

                    {/* Password Strength Meter - Only show if password is not empty */}
                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out`}
                        style={{
                            maxHeight: formData.password ? "200px" : "0px", // adjust according to your PasswordStrengthMeter height
                        }}
                    >
                        <div
                            className="transform origin-top transition-transform duration-300 ease-in-out"
                            style={{
                                transform: formData.password ? "scaleY(1)" : "scaleY(0)",
                            }}
                        >
                            <PasswordStrengthMeter password={formData.password} />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="btn-success"
                        disabled={isSigningUp}
                    >
                        { isSigningUp ? <Loader size={20} className="animate-spin mx-auto" /> : "SIGN UP" }
                    </button>

                    <p className="text-[13px] text-slate-800 mt-3">
                        If Already have an Account?{" "}
                        <Link 
                            to="/login"
                            className="font-[Comfortaa] font-medium text-primary underline hover:opacity-80 transition-all"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
}