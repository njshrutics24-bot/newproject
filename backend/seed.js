// seed.js
const mongoose = require('mongoose');
const Book = require('./models/Book');

const MONGO_URL = 'mongodb://127.0.0.1:27017/bookify';

const BOOKS_BY_DEPT = {
  CSE: [
    "Introduction to Algorithms",
    "Operating Systems",
    "Data Structures in C",
    "Computer Networks"
  ],
  AIML: [
    "Hands-On Machine Learning",
    "Deep Learning with Python",
    "Artificial Intelligence: A Modern Approach"
  ],
  ISE: [
    "Information Security Principles",
    "Cryptography & Network Security",
    "Cyber Laws & Ethics"
  ],
  ECE: [
    "Digital Electronics",
    "Microprocessors & Microcontrollers",
    "Electronic Circuits"
  ],
  EEE: [
    "Power Systems",
    "Control Systems",
    "Electrical Machines"
  ],
  ME: [
    "Thermodynamics",
    "Strength of Materials",
    "Fluid Mechanics"
  ],
  CE: [
    "Structural Engineering",
    "Surveying & Levelling",
    "Construction Materials",
    "Computer networks"
  ]
};

const BOOKS_BY_GENRE = {
  Fiction: [
    "The Alchemist",
    "Pride and Prejudice",
    "Oliver Twist",
    "To Kill a Mockingbird"
  ],
  Mathematics: [
    "Higher Engineering Mathematics",
    "Calculus Made Easy"
  ],
  Chemistry: [
    "Organic Chemistry",
    "Fundamentals of Chemistry"
  ],
  Newspaper: [
    "The Hindu",
    "Scientific American",
    "Nature Magazine"
  ],
  DSA: [
    "Cracking the Coding Interview",
    "Data Structures & Algorithms in Python"
  ]
};

async function seed() {
  await mongoose.connect(MONGO_URL);


  console.log('Connected. Clearing old data…');
  await Book.deleteMany({});

  const docs = [];

  // Dept books
  for (const [dept, titles] of Object.entries(BOOKS_BY_DEPT)) {
    titles.forEach(title => {
      docs.push({
  title: "Atomic Habits",
  author: "James Clear",
  genre: "Self-help",
  department: null,
  frontCover: "https://m.media-amazon.com/images/I/81F90H7hnML.jpg",
  backCover: "https://5.imimg.com/data5/SELLER/Default/2022/10/HK/FN/FC/162021231/atomic-habits-500x500.jpg",
  rating: 4.8,
  reviews: [
    "Life-changing book. Helped me build better habits.",
    "Simple, practical, and powerful.",
    "A must-read for anyone seeking growth."
  ]
});

    });
  }

  // Genre books
  for (const [genre, titles] of Object.entries(BOOKS_BY_GENRE)) {
    titles.forEach(title => {
      docs.push({ title, genre, department: null });
    });
  }

  await Book.insertMany(docs);
  console.log(`✅ Inserted ${docs.length} books.`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
