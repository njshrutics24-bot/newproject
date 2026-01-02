const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Wishlist = require("../models/Wishlist");
const Book = require("../models/Book");

function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// GET wishlist -> return BOOKS
router.get("/", auth, async (req, res) => {
  const items = await Wishlist.find({ userId: req.user.userId }).populate("bookId");
  const books = items.map(i => i.bookId).filter(Boolean);
  res.json(books);
});

// POST add -> expects { bookId }
router.post("/", auth, async (req, res) => {
  const { bookId } = req.body;
  if (!bookId) return res.status(400).json({ error: "bookId is required" });

  const bookExists = await Book.findById(bookId);
  if (!bookExists) return res.status(404).json({ error: "Book not found" });

  const exists = await Wishlist.findOne({ userId: req.user.userId, bookId });
  if (exists) return res.json({ message: "Already in wishlist" });

  await Wishlist.create({ userId: req.user.userId, bookId });
  res.json({ message: "Added to wishlist" });
});

// DELETE remove
router.delete("/:bookId", auth, async (req, res) => {
  await Wishlist.deleteOne({ userId: req.user.userId, bookId: req.params.bookId });
  res.json({ message: "Removed" });
});

module.exports = router;
