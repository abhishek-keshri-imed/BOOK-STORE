const mongoose = require("mongoose");
const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/books");
const authenticateToken = require("./userAuth");

// Add a book to Cart
router.post("/add-book-to-cart/:bookId",authenticateToken,async (req, res) => {
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

      // Check if book is already in cart
      if (await User.findOne({ _id: userId, cart: bookId })) {
        return res.status(400).json({ message: "Book already in Cart" });
      }

      user.cart.push(bookId);
      await user.save();
      res.status(200).json({ message: "Book added to Cart" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Remove a book from Cart
router.delete("/remove-book-from-cart/:bookId",authenticateToken,async (req, res) => {
    try {
      const userId = req.user.userId;
      const { bookId } = req.params;

      // Ensure user exists
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      // Ensure cart is an array
      if (!Array.isArray(user.cart)) {
        user.cart = [];
      }

      // Check if the book is in favourites
      const index = user.cart.findIndex((cartId) => cartId.toString() === bookId);
      if (index === -1) {
        return res.status(404).json({ message: "Book not found in Cart" });
      }

      // Remove the book from favourites
      user.cart.splice(index, 1);
      await user.save();
      res.status(200).json({ message: "Book removed from cart successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Get all Cart books for a user
router.get("/get-all-cart", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Fetch user and populate cart books
    const user = await User.findById(userId).populate("cart");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ carts: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch carts books" });
  }
});

module.exports = router;
