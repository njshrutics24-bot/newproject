const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function seedUsers() {
  await mongoose.connect(process.env.MONGODB_URI);

  // DEV ONLY: clear existing users
  await User.deleteMany({});

  const adminHash = await bcrypt.hash("Admin@123", 10);
  const studentHash = await bcrypt.hash("Student@123", 10);

  await User.insertMany([
    // Admins
    {
      name: "Admin User",
      email: "admin@newproject.com",
      passwordHash: adminHash,
      role: "admin",
    },
    {
      name: "Admin Two",
      email: "admin2@newproject.com",
      passwordHash: adminHash,
      role: "admin",
    },

    // Students
    {
      name: "Student One",
      email: "student1@newproject.com",
      passwordHash: studentHash,
      role: "student",
    },
    {
      name: "Student Two",
      email: "student2@newproject.com",
      passwordHash: studentHash,
      role: "student",
    },
    {
      name: "Student Three",
      email: "student3@newproject.com",
      passwordHash: studentHash,
      role: "student",
    },
    {
      name: "Student Four",
      email: "student4@newproject.com",
      passwordHash: studentHash,
      role: "student",
    }
  ]);

  console.log("✅ Users seeded successfully");
  await mongoose.disconnect();
}

// ✅ this is REQUIRED
seedUsers().catch((err) => {
  console.error(err);
  process.exit(1);
});
