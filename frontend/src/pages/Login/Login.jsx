import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [backendError, setBackendError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateField = (fieldName, value) => {
    let error = "";
    switch (fieldName) {
      case "username":
        if (!value.trim()) error = "Username is required.";
        break;
      case "password":
        if (!value.trim()) error = "Password is required.";
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
    setBackendError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required.`;
      }
    });

    setErrors(newErrors);

    // If errors exist, don't proceed
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await fetch(
        "http://localhost:1000/api/store/user/sign-in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      console.log("Login Response:", data); // Debug: Check full response

      if (!response.ok) {
        setBackendError(data.message || "Login failed.");
        setSuccessMessage("");
        return;
      }

      // ✅ Login success - Save info in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId || "");
      localStorage.setItem("role", data.role || "");

      console.log("Stored Token:", localStorage.getItem("token"));
      // Success: dispatch loginSuccess with user info from backend
      dispatch(
        loginSuccess({
          userId: data.userId,
          name: formData.username,
          role: data.role,
          token: data.token,
          // you can add userData/adminData if applicable
        })
      );

      setSuccessMessage("Login successful!");
      setBackendError("");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Login Error:", error);
      setBackendError("Network error. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="main-login">
      <div className="container">
        <div className="formContainer mt-5 pt-5">
          <h2 className="title">Login Form</h2>
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="input"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p style={{ color: "red" }}>{errors.username}</p>
            )}

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}

            {backendError && (
              <p style={{ color: "red", fontWeight: "bold" }}>{backendError}</p>
            )}
            {successMessage && (
              <p style={{ color: "green", fontWeight: "bold" }}>
                {successMessage}
              </p>
            )}

            <button type="submit" className="button">
              Submit
            </button>

            <p className="signup-link">
              Don't have an account? <Link to="/signup">Signup</Link>
            </p>
          </form>
        </div>

        <div className="imageContainer">
          <img
            src="https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4582.jpg?semt=ais_hybrid&w=740"
            alt="Login Visual"
            className="image"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
