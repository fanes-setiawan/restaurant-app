import React, { useState, useEffect } from "react";
import Moment from "moment-timezone";

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    getAllUsers();
  }, []);

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

  const handleOpenModal = (isEdit = false, user = null) => {
    setEditMode(isEdit);
    if (isEdit && user) {
      setFormData({
        username: user.username,
        password: "", // Password kosong untuk keamanan
        role: user.role,
        id: user.id,
      });
    } else {
      setFormData({ username: "", password: "", role: "" });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ username: "", password: "", role: "" });
    setEditMode(false);
  };

  const handleSaveUser = async () => {
    const token = localStorage.getItem("token");
    const url = editMode
      ? `http://127.0.0.1:5000/api/users/${formData.id}`
      : "http://127.0.0.1:5000/api/users";
    const method = editMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save user");
      }

      getAllUsers();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving user:", error.message);
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleDeleteSelected = async () => {
    const token = localStorage.getItem("token");
    try {
      await Promise.all(
        selectedUsers.map((userId) =>
          fetch(`http://127.0.0.1:5000/api/users/${userId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
        )
      );
      setUsers((prev) => prev.filter((user) => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error deleting users:", error.message);
    }
  };

  // Fungsi untuk menghapus satu pengguna
  const handleDeleteUser = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user");
      }

      // Menghapus pengguna dari daftar yang ada setelah berhasil dihapus
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const formatDateTime = (dateString) => {
    return Moment(dateString).add(5, "hours").format("YYYY-MM-DD hh:mm A");
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
        <div className="flex items-center gap-2">
          {selectedUsers.length > 1 && (
            <button
              onClick={handleDeleteSelected}
              className="btn bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 flex items-center gap-2"
            >
              <i className="fa fa-trash"></i> Delete Selected
            </button>
          )}
          <button
            onClick={() => handleOpenModal()}
            className="btn bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 flex items-center gap-2"
          >
            <i className="fa fa-plus"></i> Add User
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal modal-open" onClick={handleCloseModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-bold text-lg">
              {editMode ? "Edit User" : "Add New User"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveUser();
              }}
              className="space-y-4"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter username"
                  className="input input-bordered"
                  required
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="input input-bordered"
                  required={!editMode}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  className="select select-bordered"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  required
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
              <div className="modal-action flex justify-between">
                <button type="submit" className="btn btn-success text-white">
                  {editMode ? "Save Changes" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn btn-error text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                className="checkbox"
                onChange={(e) =>
                  e.target.checked
                    ? setSelectedUsers(users.map((user) => user.id))
                    : setSelectedUsers([])
                }
              />
            </th>
            <th>Name</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleSelectUser(user.id)}
                />
              </td>
              <td>
                <div className="font-bold">{user.username}</div>
              </td>
              <td>{user.role}</td>
              <td>{formatDateTime(user.createdAt)}</td>
              <td>{formatDateTime(user.updatedAt)}</td>
              <td>
                <button
                  onClick={() => handleOpenModal(true, user)}
                  className="btn btn-warning"
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDeleteUser(user.id)} // Menambahkan fungsi delete per pengguna
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllUsers;
