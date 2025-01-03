import React, { useEffect, useState } from 'react';
import { getAllMenus } from '../../services/menus';
import { getAllUsers } from '../../services/users';
import { getAllOrders } from '../../services/orders';

const Dashboard = () => {
  const [menus, setMenus] = useState([]);
  const [account, setAccount] = useState([]);
  const [users, setUsers] = useState(0);
  const [orders, setOrders] = useState([]);
  const [admin, setAdmin] = useState(0);

  useEffect(() => {
    fetchMenus();
    fetchUsers();
    fetchOrders();
  }, []);

  const fetchMenus = async () => {
    try {
      const menuData = await getAllMenus();
      setMenus(menuData); 
    } catch (error) {
      console.error('Error fetching menus:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const userData = await getAllUsers();
      setAccount(userData);
      if (userData.users != null) {
        console.log("TIDAK NULLLL");
        console.log(userData.users);
        
        let userCount = 0;
        let adminCount = 0;
        for (let data of userData.users) {
          console.log(data.role);
          
          if (data.role === "admin") {
            adminCount++;
          } else {
            userCount++;
          }
        }
        setUsers(userCount);
        setAdmin(adminCount);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const fetchOrders = async () => {
    try {
      const orderData = await getAllOrders();
      setOrders(orderData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-figure text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </div>
        <div className="stat-title">Total Menu</div>
        <div className="stat-value text-primary">{menus.count}</div> {/* Display dynamic menu count */}
        <div className="stat-desc">you have {menus.count} menus</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <div className="stat-title">Total Pembelian</div>
        <div className="stat-value text-secondary">{orders.length}</div> {/* Display dynamic total purchases */}
        <div className="stat-desc">21% more than last month</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <div className="avatar online">
            <div className="w-16 rounded-full">
              <img src="https://media.istockphoto.com/id/1156423972/id/vektor/creative-chef-hat-spoon-fork-vektor-simbol-desain-ilustrasi.jpg?s=612x612&w=0&k=20&c=W7Ad-LHxfw6akZ2lsFcNy1l_xXgriErLfI95Z97MTng=" alt="Avatar" />
            </div>
          </div>
        </div>
        <div className="stat-value">{account.count}</div> {/* Display dynamic account count */}
        <div className="stat-title">Account</div>
        <div className="stat-desc text-secondary">{users} Users dan {admin} Admin</div>
      </div>
    </div>
  );
};

export default Dashboard;
