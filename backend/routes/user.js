// Importing necessary modules
const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config(); // Load environment variables

// Secret key for JWT from environment variables
const JWT_SECRET = process.env.JWT_SECRET; // Using the secret key from .env

// Regular expressions (patterns) for validation
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email should match a valid email format
const usernamePattern = /^[a-zA-Z0-9_-]{4,}$/; // Username must be alphanumeric and at least 4 characters
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Password must have at least one lowercase, one uppercase, one number, and one special character

// Sign-up route
router.post("/user/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body; // Destructure the request body

    // Validate email format
    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: "Invalid email format" }); // Error if email doesn't match the pattern
    }

    // Validate username (must be alphanumeric and at least 4 characters)
    if (!usernamePattern.test(username)) {
      return res.status(400).json({
        message: "Username must be alphanumeric and at least 4 characters",
      });
    }

    // Validate password (must include at least one lowercase, one uppercase, one number, and one special character)
    if (!passwordPattern.test(password)) {
      return res.status(400).json({
        message:
          "Password must include at least one uppercase, one lowercase, one number, and one special character",
      });
    }

    // Check if the username already exists in the database
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if the email already exists in the database
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user (use `password: hashedPassword`, not `hashedPassword` key)
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      address,
    });

    // Save the new user to the database
    await newUser.save();

    // Send a successful response with the new user's information
    res.status(201).json({ message: "Signup successful", user: newUser });
  } catch (error) {
    // Handle any errors that occur during the sign-up process
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Sign-in route
router.post("/user/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body; // Destructure the request body

    // Find the user based on username
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password using bcrypt
    bcrypt.compare(password, existingUser.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: "Error comparing passwords" });
      }

      if (isMatch) {
        // Generate a JWT token with user information
        const token = jwt.sign(
          {
            userId: existingUser._id,
            name: existingUser.username,
            role: existingUser.role,
          },
          JWT_SECRET, // Using the secret from the environment
          { expiresIn: "1h" } // The token will expire in 1 hour
        );

        // Send a successful response with the token, userId, and role of the logged-in user
        return res.status(200).json({
          message: "SignIn successful",
          token,
          userId: existingUser._id, // Send the logged-in user's userId
          role: existingUser.role, // Send the logged-in user's role
        });
      } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    // Handle any errors that occur during the sign-in process
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router; // Export the router for use in the main app
