import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from "../../lib/helper";
import { KeyRound, Loader, Mail } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/inputs/Input";

export default function Login() {
    const data = { email: "", password: "" };

    const [formData, setFormData] = useState(data);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { isLoggingIn, login } = useAuthStore();

    // Handle login form submit
    async function handleSubmit(e) {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            setError("Please enter a valid email.");
            return;
        }

        if (!formData.password) {
            setError("please enter your password");
            return;
        }

        setError("");

        try {
            await login(formData);
            setFormData(data);
            navigate("/dashboard");

        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);

            } else {
                setError("Something went wrong! Please try again.");
            }
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
                        value={formData.email}
                        label="Email"
                        placeholder="mail@site.com"
                        onChange={({ target }) => setFormData({ ...formData, email: target.value })}
                    />

                    <Input 
                        icon={<KeyRound size={18} />}
                        type="password"
                        value={formData.password}
                        label="Password"
                        placeholder="Enter password"
                        onChange={({ target }) => setFormData({ ...formData, password: target.value })}
                    />

                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

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
                            className="font-[Comfortaa] font-medium text-primary underline hover:opacity-80 transition-all"
                        >
                            Signup
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
}