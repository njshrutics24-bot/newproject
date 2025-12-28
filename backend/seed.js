const mongoose = require("mongoose");
const Book = require("./models/Book");

async function seed() {
  await mongoose.connect("mongodb://127.0.0.1:27017/bookify");

  // Example data: add department for each book
  const books = [
    { title: "The Alchemist", author: "Paulo Coelho", price: 299, pages: 208, genre: "Fiction", department: "CSE", language: "English" },
    { title: "Wings of Fire", author: "A. P. J. Abdul Kalam", price: 350, pages: 180, genre: "Autobiography", department: "ECE", language: "English" },
    { title: "Harry Potter and the Philosopher’s Stone", author: "J. K. Rowling", price: 499, pages: 223, genre: "Fantasy", department: "ISE", language: "English" },
    { title: "Atomic Habits", author: "James Clear", price: 450, pages: 320, genre: "Self-help", department: "AIML", language: "English" },
    { title: "Rich Dad Poor Dad", author: "Robert T. Kiyosaki", price: 399, pages: 336, genre: "Finance", department: "ME", language: "English" },
    { title: "Pride and Prejudice", author: "Jane Austen", price: 250, pages: 279, genre: "Romance", department: "CE", language: "English" },
    { title: "Think Like a Monk", author: "Jay Shetty", price: 499, pages: 352, genre: "Spiritual", department: "EEE", language: "English" },
    { title: "The Diary of a Young Girl", author: "Anne Frank", price: 299, pages: 283, genre: "Biography", department: "CSE", language: "English" },
    { title: "Ikigai", author: "Héctor García & Francesc Miralles", price: 350, pages: 208, genre: "Philosophy", department: "AIML", language: "English" },
    { title: "The Hobbit", author: "J. R. R. Tolkien", price: 450, pages: 310, genre: "Adventure", department: "ISE", language: "English" },
  ];

  await Book.deleteMany({});
  await Book.insertMany(books);

  console.log("✅ Books seeded successfully");
  await mongoose.disconnect();
}

seed().catch(console.error);
