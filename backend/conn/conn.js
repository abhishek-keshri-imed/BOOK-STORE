// conn/conn.js
const mongoose = require("mongoose");

// MongoDB connection function
const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from the .env file, no need for deprecated options
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure if connection fails
  }
};

module.exports = connectDB;
