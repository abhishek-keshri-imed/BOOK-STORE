import React, { useState } from "react";
import "./Signup.css";

const Signup = () => {
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

  // Regex patterns
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const usernamePattern = /^[a-zA-Z][a-zA-Z0-9_-]{3,}$/;
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Realtime field validation
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
    <div className="main">
      <div className="container">
        <div className="formContainer">
          <h2 className="title">Signup Form</h2>
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

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email ? (
              <p style={{ color: "red" }}>{errors.email}</p>
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

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="input"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword ? (
              <p style={{ color: "red" }}>{errors.confirmPassword}</p>
            ) : null}

            <label htmlFor="address">Address</label>
            <textarea
              name="address"
              className="textarea"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address ? (
              <p style={{ color: "red" }}>{errors.address}</p>
            ) : null}

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
