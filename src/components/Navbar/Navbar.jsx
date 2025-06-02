import { useState } from "react";
import {  FaChevronDown } from "react-icons/fa";
import userImage from "../../assets/Logo.png"; // Replace with the actual image path
import celenderIcon from '../../assets/images/celender.png';
import notificationsIcon from '../../assets/images/notifications.png';
import messagesIcon from '../../assets/images/messages.png';
import { FiLogOut } from "react-icons/fi"; // optional logout icon
import { FiUser } from "react-icons/fi"; 
import FiKey  from "../../assets/images/keyicon.svg"; 
import LanguageSwitcher from "../ui/buttons/LanguageSwitcher";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Remove the token
    localStorage.removeItem("HrSystem"); // Adjust based on how your token is stored
    // Navigate to login page
    navigate("/login");
  };


return (
  <>
    {/* Overlay that covers the entire screen (including navbar) */}
    {dropdownOpen && (
      <div
        onClick={() => setDropdownOpen(false)}
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
      />
    )}

    {/* Navbar */}
    <nav
      className="bg-white shadow-md shadow-indigo-100 py-6 px-6 flex flex-row justify-between items-center"
      style={{
        height: "61px",
        borderInlineStart: "1px solid #1E1E1E1A",
        position: "relative",
        zIndex: 30, // Below overlay
        marginInlineStart:"13px"
      }}
    >
      {/* Title on the right */}
      <div className="text-xl font-bold">العنوان</div>

      {/* Icons and Profile */}
      <div className="flex items-center gap-8">
        {/* Icons Section */}
        <div className="flex gap-4">
          <button className="flex flex-col justify-center items-center text-[18px]">
            <img src={celenderIcon} alt="calendar" style={{width:"40px",height:"40px"}}/>
          </button>
             <button className="flex flex-col justify-center items-center text-[18px]">
            <img src={messagesIcon} alt="messages" style={{width:"40px",height:"40px"}}/>
          </button>
          <button className="flex flex-col justify-center items-center text-[18px]">
            <img src={notificationsIcon} alt="notifications" style={{width:"40px",height:"40px"}}/>
          </button>
       
        </div>

        {/* Profile Section */}
        <div
          className="relative flex items-center"
          style={{ width: "18rem", justifyContent: "space-between" }}
        >
          {/* User Info */}
          <div className="flex items-center">
            <img
              src={userImage}
              alt="User"
              className="w-12 h-12 rounded-full object-cover border border-gray-300"
            />
            <div className="me-4 " style={{marginInlineStart:"10px"}}>
              <p
                className="font-semibold text-sm"
                style={{
                  fontFamily: "Cairo",
                  fontSize: "16px",
                  lineHeight: "24px",
                  fontWeight: 500,
                  color: "#3D3D3D",
                }}
              >
                محمد الغريب
              </p>
              <p
                style={{
                  fontFamily: "Cairo-Regular",
                  fontWeight: 400,
                  fontSize: "10px",
                  marginBlockStart: "4px",
                  color: "#3D3D3DCC",
                }}
              >
                Mohamedmahmoud@icloud.com
              </p>
            </div>
          </div>

          {/* Dropdown Toggle */}
          <button
            onClick={toggleDropdown}
            className="ml-2 p-2 rounded-full hover:bg-gray-100"
          >
            <FaChevronDown className="text-gray-400" />
          </button>
        </div>
      </div>
    </nav>

    {/* Dropdown (placed outside nav, on top of overlay) */}
    {dropdownOpen && (
      <div
        className="absolute bg-white shadow-lg rounded-xl py-5"
        style={{
          top: "80px", // below the navbar
          insetInlineEnd: "36px", // adjust for RTL alignment
          width: "22rem",
          zIndex: 50,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center mb-4 px-4">
          <img
            src={userImage}
            alt="User"
            className="w-12 h-12 rounded-full object-cover border border-gray-300"
          />
          <div className="me-4 text-right mr-2">
            <p
              className="font-semibold text-sm"
              style={{
                fontFamily: "Cairo",
                fontSize: "16px",
                lineHeight: "24px",
                fontWeight: 500,
                color: "#3D3D3D",
              }}
            >
              محمد الغريب
            </p>
            <p
              style={{
                fontFamily: "Cairo-Regular",
                fontWeight: 400,
                fontSize: "12px",
                marginBlockStart: "4px",
                color: "#1D1D1D40",
              }}
            >
              Mohamedmahmoud@icloud.com
            </p>
          </div>
        </div>

        <hr className="my-2 border-t" style={{ border: "1px solid #1E1E1E1A" }} />

        <a
          href="#"
          className="block px-4 py-2 mb-4 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
        >
          <FiUser className="w-5 h-5" />
          <span>عرض الملف الشخصي</span>
        </a>

    <LanguageSwitcher />


        <a
          href="#"
          className="block px-4 py-2 mb-4 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
        >
          <img src={FiKey} className="w-5 h-5" alt="key" />
          <span>تغيير كلمة المرور</span>
        </a>

        <hr className="my-2 border-t" style={{ border: "1px solid #1E1E1E1A" }} />

        <a
          onClick={handleLogout}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
        >
          <FiLogOut className="w-5 h-5" />
          <span>تسجيل الخروج</span>
        </a>
      </div>
    )}
  </>
);

}

export default Navbar;
