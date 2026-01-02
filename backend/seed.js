require("dotenv").config(); // ✅ always at top

const mongoose = require("mongoose");
const Book = require("./models/Book");
const books = require("./seed/booksData");

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  await Book.deleteMany({});
  await Book.insertMany(books);

  console.log(`✅ Books seeded successfully: ${books.length}`);
  await mongoose.disconnect();
}

seed().catch(console.error);
