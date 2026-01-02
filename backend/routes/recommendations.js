const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Wishlist = require("../models/Wishlist"); // if you have it
const Book = require("../models/Book");

function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing token" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

router.get("/", auth, async (req, res) => {
  // 1) wishlist books
  const wl = await Wishlist.find({ userId: req.user.userId }).populate("bookId");
  const wishlistBooks = wl.map(x => x.bookId).filter(Boolean);

  const wishlistIds = wishlistBooks.map(b => b._id);

  // 2) top genres/depts from wishlist
  const genreCount = {};
  const deptCount = {};
  for (const b of wishlistBooks) {
    if (b.genre) genreCount[b.genre] = (genreCount[b.genre] || 0) + 1;
    if (b.department) deptCount[b.department] = (deptCount[b.department] || 0) + 1;
  }

  const topGenres = Object.entries(genreCount).sort((a,b)=>b[1]-a[1]).map(x=>x[0]).slice(0,2);
  const topDepts  = Object.entries(deptCount).sort((a,b)=>b[1]-a[1]).map(x=>x[0]).slice(0,2);

  // fallback if wishlist empty: random books
  const query = {
    _id: { $nin: wishlistIds },
    $or: []
  };

  if (topGenres.length) query.$or.push({ genre: { $in: topGenres } });
  if (topDepts.length) query.$or.push({ department: { $in: topDepts } });

  let recs;
  if (query.$or.length === 0) {
    recs = await Book.find().limit(12);
  } else {
    recs = await Book.find(query).limit(12);
  }

  res.json({
    basedOn: { topGenres, topDepts },
    recommendations: recs
  });
});

module.exports = router;
