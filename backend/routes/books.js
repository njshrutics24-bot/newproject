const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// GET all books
router.get("/", async (req, res) => {
  const books = await Book.find().sort({ createdAt: -1 });
  res.json(books);
});

// GET books by department
router.get("/department/:deptCode", async (req, res) => {
  const dept = (req.params.deptCode || "").trim().toUpperCase();
  const books = await Book.find({ department: dept }).sort({ createdAt: -1 });
  res.json(books);
});


// GET books by genre (across ALL departments)
router.get("/genre/:genreName", async (req, res) => {
  const genre = (req.params.genreName || "").trim();

  const books = await Book.find({
    genre: { $regex: `^${genre}$`, $options: "i" }
  }).sort({ createdAt: -1 });

  res.json(books);
});

// Search by title
router.get("/search", async (req, res) => {
  const q = (req.query.q || "").trim();
  if (!q) return res.json([]);

  const books = await Book.find({
    title: { $regex: q, $options: "i" },
  }).limit(20);
res.json(books);


});

module.exports = router;
router.get("/", async (req, res) => {
  const books = await Book.find().sort({ createdAt: -1 });
  res.json(books);
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch {
    res.status(400).json({ error: "Invalid book id" });
  }
});
