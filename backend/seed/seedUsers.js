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
    // Admins (USN still required by schema, so give a dummy admin USN)
    {
      name: "Admin User",
      usn: "ADMIN001",
      email: "admin@newproject.com",
      passwordHash: adminHash,
      role: "admin",
    },
    {
      name: "Admin Two",
      usn: "ADMIN002",
      email: "admin2@newproject.com",
      passwordHash: adminHash,
      role: "admin",
    },

    // Students
    {
      name: "Student One",
      usn: "1RV21CS001",
      email: "student1@newproject.com",
      passwordHash: studentHash,
      role: "student",
    },
    {
      name: "Student seven",
      usn: "1RV21CS007",
      email: "surabhi@gmail.com",
      passwordHash: studentHash,
      role: "student",
    },
    {
      name: "Student Two",
      usn: "1RV21CS002",
      email: "student2@newproject.com",
      passwordHash: studentHash,
      role: "student",
    },
    {
      name: "Student Three",
      usn: "1RV21CS003",
      email: "student3@newproject.com",
      passwordHash: studentHash,
      role: "student",
    },
    {
      name: "Rishitha",
      usn: "1RV21CS004",
      email: "rishitha@gmail.com",
      passwordHash: studentHash,
      role: "student",
    },
    {
      name: "Student Four",
      usn: "1RV21CS005",
      email: "student4@newproject.com",
      passwordHash: studentHash,
      role: "student",
    },
  ]);

  console.log("✅ Users seeded successfully");
  await mongoose.disconnect();
}

// REQUIRED
seedUsers().catch((err) => {
  console.error(err);
  process.exit(1);
});
