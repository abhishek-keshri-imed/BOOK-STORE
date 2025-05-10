import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./Navbar.css";

const navItems = [
  { label: "Home", path: "/Home", id: "nav-home" },
  { label: "About Us", path: "/About", id: "nav-about" },
  { label: "All Books", path: "/AllBooks", id: "nav-books" },
  { label: "Cart", path: "/Cart", id: "nav-cart" },
  { label: "Profile", path: "/Profile", id: "nav-profile" },
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
        <span className="ms-2">BookHeaven</span>
      </Link>

      {/* Hamburger icon */}
      <div className="hamburger" onClick={toggleMenu}>
        <FaBars size={24} />
      </div>

      {/* Navigation links */}
      <div className={`nav-links ${isOpen ? "open" : ""}`} id="navbar-links">
        {navItems.map(({ label, path, id }) => (
          <Link
            to={path}
            className="nav-link"
            id={id}
            key={id}
            onClick={closeMenu}
          >
            {label}
          </Link>
        ))}

        <Link to="/login" className="nav-link login-button" onClick={closeMenu}>
          LogIn
        </Link>
        <Link to="/signup" className="signup-button" onClick={closeMenu}>
          SignUp
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
