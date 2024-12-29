import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
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

  return (
    <div className="sidebar w-64 h-screen bg-gray-800 text-white fixed">
      <div className="p-6 text-xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="mt-4">
        <ul>
          <li
            className={`px-6 py-2 hover:bg-gray-700 ${activeIndex === 0 ? 'bg-gray-700' : ''}`}
            onClick={() => handleMenuClick(0)}
          >
            <NavLink to="/admin/dashboard" className="block">Dashboard</NavLink>
          </li>
          <li
            className={`px-6 py-2 hover:bg-gray-700 ${activeIndex === 1 ? 'bg-gray-700' : ''}`}
            onClick={() => handleMenuClick(1)}
          >
            <NavLink to="/admin/menu" className="block">Menu</NavLink>
          </li>
          <li
            className={`px-6 py-2 hover:bg-gray-700 ${activeIndex === 2 ? 'bg-gray-700' : ''}`}
            onClick={() => handleMenuClick(2)}
          >
            <NavLink to="/admin/post-menu" className="block">Add Produk</NavLink>
          </li>
          <li
            className={`px-6 py-2 hover:bg-gray-700 ${activeIndex === 3 ? 'bg-gray-700' : ''}`}
            onClick={() => handleMenuClick(3)}
          >
            <NavLink to="/admin/users" className="block">Users</NavLink>
          </li>
          <li
            className="px-6 py-2 hover:bg-gray-700"
            onClick={() => {
              localStorage.clear();
              setActiveIndex(0); // Reset ke index 0 saat logout
            }}
          >
            <NavLink to="/" className="block">Logout</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
