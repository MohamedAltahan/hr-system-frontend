import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetSidebarServicesQuery } from '../../api/SidebarApi'

import userImage from "../../assets/newLogo.png";
import celenderIcon from '../../assets/images/celender.png';
import notificationsIcon from '../../assets/images/notifications.png';
import messagesIcon from '../../assets/images/messages.png';
import { FiLogOut, FiUser } from "react-icons/fi";
import FiKey from "../../assets/images/keyicon.svg";
import LanguageSwitcher from "../ui/buttons/LanguageSwitcher";
import { useTranslation } from "react-i18next";

// ✅ move this function before any use
const getCurrentPageTitle = (menu, currentPath,t) => {

  currentPath = currentPath.replace(/^\/+/, '');
  

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

  return ' ';
};


const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: sidebarData, isLoading } = useGetSidebarServicesQuery();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  
const pathname = location.pathname.replace(/^\/app\//, '');

 const currentTitle = !isLoading && sidebarData
? getCurrentPageTitle(sidebarData.body, pathname, t)
  : ' ';



  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* Overlay */}
      {dropdownOpen && (
        <div
          onClick={() => setDropdownOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
        />
      )}

      {/* Navbar */}
      <nav className="bg-white shadow-md py-6 px-6 flex justify-between items-center"
           style={{ height: "61px", borderInlineStart: "1px solid #1E1E1E1A", position: "relative", zIndex: 30, marginInlineStart: "13px" }}>
        <div className=" font-bold" style={{fontSize:"17px"}}>{currentTitle}</div>
        <div className="flex items-center gap-8">
          <div className="flex gap-4">
            <img src={celenderIcon} alt="calendar" className="w-10 h-10" />
            <img src={messagesIcon} alt="messages" className="w-10 h-10" />
            <img src={notificationsIcon} alt="notifications" className="w-10 h-10" />
          </div>

          <div className="relative flex items-center" style={{ width: "16rem", justifyContent: "space-between" }}>
            <div className="flex items-center">
              <img
                src={user.avatar || userImage}
                alt="User"
                className="w-11 h-11 rounded-full object-cover border border-gray-300"
              />
              <div className="me-4 ms-2">
                <p className="font-semibold text-sm text-gray-800">{user.name || '---'}</p>
                <p className="text-xs text-gray-500">{user.email || '---'}</p>
              </div>
            </div>
            <button onClick={toggleDropdown} className="ml-2 p-2 rounded-full hover:bg-gray-100">
              <FaChevronDown className="text-gray-400" />
            </button>
          </div>
        </div>
      </nav>

      {/* Dropdown */}
      {dropdownOpen && (
        <div
          className="absolute bg-white shadow-lg rounded-xl py-5"
          style={{ top: "80px", insetInlineEnd: "36px", width: "22rem", zIndex: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center mb-4 px-4">
            <img
              src={user.avatar || userImage}
              alt="User"
              className="w-12 h-12 rounded-full object-cover border border-gray-300"
            />
            <div className="me-4 ml-2 mr-2">
              <p className="font-semibold text-sm text-gray-800">{user.name || '---'}</p>
              <p className="text-xs text-gray-500 ">{user.email || '---'}</p>
            </div>
          </div>

          <hr className="my-2 border-t border-gray-200" />

          <Link
            to="/app/profile"
            onClick={() => setDropdownOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <FiUser className="w-5 h-5" />
            <span>{t('show_profile')}</span>
          </Link>

          <LanguageSwitcher />

          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
            <img src={FiKey} className="w-5 h-5" alt="key" />
            <span>{t('change_password')}</span>
          </a>

          <hr className="my-2 border-t border-gray-200" />

          <a onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
            <FiLogOut className="w-5 h-5" />
            <span>{t('logout')}</span>
          </a>
        </div>
      )}
    </>
  );
};

export default Navbar;
