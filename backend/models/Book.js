const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    price: { type: Number, default: 0 },
    pages: { type: Number, default: 0 },

    genre: { type: String, required: true, trim: true },          // Fiction, DSA, etc.
    department: { type: String, required: true, trim: true },     // CSE, ECE, etc.

    language: { type: String, default: "English" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
