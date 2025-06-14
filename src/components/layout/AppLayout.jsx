import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useAuthReady } from "../../hooks/useAuthReady";

const AppLayout = () => {
  const isAuthReady = useAuthReady();
  const [direction, setDirection] = useState("ltr");

  useEffect(() => {
    const lang = localStorage.getItem("lang") || "en";
    const dir = lang === "ar" ? "rtl" : "ltr";
    setDirection(dir);

    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, []);

  if (!isAuthReady) return null; // or <SplashScreen />

  return (
    <div className={`flex gap-1 h-screen ${direction}`} dir={direction}>
      {/* Sidebar */}
      <div
        className={`fixed top-0 w-64 bg-[#0C0A34] rounded-tl-3xl rounded-bl-3xl shadow-xl h-full
          ${direction === "rtl" ? "right-0 rounded-tr-3xl rounded-br-3xl rounded-tl-none rounded-bl-none" : "left-0"}
        `}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div
        className={`w-full transition-all duration-300`}
        style={{
          marginLeft: direction === "ltr" ? "16rem" : "0",
          marginRight: direction === "rtl" ? "16rem" : "0",
          backgroundColor: "#F6F6F6",
        }}
      >
        <Navbar />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
