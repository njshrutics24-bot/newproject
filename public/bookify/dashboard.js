// ===============================
// Bookify — Student Dashboard JS
// ===============================

// Dynamic year
document.getElementById("year").textContent = new Date().getFullYear();

// Backend base URL
const API_BASE = "http://localhost:5000";

// Collapsible behavior
document.querySelectorAll(".collapsible").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetSel = btn.getAttribute("data-target");
    const panel = document.querySelector(targetSel);
    const caret = btn.querySelector(".caret");
    if (!panel) return;

    const isOpen = panel.classList.contains("open");
    panel.classList.toggle("open", !isOpen);
    caret.textContent = !isOpen ? "▾" : "▸";
  });
});

// Elements
const deptBooksEl = document.getElementById("deptBooks");
const genreBooksEl = document.getElementById("genreBooks");
const searchInputEl = document.getElementById("searchInput");
const searchBtnEl = document.getElementById("searchBtn");

// Robust fetch helper (timeout + JSON + error handling)
async function fetchJSON(url, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-store",
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status} ${res.statusText} - ${text}`);
    }

    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

function showBackendAlert() {
  alert("Backend not reachable. Make sure backend is running on http://localhost:5000");
}

// Render list of books into UL
// Expects: books = [{_id, title, ...}, ...]
function renderList(ulEl, books, { loading = false } = {}) {
  ulEl.innerHTML = "";

  if (loading) {
    const li = document.createElement("li");
    li.className = "book-empty";
    li.textContent = "Loading books...";
    ulEl.appendChild(li);
    return;
  }

  if (!books || !books.length) {
    const li = document.createElement("li");
    li.className = "book-empty";
    li.textContent = "No books available.";
    ulEl.appendChild(li);
    return;
  }

  books.forEach((book) => {
    // Safety: support old backend that returns titles only
    if (typeof book === "string") {
      const li = document.createElement("li");
      li.className = "book-item";
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = book;
      li.appendChild(a);
      ulEl.appendChild(li);
      return;
    }

    const li = document.createElement("li");
    li.className = "book-item";

    const a = document.createElement("a");
    a.href = `bookdetails.html?id=${book._id}`;
    a.textContent = book.title || "Untitled";

    li.appendChild(a);
    ulEl.appendChild(li);
  });
}

// Open a panel (useful for search results)
function openPanel(panelId, toggleSelector) {
  const panel = document.getElementById(panelId);
  const toggleBtn = document.querySelector(toggleSelector);
  if (!panel || !toggleBtn) return;

  panel.classList.add("open");
  const caret = toggleBtn.querySelector(".caret");
  if (caret) caret.textContent = "▾";
}

// Department selection
document.querySelectorAll("#deptPanel .opt").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const dept = btn.getAttribute("data-dept");
    renderList(deptBooksEl, [], { loading: true });

    const url = `${API_BASE}/api/books/department/${encodeURIComponent(dept)}`;

    try {
      const books = await fetchJSON(url);
      renderList(deptBooksEl, books);
    } catch (err) {
      console.error("Dept fetch failed:", err);
      renderList(deptBooksEl, []);
      showBackendAlert();
    }
  });
});

// Genre selection
document.querySelectorAll("#genrePanel .opt").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const genre = btn.getAttribute("data-genre");
    renderList(genreBooksEl, [], { loading: true });

    const url = `${API_BASE}/api/books/genre/${encodeURIComponent(genre)}`;

    try {
      const books = await fetchJSON(url);
      renderList(genreBooksEl, books);
    } catch (err) {
      console.error("Genre fetch failed:", err);
      renderList(genreBooksEl, []);
      showBackendAlert();
    }
  });
});

// Search button -> show clickable matches -> redirect to bookdetails page via link
searchBtnEl.addEventListener("click", async () => {
  const q = (searchInputEl.value || "").trim().toLowerCase();
  if (!q) {
    alert("Type a book title to search.");
    return;
  }

  try {
    const books = await fetchJSON(`${API_BASE}/api/books`);
    if (!Array.isArray(books)) {
      alert("Unexpected response from backend.");
      return;
    }

    const matches = books.filter((b) => (b.title || "").toLowerCase().includes(q));

    // Show results in Genre list area (reusing UI)
    openPanel("genrePanel", '[data-target="#genrePanel"]');
    renderList(genreBooksEl, matches);

    if (!matches.length) alert(`No books found for "${q}".`);
  } catch (err) {
    console.error("Search failed:", err);
    showBackendAlert();
  }
});

// Search on Enter key
searchInputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtnEl.click();
  }
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", (e) => {
  e.preventDefault();
  const confirmed = confirm("Are you sure you want to logout?");
  if (confirmed) window.location.href = "index.html";
});
