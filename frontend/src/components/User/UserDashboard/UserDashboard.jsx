import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./UserDashboard.css";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/authSlice.js";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch user info
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No auth token found. Please login.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:1000/api/store/user/information", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user info");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    toast.success("You have been logged out.");
    localStorage.clear(); // Clear token, user info etc.
    dispatch(logout()); // Clear Redux state
    navigate("/"); // Redirect SPA style, no reload
  };

  if (loading)
    return <div className="dashboard-grid">Loading user info...</div>;
  if (error) return <div className="dashboard-grid">Error: {error}</div>;

  return (
    <div className="dashboard-grid">
      <button
        className="sidebar-toggle-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? "×" : "☰"}
      </button>

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="user-profile">
          <img
            src="https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-Transparent-Clip-Art-PNG.png"
            alt="User Logo"
            className="user-logo"
          />
          <h4>{user?.username || "No Username"}</h4>
        </div>
        <ul>
          {isSmallScreen && (
            <li>
              <NavLink
                to="/user-dashboard"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/user-dashboard/profile"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user-dashboard/favorites"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Favorites
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user-dashboard/all-books"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              All Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user-dashboard/order-history"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Order History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user-dashboard/manage-address"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Manage Address
            </NavLink>
          </li>

          <li className="logout" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </aside>

      <main
        className="content"
        onClick={() => sidebarOpen && setSidebarOpen(false)}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
