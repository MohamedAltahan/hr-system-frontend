import {  Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Headers = ({ options, loading }) => {
    const location = useLocation();
    const navigate = useNavigate(); 

    const [defaultRoute, setDefaultRoute] = useState("");
console.log(defaultRoute);
    useEffect(() => {
        // Set default route based on the current URL path
        const currentRoute = location.pathname.split("/")[3] || "";
        console.log(currentRoute);
        
        setDefaultRoute(currentRoute);
    }, [location]);

    const handleChange = (event) => {
        const selectedRoute = options.find(option => option.route === event.target.value)?.route;
        if (selectedRoute) {
            navigate(selectedRoute);
        }
    };

    return (
        <div className='flex justify-between w-[95%] mx-auto'>
            <div className="text-center flex flex-col gap-3">
                <h1 className="text-[#110D5B] text-3xl">الخدمة الذاتية</h1>

                {loading ? (
                    <div className="text-gray-500">Loading...</div>
                ) : (
                    <select 
                        onChange={handleChange}
                        value={defaultRoute} // Bind the current default route
                        className="bg-gray-50 border-2 border-black text-gray-900 text-xl rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
                    >
                        {options?.map((option, index) => (
                              <option   key={index} value={option.route}>
                              <Link to={`${option.route}`}>

                              {option.title}
                              </Link>
                          </option>
                        ))}
                    </select>
                )}           
            </div>
         
        </div>
    );
}

Headers.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            route: PropTypes.string.isRequired,
        })
    ).isRequired,
    loading: PropTypes.bool.isRequired,
};

export default Headers;
