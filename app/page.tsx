export default function Home() {
  return (
    <main className="landing-page">
      <nav className="navbar">
        <div className="logo">Bookify</div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#architecture">Architecture</a>
          <a href="#api">API</a>
          <a href="/bookify/index.html" className="nav-button">
            Launch App
          </a>
        </div>
      </nav>

      <section className="hero">
        <p className="eyebrow">Full-stack book discovery platform</p>

        <h1>
          Student book discovery with wishlist, recommendations, and progress
          tracking.
        </h1>

        <p className="hero-text">
          Bookify helps students search books by department and genre, save
          favourites, track reading progress, and receive personalized
          recommendations based on their interests.
        </p>

        <div className="hero-actions">
          <a href="/bookify/index.html" className="primary-button">
            Launch Bookify
          </a>

          <a href="/bookify/register.html" className="secondary-button">
            Create Student Account
          </a>

          <a href="/bookify/admindashboard.html" className="secondary-button">
            Admin Dashboard
          </a>
        </div>

        <div className="project-card">
          <div>
            <span className="status-dot"></span>
            <strong>Resume-ready project</strong>
          </div>

          <div className="stats-grid">
            <div>
              <h3>2</h3>
              <p>User roles</p>
            </div>
            <div>
              <h3>6+</h3>
              <p>Core pages</p>
            </div>
            <div>
              <h3>12+</h3>
              <p>Backend routes</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="section">
        <p className="eyebrow">Features</p>
        <h2>What the system does</h2>

        <div className="card-grid">
          <article>
            <h3>Student authentication</h3>
            <p>
              Students can register, log in securely, and access a personalized
              dashboard using JWT-based authentication.
            </p>
          </article>

          <article>
            <h3>Admin dashboard</h3>
            <p>
              Admin users can manage book records and maintain the catalogue
              used by students.
            </p>
          </article>

          <article>
            <h3>Book discovery</h3>
            <p>
              Students can browse, search, and filter books by department,
              genre, and title.
            </p>
          </article>

          <article>
            <h3>Wishlist and recommendations</h3>
            <p>
              Wishlist activity is used to recommend books based on preferred
              genres and departments.
            </p>
          </article>

          <article>
            <h3>Student tracker</h3>
            <p>
              A dedicated tracker page helps students monitor their reading
              journey and engagement.
            </p>
          </article>

          <article>
            <h3>MongoDB backend</h3>
            <p>
              Express.js APIs store users, books, wishlists, and recommendation
              data in MongoDB.
            </p>
          </article>
        </div>
      </section>

      <section id="architecture" className="section">
        <p className="eyebrow">Architecture</p>
        <h2>System design</h2>

        <div className="architecture-box">
          <div>HTML/CSS/JS Frontend</div>
          <span>→</span>
          <div>Express.js API</div>
          <span>→</span>
          <div>MongoDB Atlas</div>
        </div>

        <p className="section-text">
          The project uses a Next.js landing page as the portfolio entry point,
          while the original Bookify application screens are served as static
          frontend pages. The backend exposes REST APIs for users, books,
          wishlists, and recommendations.
        </p>
      </section>

      <section id="api" className="section">
        <p className="eyebrow">API</p>
        <h2>Core backend routes</h2>

        <div className="api-list">
          <p>
            <strong>POST</strong> /api/users/register
          </p>
          <p>
            <strong>POST</strong> /api/users/login
          </p>
          <p>
            <strong>GET</strong> /api/books
          </p>
          <p>
            <strong>GET</strong> /api/books/search?q=
          </p>
          <p>
            <strong>GET</strong> /api/wishlist
          </p>
          <p>
            <strong>GET</strong> /api/recommendations
          </p>
        </div>
      </section>
    </main>
  );
}