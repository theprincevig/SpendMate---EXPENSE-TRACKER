import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft, Camera, Loader, Trash2 } from "lucide-react";
import Input from "../../components/inputs/Input";
import CharAvatar from "../../components/cards/CharAvatar";
import { currencyConfig } from "../../config/currency.Config";
import UpdateProfileSkeleton from "../../components/skeletons/UpdateProfileSkeleton";

export default function UpdateProfile() {
    const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();

    const emptyProfile = {
        fullName: "",
        dob: "",
        currency: ""
    }

    const [profileData, setProfileData] = useState(emptyProfile);
    const [profilePic, setProfilePic] = useState(null);
    const [preview, setPreview] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!authUser) return;

        setProfileData({
            fullName: authUser.fullName || "",
            dob: authUser.dob
                ? new Date(authUser.dob).toISOString().split("T")[0]
                : "",
            currency: authUser.currencyDetails?.code || "INR",
        });
    }, [authUser]);
    
    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);
    
    async function handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        setProfilePic(file);
        setPreview(URL.createObjectURL(file));
    }
    
    function handleRemoveImage() {
        setPreview("");
        setProfilePic(null);
        toast.success("Profile picture will be removed successfully!");
    }

    async function handleSave() {
        try {
            const profilePicToSend = preview === "" ? "" : profilePic;
            await updateProfile({ ...profileData, profilePic: profilePicToSend });
            navigate("/profile");
            toast.success("Profile updated successfully!");

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        }
    }

    return (
        <DashboardLayout activeMenu="Profile">
            <div className="my-5 mx-auto max-w-3xl">
                {!authUser ? (
                    <UpdateProfileSkeleton />
                ) : (
                    <div className="bg-white p-6 shadow-md flex flex-col gap-6 items-center">
                        
                        <div className="relative">
                            {preview ? (
                                <img
                                    src={preview}
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                                ) : (
                                <CharAvatar
                                    fullName={profileData.fullName}
                                    width="w-24"
                                    height="h-24"
                                    style="text-2xl"
                                />
                            )}
                            
                            {preview === "" ? (
                                <label 
                                    htmlFor="avatar-upload"
                                    className={`
                                        absolute bottom-0 right-0 bg-emerald-50 p-2 rounded-full
                                        hover:scale-110 hover:bg-emerald-100 transition-all cursor-pointer
                                        ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                                    `}
                                >
                                    <Camera size={16} className="text-green-500" />
                                    <input 
                                        type="file"
                                        id="avatar-upload"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                        disabled={isUpdatingProfile} 
                                    />
                                </label>
                            ) : (
                                <button 
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute bottom-0 right-0 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 hover:scale-110 transition-all cursor-pointer"
                                    disabled={isUpdatingProfile}
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>

                        <div className="w-full space-y-4">
                            <Input 
                                type="text"
                                placeholder="Add your name"
                                value={profileData.fullName}
                                label="Full Name"
                                onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                                disabled={isUpdatingProfile}
                            />

                            <Input 
                                type="date"
                                placeholder="Add your dob"
                                value={profileData.dob}
                                label="Date of Birth"
                                onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })}
                                disabled={isUpdatingProfile}
                            />
                            
                            <label className="text-sm text-slate-800">Currency</label>
                            <select 
                                value={profileData.currency}
                                onChange={(e) => setProfileData({ ...profileData, currency: e.target.value })}
                                className="input-box"
                                disabled={isUpdatingProfile}
                            >
                                {Object.values(currencyConfig).map((currency) => (
                                    <option 
                                        key={currency.code} 
                                        value={currency.code}
                                    >
                                        {currency.symbol} {currency.code}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
                            <button
                                onClick={handleSave}
                                className="btn-success"
                                disabled={isUpdatingProfile}
                            >
                                {isUpdatingProfile ? <Loader size={18} className="animate-spin mx-auto" /> : "Save"}
                            </button>

                            <button
                                onClick={() => navigate("/profile")}
                                className="btn-cancel"
                            >
                                <ArrowLeft size={14} /> Back
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}