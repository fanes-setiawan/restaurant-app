import React from "react";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";

const AdminLayout = ({ children, handleLogout }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header handleLogout={handleLogout} />
        <div className="p-6">
          {children} 
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
