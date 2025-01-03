import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardCustomer from "./pages/customer/DashboardCustomer";

import Dashboard from './pages/admin/Dashboard';
import Menus from "./pages/admin/Menus";
import AddMenu from "./pages/admin/AddMenu";
import Users from "./pages/admin/Users";
import AdminLayout from "./pages/AdminLayout";
import Orders from "./pages/admin/orders";


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  const handleLogout = () => {
    console.log('logout');
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
  }, []);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={token ? (
            <Navigate to={role === "admin" ? "/admin/dashboard" : "/customer-dashboard"} replace />
          ) : (
            <Login setToken={setToken} setRole={setRole} />
          )}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/*" element={
          <AdminLayout handleLogout={handleLogout}>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="menu" element={<Menus />} />
              <Route path="orders" element={<Orders />} />
              <Route path="post-menu" element={<AddMenu />} />
              <Route path="users" element={<Users />} />
            </Routes>
          </AdminLayout>
        } />
        <Route path="/customer-dashboard" element={<DashboardCustomer handleLogout={handleLogout} />} />
      </Routes>
    </Router>
  );
}

export default App;
