import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-left">
        <h1>Fuel Your Brain with Every Chapter.</h1>
        <p>
          At BookHeaven, we believe every book holds the power to change your
          perspective, expand your knowledge, and inspire your soul. Our curated
          collection is designed to help you discover your next favorite read,
          connect with stories that matter, and build a library that reflects
          your passion.
        </p>
        <Link to="/all-books" className="transparent-button">
          Explore Books
        </Link>
      </div>
      <div className="hero-right">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/book-shopping-store-illustration-download-in-svg-png-gif-file-formats--bookstore-building-shop-stores-pack-e-commerce-illustrations-4481099.png?f=webp"
          alt="Books"
          className="hero-image"
        />
      </div>
    </div>
  );
};

export default Hero;
