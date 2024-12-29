import React, { useState, useEffect } from "react";

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:5000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsers(data.users);
    };

    getAllUsers();
  }, []);

  return (
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Name</th>
        <th>Role</th>
        <th>Created At</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {
        users.map((user) => (
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={user.image_url ??"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW_7S1tTbik8e9it64VbcIApAwno9hZeJmSg&s"}
                      alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{user.username}</div>
                  <div className="text-sm opacity-50">{user.name}</div>
                </div>
              </div>
            </td>
            <td>
              {user.role}
            </td>
            <td>{user.createdAt}</td>
            <th>
              <button className="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
        ))
      }  
    </tbody>
  </table>
</div>
    
  );
};

export default GetAllUsers;
