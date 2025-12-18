const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    avatar: {
      type: String,
      default:
        "http://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png",
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    favourites: [
      {
        type: mongoose.Types.ObjectId,
        ref: "books",
      },
    ],
    cart: [
      {
        type: mongoose.Types.ObjectId,
        ref: "books",
      },
    ],
    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "order",
      },
    ],

    // OTP fields for forgot password
    forgotPasswordOTP: { type: String, default: null },
    forgotPasswordOTPExpiry: { type: Date, default: null },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
