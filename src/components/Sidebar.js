import React from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineCog,
  HiOutlineCode,
  HiOutlineLogout,
} from "react-icons/hi";

const Sidebar = ({ active, partnerName }) => {
  console.log("Sidebar component rendered");
  console.log("Active Tab:", active);
  console.log("Partner Name:", partnerName);

  const menuItems = [
    { name: "Dashboard", link: "/dashboard", icon: <HiOutlineHome size={20} /> },
    { name: "Settings", link: "/settings", icon: <HiOutlineCog size={20} /> },
    { name: "Developers", link: "/developers", icon: <HiOutlineCode size={20} /> },
  ];

  const navigate = useNavigate();

  const handleNavigation = (link, name) => {
    console.log(`Navigating to ${name} (${link})`);
    navigate(link);
  };

  const handleLogout = () => {
    console.log("Logging out...");
  
    // Clear the auth token
    localStorage.removeItem("authToken");
    console.log("Auth token removed.");
  
    // Redirect to localhost:3000
    window.location.href = "http://localhost:3000";
  };
  
  
  
  

  return (
    <div className="w-64 h-screen bg-teal-50 text-gray-700 flex flex-col fixed left-0 top-0">
      <div className="p-6 text-xl font-bold border-b border-gray-300">
        {partnerName || "Partner Portal"}
      </div>
      <ul className="flex-grow p-4 space-y-2">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`flex items-center p-3 rounded cursor-pointer ${
              active === item.name ? "text-green-600" : "text-gray-700"
            } hover:text-green-600`}
            onClick={() => handleNavigation(item.link, item.name)}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center p-3 m-4 text-red-600 hover:text-red-800 border-t border-gray-300"
      >
        <HiOutlineLogout size={20} className="mr-3" />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
