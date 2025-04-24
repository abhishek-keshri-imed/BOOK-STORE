// Import necessary modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Get the JWT_SECRET from the environment
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to authenticate the user using JWT
const userAuth = (req, res, next) => {
  // Get token from the request headers (Authorization: Bearer <token>)
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is present and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization token missing or invalid" });
  }

  // Extract token from the header (after "Bearer ")
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using the secret from the environment
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = {
      userId: decoded.userId,
      name: decoded.name,
      role: decoded.role,
    };

    // Move to the next middleware/controller
    next();
  } catch (error) {
    console.error(error);
    // If the token is invalid or expired, return a 401 error
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = userAuth; // Export the middleware
