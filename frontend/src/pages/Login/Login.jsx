import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  // Realtime field validation
  const validateField = (fieldName, value) => {
    let error = "";

    switch (fieldName) {
      case "username":
        if (!value.trim()) {
          error = "Username is required.";
        }
        break;

      case "password":
        if (!value.trim()) {
          error = "Password is required.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  // Update field and validate on change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields on submit
    Object.keys(formData).forEach((field) =>
      validateField(field, formData[field])
    );

    const hasErrors = Object.values(errors).some((err) => err !== "");
    if (!hasErrors) {
      console.log("Form submitted", formData);
      // Perform API call here
    }
  };

  return (
    <div className="main-login">
      <div className="container">
        <div className="formContainer mt-5 pt-5">
          <h2 className="title">Sign Form</h2>
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="input"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username ? (
              <p style={{ color: "red" }}>{errors.username}</p>
            ) : null}

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password ? (
              <p style={{ color: "red" }}>{errors.password}</p>
            ) : null}
            <button type="submit" className="button">
              Submit
            </button>
            {/* Signup Link */}
            <p className="signup-link">
              Don't have an account? <Link to="/signup">Signup</Link>
            </p>
          </form>
        </div>

        <div className="imageContainer">
          <img
            src="https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4582.jpg?semt=ais_hybrid&w=740"
            alt="Signup Visual"
            className="image"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
