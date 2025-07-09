import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/newLogo.jpg";
import { FiLogOut, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useGetSidebarServicesQuery } from "../../api/SidebarApi";
import DefaultIcon from "../Icons/DotIcon";
import { BsBuilding } from "react-icons/bs";
import { CiBadgeDollar } from "react-icons/ci";
import { useTranslation } from "react-i18next";
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

const iconMap = {
  companies_and_plans: BsBuilding,
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
  leaves: Holidays,
  my_requests: Order,
  my_evaluation: Reports,
  my_salary: Salary,
};

const Sidebar = ({ isOpen }) => {
  const { t } = useTranslation();
  const [openMenus, setOpenMenus] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading, isError } = useGetSidebarServicesQuery();

  const toggleMenu = (id) => {
    setOpenMenus((prev) => ({
      [id]: !prev[id] || false,
    }));
  };

  useEffect(() => {
    if (!data?.body) return;
    const initialOpenMenus = {};
    data.body.forEach((item) => {
      if (
        item.children?.some((child) => {
          const route = child.route || child.slug || "";
          return location.pathname.includes(`/app/${route}`);
        })
      ) {
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
    [...items]
      .filter((item) => item.is_active === 1 && iconMap[item.icon])
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((item, index) => {
        const Icon = iconMap[item.icon];
        const hasChildren = Array.isArray(item.children) && item.children.length > 0;
        const isMenuOpen = openMenus[item.id];

        if (!Icon || item.is_active !== 1) return null;

        return (
          <li key={index}>
            <div
              className={`flex items-center justify-between p-2 transition duration-200 gap-3 ${
                isMenuOpen ? "bg-[#055393] text-white" : "text-black hover:bg-[#055393] hover:text-white"
              }`}
              style={{
                height: "2.5rem",
                borderRadius: "0.625rem",
                cursor: hasChildren ? "pointer" : "default",
              }}
              onClick={() => hasChildren && isOpen && toggleMenu(item.id)} // Only toggle if sidebar is open
            >
              <div className="flex items-center gap-3 ">
                <Icon className="w-5 h-5 sm:w-4 sm:h-4" />
                {isOpen && <span className="text-[16px] font-normal title-lg-2">{item.name}</span>}
              </div>
              {hasChildren && isOpen && (
                <span className="text-sm">{isMenuOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
              )}
            </div>

            {hasChildren && isMenuOpen && isOpen && (
              <ul className="pl-6 space-y-1 mt-1">
                {[...item.children]
                  .filter((child) => child.is_active === 1)
                  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                  .map((child, idx) => {
                    const ChildIcon = iconMap[child.icon] || DefaultIcon;
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
                            } text-sm sm:text-xs`
                          }
                          style={{ height: "2.25rem", borderRadius: "0.5rem", backgroundColor: "transparent" }}
                        >
                          <ChildIcon className="w-4 h-4 sm:w-3 sm:h-3" />
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
      className="fixed top-0 z-40 h-full transition-transform"
      style={{
        width: isOpen ? "17vw" : "6rem",
        maxWidth: isOpen ? "17rem" : "6rem",
        minWidth: isOpen ? "12rem" : "6rem",
        backgroundColor: "#F6F6F6",
        overflow: "hidden",
      }}
    >
      <div className="h-full overflow-hidden bg-white">
        <img
          src={Logo}
          className={`py-3 mx-auto ${isOpen ? "w-24 sm:w-20" : "w-10 sm:w-8"}` }
          style={{  height: "3.4rem",}}
          alt="Logo"
        />
        <hr className="border-t" style={{ border: "1px solid #1E1E1E1A" }} />

        <ul
          className="space-y-2 font-medium px-3 pt-4 overflow-y-auto custom-scrollbar"
          style={{ maxHeight: "calc(100vh - 6rem)" }}
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
              style={{ height: "2.5rem", borderRadius: "0.625rem" }}
            >
              <FiLogOut className="w-5 h-5 sm:w-4 sm:h-4" />
              {isOpen && <span className="text-base sm:text-sm font-normal">{t("logout")}</span>}
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;