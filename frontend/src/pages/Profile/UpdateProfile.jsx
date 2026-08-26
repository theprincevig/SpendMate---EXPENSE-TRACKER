import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Camera, Loader, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { validateProfile } from "../../errors/profile.error";
import { useAuthStore } from "../../store/useAuthStore";
import { hasErrors } from "../../errors/errors";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import Input from "../../components/inputs/Input";
import CharAvatar from "../../components/cards/CharAvatar";
import UpdateProfileSkeleton from "../../components/skeletons/UpdateProfileSkeleton";

export default function UpdateProfile() {
    const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();

    const emptyProfile = {
        fullName: "",
        dob: ""
    }

    const [profileData, setProfileData] = useState(emptyProfile);
    const [errors, setErrors] = useState(emptyProfile);
    const [profilePic, setProfilePic] = useState(null);
    const [preview, setPreview] = useState("");
    const [profilePicRemoved, setProfilePicRemoved] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authUser) return;

        setProfileData({
            fullName: authUser.fullName || "",
            dob: authUser.dob
                ? new Date(authUser.dob).toISOString().split("T")[0]
                : "",
        });

        if (authUser.profilePic) {
            setPreview(authUser.profilePic);
        }
    }, [authUser]);
    
    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const handleChange = (field) => (e) => {
        setProfileData(prev => ({ ...prev, [field]: e.target.value }));
        setErrors(prev => ({ ...prev, [field]: "" }));
    };
    
    async function uploadProfilePic(e) {
        const file = e.target.files[0];
        if (!file) return;

        const profilePicUrl = URL.createObjectURL(file);
        
        setProfilePic(file);
        setPreview(profilePicUrl);
        setProfilePicRemoved(false);
    };
    
    function removeProfilePic() {
        setPreview("");
        setProfilePic(null);
        setProfilePicRemoved(true);
        toast.success("Profile picture will be removed successfully!");
    };

    async function handleSave(e) {
        e.preventDefault();

        const newErrors = validateProfile({...profileData, profilePic});
        if (hasErrors(newErrors)) return setErrors(newErrors);

        try {
            let profilePicSend = undefined;

            if (profilePicRemoved) {
                profilePicSend = "";
            } else if (profilePic) {
                profilePicSend = profilePic;
            }
            
            await updateProfile({ ...profileData, profilePic: profilePicSend });
            navigate("/profile");
            toast.success("Profile updated successfully!");

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        }
    };

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
                            
                            {preview ? (
                                <button 
                                    type="button"
                                    onClick={removeProfilePic}
                                    className="absolute bottom-0 right-0 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 hover:scale-110 transition-all cursor-pointer"
                                    disabled={isUpdatingProfile}
                                >
                                    <Trash2 size={16} />
                                </button>
                            ) : (
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
                                        onChange={uploadProfilePic}
                                        disabled={isUpdatingProfile} 
                                    />
                                </label>
                            )}
                        </div>

                        <div className="w-full space-y-4">
                            <Input 
                                type="text"
                                label="Full Name"
                                value={profileData.fullName}
                                placeholder="Add your name"
                                onChange={handleChange("fullName")}
                                error={errors.fullName}
                                disabled={isUpdatingProfile}
                            />

                            <Input 
                                type="date"
                                label="Date of Birth"
                                value={profileData.dob}
                                placeholder="Add your dob"
                                onChange={handleChange("dob")}
                                error={errors.dob}
                                disabled={isUpdatingProfile}
                            />
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