const axios = require("axios");
require("dotenv").config();

const MAILTRAP_API_KEY = process.env.MAILTRAP_API_KEY;
const SENDER_EMAIL = process.env.MAILTRAP_SENDER_EMAIL;
const SENDER_NAME = process.env.MAILTRAP_SENDER_NAME;

const sendOTPEmail = async (to, otp) => {
  try {
    await axios.post(
      "https://send.api.mailtrap.io/api/send",
      {
        from: {
          email: SENDER_EMAIL,
          name: SENDER_NAME,
        },
        to: [{ email: to }],
        subject: "Your OTP for Password Reset",
        text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
      },
      {
        headers: {
          "Api-Token": MAILTRAP_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Email error:", error.response?.data || error.message);
    throw new Error("Email sending failed");
  }
};

module.exports = { sendOTPEmail };
