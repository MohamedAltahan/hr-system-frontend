import { Link } from "react-router-dom";
import image from "../../assets/MainLogo.png";

const Nav = () => {
  return (
    <nav className="bg-white">
      <div className="max-w-screen-2xl mx-auto flex flex-wrap items-center justify-between px-6 py-4">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={image} className="h-20 w-auto" alt="Main Logo" />
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex items-center p-2 text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-sticky"
          aria-expanded="false"
          onClick={() => {
            const navMenu = document.getElementById("navbar-sticky");
            navMenu.classList.toggle("hidden");
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto"
          id="navbar-sticky"
        >
          <ul className="flex flex-col gap-6 mt-4 md:mt-0 md:flex-row md:gap-12">
            <li>
              <a
                href="#"
                className="text-[#817FA8] hover:text-[#1A2B88] text-lg transition duration-300"
              >
                عن النظام
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#817FA8] hover:text-[#1A2B88] text-lg transition duration-300"
              >
                محتوى
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#817FA8] hover:text-[#1A2B88] text-lg transition duration-300"
              >
                عن المنشأة
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-[#817FA8] hover:text-[#1A2B88] text-lg transition duration-300"
              >
                حجز اجتماع
              </a>
            </li>
          </ul>
        </div>

        {/* Login Button */}
        <div className="flex order-2 ">
          <Link to="/login">
            <button
              type="button"
              className="text-[#1A2B88] bg-transparent border border-[#1A2B88] hover:bg-[#1A2B88] hover:text-white transition-all ease-out duration-500 font-medium rounded-lg text-sm px-4 py-2"
            >
              تسجيل دخول
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
