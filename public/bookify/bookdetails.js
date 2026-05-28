const API_BASE = "http://localhost:5000";

document.addEventListener("DOMContentLoaded", () => {
  loadBookDetails();
  wireWishlistButton();
});

function getBookIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function fetchJSON(url, options = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
    return data;
  } finally {
    clearTimeout(timer);
  }
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value ?? "—";
}

function setImg(id, url) {
  const el = document.getElementById(id);
  if (el) el.src = url;
}

async function loadBookDetails() {
  const bookId = getBookIdFromUrl();
  if (!bookId) {
    alert("Missing book id in URL.");
    return;
  }

  try {
    // IMPORTANT: backend must support GET /api/books/:id
    const book = await fetchJSON(`${API_BASE}/api/books/${encodeURIComponent(bookId)}`);

    setText("bookTitle", `📘 ${book.title || "Untitled"}`);
    setText("bookAuthor", book.author);
    setText("bookGenre", book.genre);
    setText("bookDepartment", book.department);
    setText("bookLanguage", book.language);
    setText("bookPages", book.pages);
    setText("bookPrice", book.price);

    // If you don't store images in DB, keep fallback images
    // You can add these fields later in MongoDB: frontCoverUrl, backCoverUrl
    if (book.frontCoverUrl) setImg("frontCover", book.frontCoverUrl);
    else setImg("frontCover", "https://via.placeholder.com/250x350?text=Front+Cover");

    if (book.backCoverUrl) setImg("backCover", book.backCoverUrl);
    else setImg("backCover", "https://via.placeholder.com/250x350?text=Back+Cover");

    // store globally for wishlist button
    window.__BOOK_ID__ = book._id;
  } catch (err) {
    console.error("Book details load failed:", err);
    alert("Failed to load book details. Check backend route GET /api/books/:id");
  }
}

function wireWishlistButton() {
  const btn = document.getElementById("addWishlistBtn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      window.location.href = "index.html";
      return;
    }

    const bookId = window.__BOOK_ID__ || getBookIdFromUrl();
    if (!bookId) return alert("Missing book id.");

    try {
      const data = await fetchJSON(`${API_BASE}/api/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookId }),
      });

      alert(data.message || "Added to wishlist!");
    } catch (err) {
      console.error("Add wishlist failed:", err);
      alert(err.message || "Failed to add to wishlist");
    }
  });
}
