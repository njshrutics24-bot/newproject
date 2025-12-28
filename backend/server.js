const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/books", require("./routes/books"));
app.use("/api/users", require("./routes/users")); // (we will create below)

// DB
mongoose
  .connect("mongodb://127.0.0.1:27017/bookify")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Health
app.get("/", (req, res) => res.send("📚 Bookify API is running"));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend running http://localhost:${PORT}`));
