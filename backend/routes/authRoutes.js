const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Shipper = require("../models/Shipper");
const Carrier = require("../models/Carrier");
const jwt = require("jsonwebtoken");

// User Registration
router.post(
  "/register",
  [
    // Validation
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("role").isIn(["shipper", "carrier"]).withMessage("Invalid role"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password, role } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role,
      });

      await user.save();

      // Create Shipper/Carrier profile
      if (role === "shipper") {
        const shipper = new Shipper({ user: user._id });
        await shipper.save();
      } else {
        const carrier = new Carrier({ user: user._id });
        await carrier.save();
      }
      
      router.get("/test", (req, res) => {
        res.send("Auth routes are working!");
      });

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      res.status(201).json({ token, user: { id: user._id, name, email, role } });
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

module.exports = router;