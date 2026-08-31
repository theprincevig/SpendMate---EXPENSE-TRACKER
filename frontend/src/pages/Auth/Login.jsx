import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { KeyRound, Loader, Mail } from "lucide-react";
import toast from "react-hot-toast";

import { hasErrors } from "../../errors/errors";
import { useAuthStore } from "../../store/useAuthStore";
import { validateLogin } from "../../errors/auth.error";

import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/inputs/Input";

export default function Login() {
    const data = { email: "", password: "" };
    
    const { isLoggingIn, login } = useAuthStore();

    const [formData, setFormData] = useState(data);
    const [errors, setErrors] = useState(data);
    const navigate = useNavigate();

    const handleChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        setErrors(prev => ({ ...prev, [field]: "" }));
    };

    // Handle login form submit
    async function handleSubmit(e) {
        e.preventDefault();

        if (isLoggingIn) return;

        const newErrors = validateLogin(formData);
        if (hasErrors(newErrors)) return setErrors(newErrors);

        try {
            await login(formData);
            setFormData(data);
            navigate("/dashboard");
            toast.success("Welcome back to the spendmate!");

        } catch (error) {
            console.error(error.error);
            toast.error(error.error || "Failed to login");
        }
    }

    return (
        <AuthLayout>
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-2xl font-semibold text-black">Welcome Back</h3>
                <p className="text-sm text-slate-700 mt-[5px] mb-6">
                    Please enter your details to login
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

                    <button 
                        type="submit"
                        className="btn-success"
                        disabled={isLoggingIn}
                    >
                        { isLoggingIn ? <Loader size={20} className="animate-spin mx-auto" /> : "LOGIN" }
                    </button>

                    <p className="text-[13px] text-slate-800 mt-3">
                        Don't have an Account?{" "}
                        <Link 
                            to="/signup"
                            className="font-[Basic] font-medium text-primary underline hover:opacity-80 transition-all"
                        >
                            Signup
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
}