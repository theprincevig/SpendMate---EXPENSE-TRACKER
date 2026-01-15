import { useAuthStore } from "../../store/useAuthStore";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

export default function DashboardLayout({ activeMenu, children }) {
    const { authUser } = useAuthStore();

    return (
        <div>
            <Navbar activeMenu={activeMenu} />

            {authUser && (
                <div className="flex">
                    <div className="max-[1080px]:hidden">
                        <SideMenu activeMenu={activeMenu} />
                    </div>

                    <div className="grow mx-5">{ children }</div>
                </div>
            )}
        </div>
    );
}