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
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    console.log("✅ Connected DB:", mongoose.connection.name);
    console.log("✅ Connected URI:", process.env.MONGODB_URI);
  })
  .catch((err) => console.error(err));

// Health
app.get("/", (req, res) => res.send("📚 Bookify API is running"));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend running http://localhost:${PORT}`));
app.use("/api/wishlist", require("./routes/wishlist"));
app.use("/api/recommendations", require("./routes/recommendations"));

