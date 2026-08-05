/* ==========================================
   TECH RWT BLOGS - DYNAMIC APP ENGINE
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  loadArticles();
});

async function loadArticles() {
  try {
    const response = await fetch("/assets/data/articles.json");
    if (!response.ok) throw new Error("Failed to load articles data.");
    
    const articles = await response.json();
    
    // Render Featured Articles
    const featuredGrid = document.getElementById("featuredArticlesGrid");
    if (featuredGrid) {
      const featured = articles.filter(item => item.featured);
      featuredGrid.innerHTML = featured.map(article => createCardHTML(article)).join("");
    }

    // Render Latest Articles
    const latestGrid = document.getElementById("latestArticlesGrid");
    if (latestGrid) {
      latestGrid.innerHTML = articles.map(article => createCardHTML(article)).join("");
    }

  } catch (error) {
    console.error("Error loading articles:", error);
  }
}

function createCardHTML(article) {
  return `
    <article class="article-card">
      <div class="card-image-wrapper">
        <a href="/article.html?slug=${article.permalink}">
          <img src="${article.image}" alt="${article.title}" loading="lazy" onerror="this.src='/assets/images/logo-banner.webp'">
        </a>
        <span class="card-category">${article.category}</span>
      </div>
      <div class="card-content">
        <div class="card-meta">
          <span>${article.date}</span>
          <span>•</span>
          <span>${article.author}</span>
        </div>
        <h3 class="card-title">
          <a href="/article.html?slug=${article.permalink}">${article.title}</a>
        </h3>
        <p class="card-desc">${article.searchDescription}</p>
        <a href="/article.html?slug=${article.permalink}" class="read-more-link">Read Article &rarr;</a>
      </div>
    </article>
  `;
}