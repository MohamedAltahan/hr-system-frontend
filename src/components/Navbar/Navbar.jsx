import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetSidebarServicesQuery } from "../../api/SidebarApi";
import userImage from "../../assets/newLogo.png";
import celenderIcon from "../../assets/images/celender.png";
import notificationsIcon from "../../assets/images/notifications.png";
import messagesIcon from "../../assets/images/messages.png";
import { FiLogOut, FiUser, FiMenu } from "react-icons/fi";
import LanguageSwitcher from "../ui/buttons/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const getCurrentPageTitle = (menu, currentPath, t) => {
  currentPath = currentPath.replace(/^\/+/, "");
  for (const item of menu) {
    if (item.route && currentPath.startsWith(item.route)) {
      return item.name;
    }
    if (item.children?.length) {
      for (const child of item.children) {
        if (child.route && currentPath.startsWith(child.route)) {
          return child.name;
        }
      }
    }
  }
  return " ";
};

const Navbar = ({ toggleSidebar }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: sidebarData, isLoading } = useGetSidebarServicesQuery();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const pathname = location.pathname.replace(/^\/app\//, "");
  const currentTitle = !isLoading && sidebarData ? getCurrentPageTitle(sidebarData.body, pathname, t) : " ";

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {dropdownOpen && (
        <div
          onClick={() => setDropdownOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
        />
      )}

      <nav
        className="bg-white shadow-md py-4 px-6 flex justify-between items-center"
        style={{
          height: "3.5rem",
          borderInlineStart: "1px solid #1E1E1E1A",
          position: "relative",
          zIndex: 30,
          marginInlineStart: "0.4rem",
        }}
      >
        <div className="flex items-center gap-4">
          {/* <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-gray-100">
            <FiMenu className="w-5 h-5 sm:w-4 sm:h-4" />
          </button> */}
          <div className="font-bold text-lg sm:text-base">{currentTitle}</div>
        </div>
        <div className="flex items-center gap-6 sm:gap-4">
          <div className="flex gap-3 sm:gap-2">
            <img src={celenderIcon} alt="calendar" className="w-10 h-10 sm:w-10 sm:h-10" />
            <img src={messagesIcon} alt="messages" className="w-10 h-10 sm:w-10 sm:h-10" />
            <img src={notificationsIcon} alt="notifications" className="w-10 h-10 sm:w-10 sm:h-10" />
          </div>

          <div className="relative flex items-center" style={{ width: "auto", maxWidth: "16rem" }}>
            <div className="flex items-center">
              <img
                src={user.avatar || userImage}
                alt="User"
                className="w-10 h-10 sm:w-8 sm:h-8 rounded-full object-cover border border-gray-300"
              />
              <div className="me-4 ms-2">
                <p className="font-semibold text-sm sm:text-xs text-gray-800">{user.name || "---"}</p>
                <p className="text-xs sm:text-[0.65rem] text-gray-500">{user.email || "---"}</p>
              </div>
            </div>
            <button onClick={toggleDropdown} className="ml-2 p-2 rounded-full hover:bg-gray-100">
              <FaChevronDown className="text-gray-400 w-4 h-4 sm:w-3 sm:h-3" />
            </button>
          </div>
        </div>
      </nav>

      {dropdownOpen && (
        <div
          className="absolute bg-white shadow-lg rounded-xl py-4"
          style={{
            top: "4rem",
            insetInlineEnd: "2rem",
            width: "90%",
            maxWidth: "18rem",
            zIndex: 50,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center mb-3 px-4">
            <img
              src={user.avatar || userImage}
              alt="User"
              className="w-10 h-10 sm:w-8 sm:h-8 rounded-full object-cover border border-gray-300"
            />
            <div className="me-4 ml-2 mr-2">
              <p className="font-semibold text-sm sm:text-xs text-gray-800">{user.name || "---"}</p>
              <p className="text-xs sm:text-[0.65rem] text-gray-500">{user.email || "---"}</p>
            </div>
          </div>

          <hr className="my-2 border-t border-gray-200" />

          <Link
            to="/app/profile"
            onClick={() => setDropdownOpen(false)}
            className="block px-4 py-2 text-sm sm:text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <FiUser className="w-5 h-5 sm:w-4 sm:h-4" />
            <span>{t("show_profile")}</span>
          </Link>

          <LanguageSwitcher />

          <hr className="my-2 border-t border-gray-200" />

          <a
            onClick={handleLogout}
            className="block px-4 py-2 text-sm sm:text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
          >
            <FiLogOut className="w-5 h-5 sm:w-4 "> </FiLogOut>
            <span>{t("logout")}</span>
          </a>
        </div>
      )}
    </>
  );
};

export default Navbar;