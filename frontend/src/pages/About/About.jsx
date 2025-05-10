import React from "react";
import "./About.css";  // Ensure you have corresponding styles for this

const About = () => {
  return (
    <div className="about-container">
      <section className="about-introduction">
        <h1>Welcome to BookHeaven</h1>
        <p>
          At BookHeaven, we believe in bringing the best of literature to your fingertips. Our platform is dedicated to offering a wide range of books across different genres and categories. Whether you're a casual reader or a book enthusiast, there's something for everyone here.
        </p>
      </section>

      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          Our mission is simple – to provide a seamless experience for book lovers to explore, buy, and discuss books. We aim to foster a community of passionate readers and connect them with the literature they love. Through our platform, we strive to make reading more accessible and enjoyable for everyone.
        </p>
      </section>

      <section className="about-team">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img
              src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg"
              alt="Team Member 1"
              className="team-img"
            />
            <h3>John Doe</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img
              src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
              alt="Team Member 2"
              className="team-img"
            />
            <h3>Jane Smith</h3>
            <p>Chief Operating Officer</p>
          </div>
        </div>
      </section>

      <section className="about-contact">
        <h2>Get in Touch</h2>
        <p>
          We would love to hear from you! If you have any questions or suggestions, feel free to reach out to us.
        </p>
        <a href="mailto:support@bookheaven.com" className="contact-link">
          Contact Us
        </a>
      </section>
    </div>
  );
};

export default About;
