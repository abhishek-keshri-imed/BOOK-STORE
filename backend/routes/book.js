const mongoose = require("mongoose");

// Importing necessary modules
const router = require("express").Router();
const Book = require("../models/books");
const authenticateToken = require("./userAuth");

router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    const { url, title, author, price, desc, language, stock } = req.body;
    const userId = req.user.userId; // Get the userId from the authenticated token

    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    // Create and save the book
    const newBook = new Book({
      url,
      title,
      author,
      price,
      desc,
      language,
      stock,
      addedBy: userId, // 👈 Add the userId for traceability
    });
    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/update-book/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params; // Get the book ID from the URL parameter
    const { url, title, author, price, desc, language, stock } = req.body; // Get updated book data from the request body

    // Check if user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    // Try to find the book by its ID
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Update the book information using the || operator (only update if the field is provided)
    book.url = url || book.url; // Only update if the field is provided
    book.title = title || book.title;
    book.author = author || book.author;
    book.price = price || book.price;
    book.desc = desc || book.desc;
    book.language = language || book.language;
    book.stock = stock !== undefined ? stock : book.stock; // Handle `0` as a valid value

    // Save the updated book
    const updatedBook = await book.save();

    return res
      .status(200)
      .json({ message: "Book updated successfully", updatedBook });
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET /get-all-books?page=1&limit=6
router.get("/get-all-books", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 6; // Default to 6 books per page
    const skip = (page - 1) * limit;
    const totalBooks = await Book.countDocuments();

    const books = await Book.find()
      .sort({ createdAt: -1 }) // show latest first
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      books,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: page
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch books" });
  }
});

// GET /books/:id – Get details of a specific book by ID
router.get("/get-book/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch book details" });
  }
});

// GET /books/recent – Get the last 4 recently added books
router.get("/books/recent", async (req, res) => {
  try {
    const recentBooks = await Book.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(6); // Limit to 4 results

    res.status(200).json(recentBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch recent books" });
  }
});

// DELETE /book/delete/:id – Delete a book (admin only)
router.delete("/book/delete/:id", authenticateToken, async (req, res) => {
  try {
    // Only admin can delete
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete book" });
  }
});

module.exports = router; // Export the router for use in the main app
