const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); 
const connectDB = require("./conn/conn");
const userRoutes = require("./routes/user");
const bookRoutes = require("./routes/book");
const favouritesRoutes = require("./routes/favourites");
const cartRoutes = require("./routes/cart");
const orderRoutes=require("./routes/order")



const app = express();

// Load environment variables
dotenv.config();


// Enable CORS for all domains (you can restrict this to specific domains later)
app.use(cors());


// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use("/api/store", userRoutes);
app.use("/api/store", bookRoutes);
app.use("/api/store", favouritesRoutes);
app.use("/api/store", cartRoutes);
app.use("/api/store", orderRoutes);

// Set port
const PORT = process.env.PORT || 1000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
