const API_BASE = "http://localhost:5000";

function getBookId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function mustGet(id) {
  const el = document.getElementById(id);
  if (!el) console.error(`Missing element with id="${id}" in bookdetails.html`);
  return el;
}

async function loadBookDetails() {
  const id = getBookId();
  console.log("BookDetails: URL id =", id);

  if (!id) {
    alert("Book ID missing. Open from dashboard by clicking a book.");
    return;
  }

  const url = `${API_BASE}/api/books/${encodeURIComponent(id)}`;
  console.log("BookDetails: fetching", url);

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("BookDetails: fetch failed", res.status, text);
    alert("Failed to load book details. Check console (F12).");
    return;
  }

  const book = await res.json();
  console.log("BookDetails: book =", book);

  // Fill fields
  const titleEl = mustGet("bookTitle");
  const authorEl = mustGet("bookAuthor");
  const genreEl = mustGet("bookGenre");
  const deptEl = mustGet("bookDepartment");
  const langEl = mustGet("bookLanguage");
  const pagesEl = mustGet("bookPages");
  const priceEl = mustGet("bookPrice");
  const frontCoverEl = mustGet("frontCover");
  const backCoverEl = mustGet("backCover");

  if (titleEl) titleEl.textContent = `📘 ${book.title || "Untitled"}`;
  if (authorEl) authorEl.textContent = book.author || "—";
  if (genreEl) genreEl.textContent = book.genre || "—";
  if (deptEl) deptEl.textContent = book.department || "—";
  if (langEl) langEl.textContent = book.language || "—";
  if (pagesEl) pagesEl.textContent = String(book.pages ?? "—");
  if (priceEl) priceEl.textContent = String(book.price ?? "—");

  // Covers (only if you have these fields in DB; otherwise fallback)
  if (frontCoverEl) frontCoverEl.src = book.coverFront || "https://via.placeholder.com/260x360?text=Cover";
  if (backCoverEl) backCoverEl.src = book.coverBack || "https://via.placeholder.com/260x360?text=Back+Cover";
}

document.addEventListener("DOMContentLoaded", () => {
  loadBookDetails().catch((e) => {
    console.error("BookDetails: unexpected error", e);
    alert("Unexpected error loading book details. Check console (F12).");
  });
});
