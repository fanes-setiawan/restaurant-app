import React from "react";
import { FaBars } from "react-icons/fa"; // Import ikon toggle

const Header = ({ handleLogout, toggleSidebar , isOpen }) => {
  const username = localStorage.getItem("username");
  const image_url = localStorage.getItem("image_url");

  return (
    <div className="navbar bg-gradient-to-r from-yellow-600 to-orange-700 px-6 py-4 shadow-lg text-white">
      <div className="flex-1 flex items-center space-x-4">
      {/* Hanya menampilkan tombol jika sidebar tertutup */}
      {!isOpen && (
        <button
          className="btn btn-square btn-ghost text-white text-2xl" // Menambahkan text-3xl untuk memperbesar ikon
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
      )}
      <span className="text-xl font-semibold tracking-wide">{username ?? "Guest"}</span>
    </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
            aria-label="Profile menu"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg">
              <img
                alt="Profile"
                src={
                  image_url ??
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW_7S1tTbik8e9it64VbcIApAwno9hZeJmSg&s"
                }
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gradient-to-r from-yellow-600 to-orange-700 rounded-lg mt-3 w-52 p-2 shadow-lg"
          >
            <li>
              <a className="justify-between text-white hover:bg-yellow-500 rounded-lg">
                Profile
                <span className="badge badge-primary">New</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
                className="text-white hover:bg-yellow-500 rounded-lg"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
