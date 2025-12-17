// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Book = require('./models/Book');

const app = express();

app.use(cors());
app.use(express.json());

// 🔌 Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bookify')

  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

// 🩺 Health check
app.get('/', (req, res) => {
  res.send('📚 Bookify API is running');
});

// 📚 Get books by GENRE (Fiction, Mathematics, etc.)
app.get('/api/books/genre/:genreName', async (req, res) => {
  try {
    const genre = req.params.genreName;
    const books = await Book.find({ genre });
    const titles = books.map((b) => b.title);
    res.json(titles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 📚 Get books by DEPARTMENT (CSE, ECE, etc.)
app.get('/api/books/department/:deptCode', async (req, res) => {
  try {
    const dept = req.params.deptCode;
    const books = await Book.find({ department: dept });
    const titles = books.map((b) => b.title);
    res.json(titles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
// Get single book by ID
app.get('/api/book/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({error: "Book not found"});
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


// 🚀 Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running at http://localhost:${PORT}`);
});
