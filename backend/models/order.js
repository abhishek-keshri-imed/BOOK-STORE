const mongoose = require("mongoose");

// Define the schema for an Order
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user", // Reference to the User model
    },
    book: {
      type: mongoose.Types.ObjectId,
      ref: "books", // Reference to the Books model
    },
    status: {
      type: String,
      default: "Order Placed",
      enum: ["Order Placed", "Out for delivery", "Delivered", "Cancelled"], // Order status options
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create and export the Order model
const Order = mongoose.model("order", orderSchema);
module.exports = Order;
