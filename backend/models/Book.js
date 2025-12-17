const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, default: "Unknown" },
  genre: { type: String, required: true },
  department: { type: String, default: null },

  frontCover: { type: String, default: "" },
  backCover: { type: String, default: "" },

  rating: { type: Number, default: 4.5 },

  reviews: { type: [String], default: [] },

  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Book', bookSchema);
