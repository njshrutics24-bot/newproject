require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bookify API is running");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Bookify API is running",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "not connected",
  });
});

app.use("/api/books", require("./routes/books"));
app.use("/api/users", require("./routes/users"));
app.use("/api/wishlist", require("./routes/wishlist"));
app.use("/api/recommendations", require("./routes/recommendations"));

async function startServer() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is missing. Add it inside backend/.env");
    process.exit(1);
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is missing. Add it inside backend/.env");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);

    console.log("MongoDB connected:", mongoose.connection.name);

    app.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start Bookify API:", error.message);
    process.exit(1);
  }
}

startServer();