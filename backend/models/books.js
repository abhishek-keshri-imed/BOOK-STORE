const mongoose = require("mongoose");

// Define the schema for a Book
const bookSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create and export the Book model
const Book = mongoose.model("books", bookSchema);
module.exports = Book;
