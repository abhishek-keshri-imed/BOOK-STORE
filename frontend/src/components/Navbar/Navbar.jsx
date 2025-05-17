import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // 🛠️ Build navItems freshly every render to avoid duplicates
  const baseItems = [
    { label: "HOME", path: "/", id: "nav-home" },
    { label: "ABOUT", path: "/about", id: "nav-about" },
    { label: "All BOOKS", path: "/all-books", id: "nav-books" },
  ];

  const authItems = isAuthenticated
    ? [
        { label: "CART", path: "/cart", id: "nav-cart" },
        { label: "PROFILE", path: "/profile", id: "nav-profile" },
      ]
    : [];

  const navItems = [...baseItems, ...authItems];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar p-3" id="main-navbar">
      {/* Logo */}
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

      {/* Hamburger icon */}
      <div className="hamburger" onClick={toggleMenu}>
        <FaBars size={24} />
      </div>

      {/* Navigation links */}
      <div className={`nav-links ${isOpen ? "open" : ""}`} id="navbar-links">
        {navItems.map(({ label, path, id }) => (
          <NavLink
            to={path}
            id={id}
            key={id}
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            {label}
          </NavLink>
        ))}

        {/* Only show login/signup when not authenticated */}
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
