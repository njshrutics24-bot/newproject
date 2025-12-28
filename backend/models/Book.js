const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    pages: {
      type: Number,
      required: true,
      min: 1
    },
    genre: {
      type: String,
      required: true
    },
    language: {
      type: String,
      default: "English"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
