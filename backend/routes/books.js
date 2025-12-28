const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// GET all books
router.get("/", async (req, res) => {
  const books = await Book.find().sort({ createdAt: -1 });
  res.json(books);
});

// GET books by genre
router.get("/genre/:genreName", async (req, res) => {
  const genre = req.params.genreName;
  const books = await Book.find({ genre });
  res.json(books.map(b => b.title));
});

// GET books by department
router.get("/department/:deptCode", async (req, res) => {
  const dept = req.params.deptCode;
  const books = await Book.find({ department: dept });
  res.json(books.map(b => b.title));
});

// Search by title
router.get("/search", async (req, res) => {
  const q = (req.query.q || "").trim();
  if (!q) return res.json([]);

  const books = await Book.find({
    title: { $regex: q, $options: "i" },
  }).limit(20);

  res.json(books.map(b => b.title));
});

module.exports = router;
