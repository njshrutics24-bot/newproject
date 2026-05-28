const express = require("express");
const Book = require("../models/Book");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

router.get("/department/:deptCode", async (req, res) => {
  try {
    const books = await Book.find({ department: req.params.deptCode });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch department books" });
  }
});

router.get("/genre/:genreName", async (req, res) => {
  try {
    const books = await Book.find({ genre: req.params.genreName });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch genre books" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const q = (req.query.q || "").trim();

    if (!q) {
      return res.json([]);
    }

    const books = await Book.find({
      title: { $regex: q, $options: "i" },
    }).limit(20);

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to search books" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(400).json({ error: "Invalid book id" });
  }
});

module.exports = router;