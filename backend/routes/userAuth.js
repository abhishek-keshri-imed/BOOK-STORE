// Import necessary modules
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; // Load secret from environment

// Middleware to authenticate the user using JWT
const userAuth = (req, res, next) => {
  // Get token from the request headers (Authorization: Bearer <token>)
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing or invalid" });
  }

  const token = authHeader.split(" ")[1]; // Extract token

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach decoded user info to request object
    req.user = {
      userId: decoded.userId,
      name: decoded.name,
      role: decoded.role
    };

    // Move to the next middleware/controller
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = userAuth;
