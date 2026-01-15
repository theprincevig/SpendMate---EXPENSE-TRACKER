import DashboardLayout from "../../components/layouts/DashboardLayout";
import { Pencil, User } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ViewProfileSkeleton from "../../components/skeletons/ViewProfileSkeleton";
import AdvanceSettings from "../../components/AdvanceSettings";

export default function ViewProfile() {
    const { authUser, getUserInfo } = useAuthStore();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            setLoading(true);
            await getUserInfo();
            setLoading(false);
        }

        fetchUser();
    }, []);

    return (
        <DashboardLayout activeMenu="Profile">
            <div className="my-5 mx-auto max-w-3xl">
                {loading ? (
                    <ViewProfileSkeleton />
                ) : (
                    <>
                        <div className="bg-white p-6 border-b border-gray-200/80 shadow-md flex gap-6 items-center justify-between">
                            {authUser?.profilePic ? (
                                <img 
                                    src={authUser.profilePic} 
                                    alt="profilePic" 
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                            ) : (
                                <div className="relative w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center">
                                    <User size={35} className="text-green-500" />
                                    <button 
                                        onClick={() => navigate("/profile/edit")}
                                        className="absolute bottom-0 right-0 bg-emerald-400 text-white p-2 rounded-full hover:bg-emerald-500 hover:scale-110 transition-all cursor-pointer"
                                    >
                                        <Pencil size={14} />
                                    </button>
                                </div>
                            )}

                            {/* Info */}
                            <div className="flex flex-col items-end">
                                <h2 className="text-xl SansFlex font-semibold">
                                    {authUser?.fullName || authUser?.email}
                                </h2>

                                <p className="text-sm text-gray-400 mt-1">
                                    {authUser?.dob 
                                        ? new Date(authUser.dob).toLocaleDateString()
                                        : "-"
                                    }
                                </p>

                                <p className="text-sm text-gray-400">
                                    Currency: {authUser?.currencyDetails?.symbol} {authUser?.currencyDetails?.code}
                                </p>
                            </div>
                        </div>
                    </>
                )}

                <AdvanceSettings />
            </div>
        </DashboardLayout>
    );
}