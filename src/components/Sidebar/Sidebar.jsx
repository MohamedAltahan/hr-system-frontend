import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/newLogo.jpg";
import { FiLogOut, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useGetSidebarServicesQuery } from "../../api/SidebarApi";
import DefaultIcon from "../Icons/DotIcon";
import { BsBuilding } from "react-icons/bs";
import { CiBadgeDollar } from "react-icons/ci";
import { useTranslation } from "react-i18next";


// Icon imports
import Setting from "../Icons/Setting";
import SelfService from "../Icons/Self_service";
import Staff from "../Icons/Staff";
import Salary from "../Icons/Salary";
import Reports from "../Icons/Reports";
import Documents from "../Icons/Documents";
import Attendance from "../Icons/Attendance";
import Holidays from "../Icons/Holidays";
import Order from "../Icons/order";
import Others from "../Icons/Others";

// Icon mapping
const iconMap = {
  companies_and_plans: BsBuilding ,
  my_current_subscriptions: CiBadgeDollar,
  settings: Setting,
  self_service: SelfService,
  staff: Staff,
  salary: Salary,
  reports: Reports,
  documents: Documents,
  attendance: Attendance,
  holidays: Holidays,
  order: Order,
  others: Others,
  employees: Others,
  my_services: SelfService,
  profile: Staff,
  financial_history: Salary,
  my_documents: Documents,
  my_attendance: Attendance,
  my_assignments: Order,
  // disciplinary_actions: Others,
  my_requests: Order,
  my_evaluation: Reports,
  my_salary: Salary,
};

const Sidebar = () => {
    const { t } = useTranslation();

  const [openMenus, setOpenMenus] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading, isError } = useGetSidebarServicesQuery();

  // Toggle dropdown
const toggleMenu = (id) => {
  setOpenMenus((prev) => ({
    [id]: !prev[id] || false, // Only toggle the selected menu
  }));
};


  // Auto-open parent menus that match current route
  useEffect(() => {
    if (!data?.body) return;

    const initialOpenMenus = {};
    data.body.forEach((item) => {
      if (item.children?.some((child) => {
        const route = child.route || child.slug || "";
        return location.pathname.includes(`/app/${route}`);
      })) {
        initialOpenMenus[item.id] = true;
      }
    });
    setOpenMenus(initialOpenMenus);
  }, [data, location]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const renderSidebarItems = (items) =>
    items.map((item, index) => {
      const Icon = iconMap[item.icon];
      const hasChildren = Array.isArray(item.children) && item.children.length > 0;
      const isOpen = openMenus[item.id];

      if (!Icon || item.is_active !== 1) return null;

      return (
        <li key={index}>
          <div
            className={`flex items-center justify-between p-2 transition duration-200 gap-3 ${
              isOpen ? "bg-[#055393] text-white" : "text-black hover:bg-[#055393] hover:text-white"
            }`}
            style={{
              height: "48px",
              borderRadius: "10px",
              cursor: hasChildren ? "pointer" : "default",
            }}
            onClick={() => hasChildren && toggleMenu(item.id)}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5" />
              <span className="text-[16px] font-normal title-lg-2">{item.name}</span>
            </div>
            {hasChildren && <span className="text-sm">{isOpen ? <FiChevronUp /> : <FiChevronDown />}</span>}
          </div>

          {hasChildren && isOpen && (
            <ul className="pl-6 space-y-1 mt-1">
              {item.children.map((child, idx) => {
                const ChildIcon = iconMap[child.icon] || DefaultIcon;
                if (child.is_active !== 1) return null;

                const childRoute = child.route || child.slug || "#";

                return (
                  <li key={idx}>
                    <NavLink
                      to={`/app/${childRoute}`}
                      className={({ isActive }) =>
                        `flex items-center p-2 transition duration-200 gap-3 ${
                          isActive
                            ? "!font-semibold text-[#055393]"
                            : "hover:!font-semibold hover:text-[#055393]"
                        } title-sm`
                      }
                      style={{ height: "42px", borderRadius: "8px", backgroundColor: "transparent" }}
                    >
                      <ChildIcon className="w-4 h-4" />
                      <span>{child.name}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      );
    });

  return (
    <aside
      className="fixed top-0 z-40 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
      style={{ width: "16.8rem", backgroundColor: "rgb(246, 246, 246)", overflow: "hidden" }}
    >
      <div className="h-full overflow-hidden bg-white">
        <img
          src={Logo}
          className="py-3 mx-auto"
          alt="Logo"
        />
        <hr className="border-t" style={{ border: "1px solid #1E1E1E1A" }} />

        <ul
          className="space-y-2 font-medium px-3 pt-4 overflow-y-auto custom-scrollbar"
          style={{ maxHeight: "calc(100vh - 110px)" }}
        >
          {isLoading ? (
            <li className="text-center text-gray-500">Loading...</li>
          ) : isError ? (
            <li className="text-center text-red-500">Failed to load sidebar</li>
          ) : (
            renderSidebarItems(data?.body || [])
          )}

          <li>
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-2 gap-3 text-[#055393]"
              style={{ height: "48px", borderRadius: "10px" }}
            >
              <FiLogOut className="w-5 h-5" />
              <span className="text-[16px] font-normal">{t('logout')} </span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
