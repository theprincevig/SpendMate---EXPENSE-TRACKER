import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/inputs/Input";
import PasswordStrengthMeter from "../../components/inputs/PasswordStrengthMeter";
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from "../../lib/helper";
import { useState } from "react";
import { KeyRound, Loader, Mail } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

export default function Signup() {
    const data = { email: "", password: "" };

    const [formData, setFormData] = useState(data);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { isSigningUp, signup } = useAuthStore();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!validatePassword(formData.password)) {
            setError("Please enter a strong/unique password.");
            return;
        }

        setError("");

        try {
            await signup(formData);
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
                <h3 className="text-2xl font-semibold text-black">Create an Account</h3>
                <p className="text-sm text-slate-700 mt-[5px] mb-6">
                    Join us today by entering your details below.
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

                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

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