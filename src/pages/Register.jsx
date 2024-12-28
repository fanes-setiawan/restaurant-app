import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });
      const data = await response.json();
      if (response.ok) {
        setUsername("");
        setPassword("");
        setRole("admin");
        alert("Akun berhasil dibuat, silakan login.");
        navigate("/");
      } else {
        setError(data.msg || "Terjadi kesalahan saat mendaftar.");
      }
    } catch (error) {
      setError("Tidak dapat mendaftar. Silakan coba lagi nanti.");
    }
  };

  return (
    <div className="hero min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleRegister}>
          <h1 className="text-5xl font-bold text-center">Register</h1>
          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Masukkan username Anda"
              className="input input-bordered"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Masukkan password Anda"
              className="input input-bordered"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Role</span>
            </label>
            <select
              className="select select-bordered"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          <div className="form-control mt-10">
            <button className="btn btn-primary transition duration-300 ease-in-out hover:bg-blue-600" type="submit">
              Register
            </button>
          </div>

          <div className="form-control mt-6">
            <label className="label">
              <Link to="/" className="label-text-alt link link-hover">
                Sudah punya akun? Login
              </Link>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
