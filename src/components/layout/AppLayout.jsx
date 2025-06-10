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

    // Set HTML attributes for global effect
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, []);
  if (!isAuthReady) return null; // or <SplashScreen />

  return (
    <div className="flex gap-1 h-screen" dir={direction}>
      {/* Sidebar */}
      <div className="fixed top-0  w-64 bg-[#0C0A34] rounded-tl-3xl rounded-bl-3xl shadow-xl h-full">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ms-64 w-full" style={{ backgroundColor: "#F6F6F6"  }}>
        <Navbar />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default AppLayout;