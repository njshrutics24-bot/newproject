const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = "change_this_secret"; // later move to .env

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email & password required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, role: role || "student" });

    res.json({ message: "User registered", userId: user._id });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "2h" });
    res.json({ token, role: user.role, email: user.email });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
