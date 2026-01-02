require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// ----------------------
// Auth middleware
// ----------------------
function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { userId, role }
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// ----------------------
// Register (student only)
// ----------------------
router.post("/register", async (req, res) => {
  try {
    const { name, usn, email, password } = req.body;

    if (!name || !usn || !email || !password) {
      return res.status(400).json({ error: "Name, USN, Email & password required" });
    }

    // email duplicate
    const emailExists = await User.findOne({ email });
    if (emailExists) return res.status(409).json({ error: "Email already registered" });

    // usn duplicate
    const usnExists = await User.findOne({ usn });
    if (usnExists) return res.status(409).json({ error: "USN already registered" });

    const passwordHash = await bcrypt.hash(password, 10);

    // IMPORTANT: force student role (security)
    const user = await User.create({
      name,
      usn,
      email,
      passwordHash,
      role: "student"
    });

    return res.json({ message: "User registered", userId: user._id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

// ----------------------
// Login
// ----------------------
router.post("/login", async (req, res) => {
  try {
    console.log("LOGIN HIT", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email & password required" });
    }

    const user = await User.findOne({ email }); // ✅ user declared FIRST
    console.log("USER FOUND?", !!user);

    if (!user || !user.passwordHash) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    console.log("PASSWORD MATCH?", ok);

    if (!ok) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET missing in .env");
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.json({
      token,
      userId: user._id,
      role: user.role,
      name: user.name,
      usn: user.usn,
      email: user.email
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// ----------------------
// Current logged-in user
// ----------------------
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("name usn email role");
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
