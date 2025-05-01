const mongoose = require("mongoose");
const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/books");
const authenticateToken = require("./userAuth");

// Add a book to favourites
router.post("/add-book-to-favoutite/:bookId",authenticateToken,async (req, res) => {
    try {
      const userId = req.user.userId;
      const { bookId } = req.params;

      // Validate bookId format
      if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).json({ message: "Invalid book ID format" });
      }

      // Check if user exists
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      // Check if book exists
      const book = await Book.findById(bookId);
      if (!book) return res.status(404).json({ message: "Book not found" });

      // Check if book is already in favourites
      if (await User.findOne({ _id: userId, favourites: bookId })) {
        return res.status(400).json({ message: "Book already in favourites" });
      }

      user.favourites.push(bookId);
      await user.save();
      res.status(200).json({ message: "Book added to favourites" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Remove a book from favourites
router.delete("/remove-book-from-favoutite/:bookId",authenticateToken,async (req, res) => {
    try {
      const userId = req.user.userId;
      const { bookId } = req.params;

      // Ensure user exists
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      // Ensure favourites is an array
      if (!Array.isArray(user.favourites)) {
        user.favourites = [];
      }

      // Check if the book is in favourites
      const index = user.favourites.findIndex((favId) => favId.toString() === bookId);
      if (index === -1) {
        return res.status(404).json({ message: "Book not found in favourites" });
      }

      // Remove the book from favourites
      user.favourites.splice(index, 1);
      await user.save();
      res.status(200).json({ message: "Book removed from favourites successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Get all favourite books for a user
router.get("/get-all-favourites", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch user and populate favourite books
    const user = await User.findById(userId).populate("favourites");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ favourites: user.favourites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch favourite books" });
  }
});

module.exports = router;
