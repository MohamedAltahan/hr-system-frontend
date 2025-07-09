import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useAuthReady } from "../../hooks/useAuthReady";

const AppLayout = () => {
  const isAuthReady = useAuthReady();
  const [direction, setDirection] = useState("ltr");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar toggle

  useEffect(() => {
    const lang = localStorage.getItem("lang") || "en";
    const dir = lang === "ar" ? "rtl" : "ltr";
    setDirection(dir);
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, []);

  if (!isAuthReady) return null; // or <SplashScreen />

  return (
    <div className={`flex gap-2 min-h-screen ${direction}`} dir={direction}>
      {/* Sidebar */}
      <div
        className={`
          fixed top-0 h-full
          rounded-tl-3xl rounded-bl-3xl shadow-xl
          transition-all duration-300
          ${direction === "rtl" ? "right-0 rounded-tr-3xl rounded-br-3xl rounded-tl-none rounded-bl-none" : "left-0"}
          ${isSidebarOpen ? "w-[16vw] max-w-[16rem] min-w-[12rem]" : "w-[4rem]"}
          md:${isSidebarOpen ? "w-[15vw]" : "w-[4rem]"} sm:${isSidebarOpen ? "w-[25vw] min-w-[10rem]" : "w-[4rem]"}
        `}
      >
        <Sidebar isOpen={isSidebarOpen} />
      </div>

      {/* Main Content */}
      <div
        className={`w-full transition-all duration-300`}
        style={{
          marginLeft: direction === "ltr" ? (isSidebarOpen ? "calc(16vw + 0.5rem)" : "calc(4rem + 0.5rem)") : "0",
          marginRight: direction === "rtl" ? (isSidebarOpen ? "calc(16vw + 0.5rem)" : "calc(4rem + 0.5rem)") : "0",
          backgroundColor: "#F6F6F6",
          maxWidth: isSidebarOpen ? "calc(100vw - 16vw - 0.5rem)" : "calc(100vw - 4rem - 0.5rem)",
        }}
      >
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="p-4 sm:p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;