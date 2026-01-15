import { useState } from "react";
import { Menu, X } from "lucide-react";
import SideMenu from "./SideMenu";

export default function Navbar({ activeMenu }) {
    const [openSideMenu, setOpenSideMenu] = useState(false);

    return (
        <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-50">
            <button
                onClick={() => setOpenSideMenu(!openSideMenu)}
                className="block lg:hidden text-black "
            >
                {openSideMenu ? (
                    <X size={22} />
                ) : (
                    <Menu size={22} />
                )}
            </button>

            <h2 className="text-lg sm:text-2xl font-medium text-black">$pendMate</h2>

            {openSideMenu && (
                <div className="fixed top-[61px] -ml-4 bg-white">
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}
        </div>
    );
}