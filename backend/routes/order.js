const mongoose = require("mongoose");

// Importing necessary modules
const router = require("express").Router();
const Book = require("../models/books");
const User = require("../models/user");
const Order = require("../models/order");
const authenticateToken = require("./userAuth");

router.post("/place-cart-order",authenticateToken,async (req, res) => {
    try {
        const userId = req.user.userId;

        const user = await User.findById(userId);
        if (!user)
            return res.status(404).json({ message: "User not found" });

        if (!Array.isArray(user.cart) || user.cart.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const books = await Book.find({ _id: { $in: user.cart } });

        // Check and filter out books with no stock
        const unavailableBooks = books.filter((book) => book.stock <= 0);
        if (unavailableBooks.length > 0) {
            return res.status(400).json({
                message: "Some books are out of stock",
                unavailable: unavailableBooks.map((book) => book.title),
            });
        }

        // Place orders and reduce stock
        const orders = [];
        for (const book of books) {
            const order = await Order.create({
                user: user._id,
                book: book._id,
                status: "Order Placed",
            });

            // Decrement stock
            book.stock -= 1;
            await book.save();

            orders.push(order);
        }

        // Clear cart
        user.cart = [];
        await user.save();

        res.status(201).json({
            message: "Orders placed successfully",
            orders,
        });
    } catch (error) {
        console.error("Order placement failed:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
);

// Place an order for a single book (directly, not from cart)
router.post("/place-order/:bookId", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { bookId } = req.params;

        // Validate book ID format
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ message: "Invalid book ID format" });
        }

        // Check if the book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Check if book is in stock
        if (book.stock <= 0) {
            return res.status(400).json({ message: "Book is out of stock" });
        }

        // Reduce stock by 1
        book.stock -= 1;
        await book.save();

        // Create a new order
        const order = new Order({
            user: userId,
            book: bookId,
        });

        await order.save();

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get all orders for a user
router.get("/get-orders", authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId;
  
      const orders = await Order.find({ user: userId })
        .populate("book")
        .sort({ createdAt: -1 });
  
      res.status(200).json({ orders });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });


  // Admin route to update order status
router.put("/update-order-status/:orderId", authenticateToken, async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const userId = req.user.userId;
  
      // Check if the user is admin
      const user = await User.findById(userId);
      if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
  
      // Check if order exists
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      // Update order status
      order.status = status;
      await order.save();
  
      res.status(200).json({ message: "Order status updated", order });
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


module.exports = router;
