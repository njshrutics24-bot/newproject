const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// connect DB
mongoose
  .connect("mongodb://127.0.0.1:27017/elibrary")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// health
app.get("/", (req, res) => {
  res.send("📚 Bookify API is running");
});

// routes
app.use("/api/books", require("./routes/books"));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running at http://localhost:${PORT}`);
});
