import { HiOutlineHome, HiOutlineGlobeAlt, HiOutlineKey, HiOutlineCog, HiOutlineCode } from "react-icons/hi";

const Sidebar = ({ active, partnerName }) => {
  const menuItems = [
    { name: "Dashboard", link: "/", icon: <HiOutlineHome size={20} /> },
  
    { name: "Settings", link: "/settings", icon: <HiOutlineCog size={20} /> },
    { name: "Developers", link: "/developers", icon: <HiOutlineCode size={20} /> },
  ];

  return (
    <div className="w-64 h-screen bg-teal-50 text-gray-700 flex flex-col">
      <div className="p-6 text-xl font-bold border-b border-gray-300">{partnerName || "Partner Portal"}</div>
      <ul className="flex-grow p-4 space-y-2">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`flex items-center p-3 rounded ${
              active === item.name ? "text-green-600" : "text-gray-700"
            } hover:text-green-600`}
          >
            <span className="mr-3">{item.icon}</span>
            <a href={item.link} className="block">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
