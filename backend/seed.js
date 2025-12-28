const mongoose = require("mongoose");
const Book = require("./models/Book");
const books = require("./seed/booksData");

async function seed() {
  await mongoose.connect("mongodb://127.0.0.1:27017/bookify");

  await Book.deleteMany({});
  await Book.insertMany(books);

  console.log(`✅ Books seeded successfully: ${books.length}`);
  await mongoose.disconnect();
}

seed().catch(console.error);
