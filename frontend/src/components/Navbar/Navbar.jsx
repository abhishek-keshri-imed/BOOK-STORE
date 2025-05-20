import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaBars, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole =
    useSelector((state) => state.auth.role) || localStorage.getItem("role");

  const handleLogout = () => {
    toast.success("You have been logged out.");
    localStorage.clear();
    dispatch(logout());
    navigate("/");
  };

  let homePath = "/";
  if (isAuthenticated && userRole === "admin") {
    homePath = "/admin-dashboard";
  } else if (isAuthenticated && userRole === "user") {
    homePath = "/user-dashboard";
  }

  const roleBasedItems = () => {
    if (!isAuthenticated) {
      return [
        { label: "HOME", path: homePath, id: "nav-home" },
        { label: "ABOUT", path: "/about", id: "nav-about" },
        { label: "ALL BOOKS", path: "/all-books", id: "nav-books" },
      ];
    }

    if (userRole === "user") {
      return [
        { label: "HOME", path: homePath, id: "nav-home" },
        { label: "ALL BOOKS", path: "/all-books", id: "nav-books" },
        {
          label: "LOGOUT",
          action: handleLogout,
          id: "nav-logout",
          icon: <FaSignOutAlt />,
        },
      ];
    }

    if (userRole === "admin") {
      return [
        { label: "HOME", path: homePath, id: "nav-home" },
        { label: "ALL BOOKS", path: "/all-books", id: "nav-books" },
        { label: "MANAGE BOOKS", path: "/admin/books", id: "nav-manage-books" },
        {
          label: "LOGOUT",
          action: handleLogout,
          id: "nav-logout",
          icon: <FaSignOutAlt />,
        },
      ];
    }

    return [];
  };

  const navItems = roleBasedItems();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar p-3" id="main-navbar">
      <Link
        to="/"
        className="navbar-brand d-flex align-items-center"
        id="navbar-logo"
      >
        <img
          src="https://pngfile.net/public/uploads/preview/book-stack-transparent-image-png-4381744311095xatjglpsxn.png"
          alt="BookShop Logo"
          className="navbar-logo-img"
        />
        <span className="ms-2">BOOKHEAVEN</span>
      </Link>

      <div className="hamburger" onClick={toggleMenu}>
        <FaBars size={24} />
      </div>

      <div className={`nav-links ${isOpen ? "open" : ""}`} id="navbar-links">
        {navItems.map(({ label, path, id, icon, action }) =>
          action ? (
            <button
              key={id}
              id={id}
              className="nav-link logout-button"
              onClick={action}
            >
              {icon && <span className="nav-icon">{icon}</span>} {label}
            </button>
          ) : (
            <NavLink
              to={path}
              id={id}
              key={id}
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              {icon && <span className="nav-icon">{icon}</span>} {label}
            </NavLink>
          )
        )}

        {!isAuthenticated && (
          <>
            <NavLink to="/login" className="nav-link login-button">
              Login
            </NavLink>
            <Link to="/signup" className="signup-button">
              SIGNUP
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
