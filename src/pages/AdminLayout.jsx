import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";

const AdminLayout = ({ children, handleLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Status sidebar terbuka/tutup
  const navigate = useNavigate();

  const logoutWithNavigate = () => {
    handleLogout();
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); 
  };

  return (
    <div className="flex bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 min-h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 transition-all ${isSidebarOpen ? 'ml-64' : 'ml-0'} bg-white rounded-lg shadow-2xl`}
      >
        <Header handleLogout={logoutWithNavigate} toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
        <div className="p-6 bg-gray-50 rounded-lg shadow-md min-h-screen">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
