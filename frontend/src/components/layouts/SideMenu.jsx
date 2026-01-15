import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { SIDE_MENU_DATA } from "../../utils/data";
import CharAvatar from "../cards/CharAvatar";

export default function SideMenu({ activeMenu }) {
    const { authUser, logout } = useAuthStore();
    const navigate = useNavigate();

    function handleClick(route) {
        if (route === "logout") {
            logout();
            navigate("/login");
            return;
        }

        navigate(route);
    }

    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-white border border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
                {authUser?.profilePic ? (
                    <img 
                        src={authUser?.profilePic || ""} 
                        alt="Profile photo" 
                        className="size-20 bg-slate-400 rounded-full"
                    />
                ) : (
                    <CharAvatar
                        fullName={authUser?.fullName}
                        width="w-20"
                        height="h-20"
                        style="text-2xl"
                    />
                )}

                <h5 className="text-gray-950 font-medium leading-6">
                    {authUser?.fullName || ""}
                </h5>
            </div>

            {SIDE_MENU_DATA.map((item, index) => (
                <button
                    key={`menu_${index}`}
                    className={`
                        w-full flex items-center gap-4 text-[15px] 
                        ${activeMenu === item.label ? "text-white bg-green-500" : "hover:bg-gray-100 transition-all"}
                        py-3 px-6 rounded-lg mb-3 cursor-pointer
                    `}
                    onClick={() => handleClick(item.path)}
                >
                    <item.icon size={20} />
                    {item.label}
                </button>
            ))}
        </div>
    );
}