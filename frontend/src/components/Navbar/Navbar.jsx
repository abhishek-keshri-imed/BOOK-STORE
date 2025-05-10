import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";  
import "./Navbar.css";

const navItems = [
  { label: "HOME", path: "", id: "nav-home" },
  { label: "ABOUT", path: "/about", id: "nav-about" },
  { label: "All BOOKS", path: "/all-books", id: "nav-books" },
  { label: "CART", path: "/Cart", id: "nav-cart" },
  { label: "PROFILE", path: "/Profile", id: "nav-profile" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar p-3" id="main-navbar">
      {/* Logo */}
      <Link to="/" className="navbar-brand d-flex align-items-center" id="navbar-logo">
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
            className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
          >
            {label}
          </NavLink>
        ))}


        <Link to="/login" className="nav-link login-button" onClick={closeMenu}>
          LOGIN
        </Link>
        <Link to="/signup" className="signup-button" onClick={closeMenu}>
          SIGNUP
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
