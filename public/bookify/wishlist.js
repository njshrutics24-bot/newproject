const API_BASE = "http://localhost:5000";

document.addEventListener("DOMContentLoaded", loadWishlist);

async function loadWishlist() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login first.");
    window.location.href = "index.html";
    return;
  }

  const res = await fetch(`${API_BASE}/api/wishlist`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const books = await res.json();
  if (!res.ok) {
    alert(books.error || "Failed to load wishlist");
    return;
  }

  const listEl = document.getElementById("wishlistList");
  listEl.innerHTML = "";

  if (!books.length) {
    listEl.innerHTML = "<p style='text-align:center;'>No wishlist books yet.</p>";
    return;
  }

  books.forEach((book) => {
    const card = document.createElement("div");
    card.className = "wishlist-card";

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><b>Author:</b> ${book.author}</p>
      <p><b>Genre:</b> ${book.genre}</p>
      <p><b>Department:</b> ${book.department}</p>

      <div style="display:flex; gap:10px; margin-top:10px;">
        <a class="btn" href="bookdetails.html?id=${book._id}">View</a>
        <button class="btn danger" data-id="${book._id}">Remove</button>
      </div>
    `;

    card.querySelector("button").addEventListener("click", () => removeFromWishlist(book._id));
    listEl.appendChild(card);
  });
}

async function removeFromWishlist(bookId) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}/api/wishlist/${bookId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  if (!res.ok) {
    alert(data.error || "Failed to remove");
    return;
  }

  loadWishlist();
}
