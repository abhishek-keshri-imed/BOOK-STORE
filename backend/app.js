const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./conn/conn");
const userRoutes = require("./routes/user");

const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use("/api/store", userRoutes);

// Set port
const PORT = process.env.PORT || 1000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
