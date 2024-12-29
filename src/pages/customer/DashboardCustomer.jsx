import React from "react";

const DashboardCustomer = ({ handleLogout }) => {
  return (
    <div>
      <h1>Welcome Customer</h1>
      <button onClick={handleLogout} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
};

export default DashboardCustomer;
