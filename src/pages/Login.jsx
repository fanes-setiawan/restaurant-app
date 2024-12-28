import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = ({ setToken  , setRole}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok && data.access_token) {
        const { access_token, role } = data;
        setToken(access_token);
        setRole(role);
        localStorage.setItem("token", access_token);
        localStorage.setItem("role", role);

        setError(""); // Reset error
        if (role === "admin") {
          navigate("/admin-dashboard");
        } else if (role === "customer") {
          navigate("/customer-dashboard");
        }
      } else {
        setError(data.msg || "Username atau password salah.");
      }
    } catch (error) {
      setError("Tidak dapat login. Silakan coba lagi nanti.");
    }
  };

  return (
    <div className="hero min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleLogin}>
          <h1 className="text-5xl font-bold text-center">Login</h1>
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-control mt-6">
            <label className="label">
              <Link to="/register" className="label-text-alt link link-hover">
                Belum punya akun? Daftar
              </Link>
            </label>
          </div>

          <div className="form-control mt-10">
            <button className="btn btn-primary transition duration-300 ease-in-out hover:bg-blue-600" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
