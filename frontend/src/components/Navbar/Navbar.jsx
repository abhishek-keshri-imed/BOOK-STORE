import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    // Main navigation bar container
    <nav className="navbar p-3" id="main-navbar">

      {/* Brand/Logo link to homepage */}
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
        <span className="ms-2">BookHeaven</span>
      </Link>

      {/* Navigation links */}
      <div className="nav-links" id="navbar-links">
        <Link to="/Home" className="nav-link" id="nav-books">
          Home
        </Link>

        <Link to="/About" className="nav-link" id="nav-contact">
          About
        </Link>

        <Link to="/AllBooks" className="nav-link" id="nav-contact">
          All Books
        </Link>


      </div>

    </nav>
  );
};

export default Navbar;
