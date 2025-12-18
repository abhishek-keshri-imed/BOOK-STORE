import React, { useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: Reset password
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle email submission (generate OTP)
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:1000/api/store/user/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong");
      } else {
        setMessage(data.message || "OTP sent to your email");
        setStep(2); // Move to OTP verification
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!otp.trim()) {
      setError("OTP is required");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:1000/api/store/user/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid OTP");
      } else {
        setMessage(data.message || "OTP verified. Set new password.");
        setStep(3); // Move to reset password
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    }
  };

  // Handle new password submission
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    console.log("OTP RESTEt", +otp);
    setError("");
    setMessage("");

    if (!newPassword.trim()) {
      setError("Password is required");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:1000/api/store/user/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to reset password");
      } else {
        setMessage(data.message || "Password reset successful!");
        setStep(1);
        setEmail("");
        setOtp("");
        setNewPassword("");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}

        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="forgot-password-form">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
            />
            <button type="submit">Send OTP</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="forgot-password-form">
            <label>OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP"
            />
            <button type="submit">Verify OTP</button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePasswordReset} className="forgot-password-form">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
            <button type="submit">Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
