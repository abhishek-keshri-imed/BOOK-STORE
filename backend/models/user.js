const mongoose = require("mongoose");

// Define the schema for a User
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // corrected 'require' to 'required'
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
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
        ref: "books", // Reference to the Book model
      },
    ],
    cart: [
      {
        type: mongoose.Types.ObjectId,
        ref: "books", // Reference to the Book model
      },
    ],
    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "order", // Reference to the Order model
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the User model
const User = mongoose.model("user", userSchema);
module.exports = User;
