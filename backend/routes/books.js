const express = require("express");
const Book = require("../models/Book");

const router = express.Router();

// GET all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET books by genre
router.get("/genre/:genreName", async (req, res) => {
  try {
    const genre = req.params.genreName;
    const books = await Book.find({ genre });
    res.json(books); // return full docs (better than only titles)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET books by department (only if your schema actually has department)
router.get("/department/:deptCode", async (req, res) => {
  try {
    const dept = req.params.deptCode;
    const books = await Book.find({ department: dept });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single book by id
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
