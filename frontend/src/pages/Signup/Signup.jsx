import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const [backendError, setBackendError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Regex patterns
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const usernamePattern = /^[a-zA-Z][a-zA-Z0-9_-]{3,}$/;
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validateField = (fieldName, value) => {
    let error = "";

    switch (fieldName) {
      case "username":
        if (!value.trim()) {
          error = "Username is required.";
        } else if (!usernamePattern.test(value)) {
          error =
            "Username must start with a letter and be at least 4 characters long. Allowed characters: letters, numbers, underscore (_), and hyphen (-).";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required.";
        } else if (!emailPattern.test(value)) {
          error = "Email is invalid.";
        }
        break;

      case "password":
        if (!value.trim()) {
          error = "Password is required.";
        } else if (!passwordPattern.test(value)) {
          error =
            "Password must have at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.";
        }
        break;

      case "confirmPassword":
        if (!value.trim()) {
          error = "Please confirm your password.";
        } else if (value !== formData.password) {
          error = "Passwords do not match.";
        }
        break;

      case "address":
        if (!value.trim()) {
          error = "Address is required.";
        } else if (value.length < 10) {
          error = "Address must be at least 10 characters.";
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    Object.keys(formData).forEach((field) =>
      validateField(field, formData[field])
    );

    // Check if any errors
    const hasErrors = Object.values(errors).some((err) => err !== "");
    if (hasErrors) return;

    try {
      const response = await fetch("http://localhost:1000/api/store/user/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          address: formData.address,
        }),
      });

      if (!response.ok) {
        // Backend responded with error
        const errorData = await response.json();
        setBackendError(errorData.message || "An error occurred");
        setSuccessMessage("");
      } else {
        // Signup successful
        setSuccessMessage("Signup successful! Redirecting to login...");
        setBackendError("");
        // Redirect to login after short delay to show message
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      // Network or unexpected error
      console.error("Signup failed:", error); // Log the error for debugging
      setBackendError("Network error. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="main">
      <div className="container">
        <div className="formContainer">
          <h2 className="title">Signup Form</h2>

          {/* Show backend error message */}
          {backendError && (
            <p style={{ color: "red", marginBottom: "10px" }}>{backendError}</p>
          )}

          {/* Show success message */}
          {successMessage && (
            <p style={{ color: "green", marginBottom: "10px" }}>
              {successMessage}
            </p>
          )}

          <form className="form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="input"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="input"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p style={{ color: "red" }}>{errors.confirmPassword}</p>
            )}

            <label htmlFor="address">Address</label>
            <textarea
              name="address"
              className="textarea"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}

            <button type="submit" className="button">
              Submit
            </button>
          </form>
        </div>

        <div className="imageContainer">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/people-login-account-illustration-download-in-svg-png-gif-file-formats--password-user-education-and-learning-pack-school-illustrations-6855980.png"
            alt="Signup Visual"
            className="image"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
