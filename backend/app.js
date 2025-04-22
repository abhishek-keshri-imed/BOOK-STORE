// Import necessary modules
const express = require("express");  // Express for routing
const dotenv = require("dotenv");    // Import dotenv module to load environment variables
const connectDB = require("./conn/conn");  // Import MongoDB connection logic

// Initialize express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Set the port from environment variable or fallback to 1000 if not set
const PORT = process.env.PORT || 1000;

// Start the server and log successful connection
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
