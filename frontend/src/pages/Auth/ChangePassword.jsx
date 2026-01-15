import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { KeyRound, Loader } from "lucide-react";
import PasswordStrengthMeter from "../../components/inputs/PasswordStrengthMeter";
import toast from "react-hot-toast";
import { validatePassword } from "../../lib/helper";

export default function ChangePassword() {
    const { isResettingPassword, changePassword, logout } = useAuthStore();
    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleChange(e) {
        e.preventDefault();

        if (!currentPassword) {
            setError("Please enter your current password.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords doesn't match.");
            return;
        }

        if (!validatePassword(newPassword || confirmPassword)) {
            setError("Please enter a strong/unique password.");
            return;
        }

        setError("");

        try {
            await changePassword(currentPassword, newPassword);
            await logout(); // if you have logout in store
            toast.success("Password Updated Successfully! Please login again.");
            navigate("/login");

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error("Error updating password :", error);
            toast.error(error.response?.data?.message || "Failed to Updating Password.");
        }
    }

    return (
        <div className="h-screen flex items-center justify-center p-4 ">
            <div className="w-full max-w-xl flex flex-col items-center justify-center shadow-lg rounded-xl overflow-hidden">
                <div className="w-full bg-emerald-500 text-white flex flex-col items-center justify-center py-1">
                    <h3 className="sm:text-2xl text-lg font-semibold SansFlex uppercase">Change Pa$$wo₹d</h3>
                    <p className="sm:text-sm text-xs">A stronger password, a safer account.</p>
                </div>

                <form 
                    onSubmit={handleChange}
                    className="w-full p-4"
                >
                    <Input 
                        icon={<KeyRound size={16} />}
                        type="password"
                        value={currentPassword}
                        label="Current Password"
                        placeholder="Enter current password"
                        onChange={({ target }) => setCurrentPassword(target.value)}
                    />

                    <Input 
                        icon={<KeyRound size={16} />}
                        type="password"
                        value={newPassword}
                        label="New Password"
                        placeholder="Enter new password"
                        onChange={({ target }) => {
                            setNewPassword(target.value)
                            setError(null);
                        }}
                    />

                    <Input 
                        icon={<KeyRound size={16} />}
                        type="password"
                        value={confirmPassword}
                        label="Confirm Password"
                        placeholder="Enter confirm password"
                        onChange={({ target }) => setConfirmPassword(target.value)}
                    />

                    {error && (
                        <p className="text-xs text-red-500 ml-4">{error}</p>
                    )}

                    <PasswordStrengthMeter password={newPassword} />

                    <button 
                        type="submit"
                        className="btn-success"
                        disabled={isResettingPassword}
                    >
                        { isResettingPassword ? <Loader size={20} className="animate-spin mx-auto" /> : "CONFIRM" }
                    </button>
                </form>
            </div>
        </div>
    );
}