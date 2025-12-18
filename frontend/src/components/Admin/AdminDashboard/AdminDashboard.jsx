import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/authSlice.js"; // Adjust path as needed
import { toast } from "react-toastify";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Listen to window resize for responsive sidebar
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch admin user info from API
  useEffect(() => {
    const token = sessionStorage.getItem("token");
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
        if (!res.ok) throw new Error("Failed to fetch admin info");
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
    sessionStorage.clear();
    dispatch(logout());
    navigate("/login");
  };

  if (loading)
    return <div className="dashboard-grid">Loading admin info...</div>;
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
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Admin Logo"
            className="user-logo"
          />
          <h4>{user?.username || "Admin"}</h4>
          <small style={{ color: "#666" }}>{user?.role || "admin"}</small>
        </div>

        <ul>
          {isSmallScreen && (
            <li>
              <NavLink
                to="/admin-dashboard"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                🏠 Home
              </NavLink>
            </li>
          )}

          <li className="menu-heading">📚 Book Management</li>
          <li>
            <NavLink
              to="/admin-dashboard/add-books"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              ➕ Add Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-dashboard/edit-books"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              ✏️ Edit Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-dashboard/delete-books"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              🗑️ Delete Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-dashboard/book-stock"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              📦 Book Stock
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-dashboard/manage-users"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              👥 Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-dashboard/manage-orders"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              📋 Manage Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-dashboard/analytics"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              📈 Analytics
            </NavLink>
          </li>

          <li className="logout" onClick={handleLogout}>
            🚪 Logout
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

export default AdminDashboard;
