import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaHamburger, FaUsers, FaShoppingCart, FaCog, FaBars, FaTimes } from "react-icons/fa"; // Import Icons

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const storedIndex = localStorage.getItem("activeIndex");
    if (storedIndex) {
      setActiveIndex(Number(storedIndex));
    } else {
      setActiveIndex(0);
    }
  }, []);

  const handleMenuClick = (index) => {
    setActiveIndex(index);
    localStorage.setItem("activeIndex", index);
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaHome /> },
    { name: "Menu", icon: <FaHamburger /> },
    { name: "Orders", icon: <FaShoppingCart /> },
    { name: "Users", icon: <FaUsers /> },
    { name: "Settings", icon: <FaCog /> },
  ];

  return (
    <div
      className={`sidebar w-64 h-screen bg-gradient-to-b from-yellow-600 to-orange-700 text-white fixed shadow-lg transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="p-6 text-2xl font-semibold tracking-wide border-b border-yellow-500">
        Admin Panel
      </div>
      <nav className="mt-6">
        <ul className="space-y-3">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`px-6 py-3 rounded-lg cursor-pointer transition-colors ${
                activeIndex === index ? "bg-orange-800" : "hover:bg-yellow-500"
              }`}
              onClick={() => handleMenuClick(index)}
            >
              <NavLink
                to={`/admin/${item.name.toLowerCase()}`}
                className="flex items-center space-x-4 text-white font-medium"
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute top-4 right-4">
        <button
          className="text-white bg-yellow-600 rounded-full p-2 hover:bg-yellow-500 focus:outline-none"
          onClick={toggleSidebar}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
