const API_BASE = "http://localhost:5000";

document.addEventListener("DOMContentLoaded", loadRecommendations);

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

async function loadRecommendations() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login first.");
    window.location.href = "index.html";
    return;
  }

  // 1) get recommendations
  const recData = await fetchJSON(`${API_BASE}/api/recommendations`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const books = recData.recommendations || [];

  // 2) OPTIONAL: get wishlist to disable already added
  let wishlistIds = new Set();
  try {
    const wl = await fetchJSON(`${API_BASE}/api/wishlist`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    wishlistIds = new Set((wl || []).map(b => String(b._id)));
  } catch {
    // ignore if wishlist endpoint fails
  }

  const grid = document.getElementById("recGrid");
  if (!grid) {
    alert("Missing #recGrid in recommended.html");
    return;
  }

  grid.innerHTML = "";

  if (!books.length) {
    grid.innerHTML = `<p style="text-align:center;">No recommendations yet.</p>`;
    return;
  }

  books.forEach((b) => {
    const card = document.createElement("div");
    card.className = "rec-card";

    const already = wishlistIds.has(String(b._id));

    card.innerHTML = `
      <h3>${escapeHtml(b.title)}</h3>
      <p><b>Author:</b> ${escapeHtml(b.author || "—")}</p>
      <p><b>Genre:</b> ${escapeHtml(b.genre || "—")}</p>
      <p><b>Department:</b> ${escapeHtml(b.department || "—")}</p>

      <div class="rec-actions">
        <a class="btn" href="bookdetails.html?id=${encodeURIComponent(b._id)}">View</a>
        <button class="btn primary" ${already ? "disabled" : ""} data-id="${b._id}">
          ${already ? "Added" : "Add to Wishlist"}
        </button>
      </div>
    `;

    const addBtn = card.querySelector("button");
    addBtn.addEventListener("click", async () => {
      if (addBtn.disabled) return;
      await addToWishlist(b._id, addBtn);
    });

    grid.appendChild(card);
  });
}

async function addToWishlist(bookId, buttonEl) {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login first.");
    window.location.href = "index.html";
    return;
  }

  buttonEl.disabled = true;
  const oldText = buttonEl.textContent;
  buttonEl.textContent = "Adding...";

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
    buttonEl.textContent = "Added";
  } catch (err) {
    console.error(err);
    alert(err.message || "Failed to add to wishlist");
    buttonEl.disabled = false;
    buttonEl.textContent = oldText;
  }
}

// small helper to avoid HTML injection
function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
