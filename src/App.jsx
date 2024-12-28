import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardCustomer from './pages/DashboardCustomer';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  
  const handleLogout = () => {
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
            <Navigate to={role === "admin" ? "/admin-dashboard" : "/customer-dashboard"} replace />
          ) : (
            <Login setToken={setToken} setRole={setRole} />
          )}
        />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/admin-dashboard" 
          element={token && role === "admin" ? (
            <DashboardAdmin handleLogout={handleLogout} />
          ) : (
            <Navigate to="/" replace />
          )}
        />
        <Route 
          path="/customer-dashboard" 
          element={token && role === "customer" ? (
            <DashboardCustomer handleLogout={handleLogout} />
          ) : (
            <Navigate to="/" replace />
          )}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
