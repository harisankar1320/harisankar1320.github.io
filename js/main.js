(() => {
  "use strict";

  const username = "harisankar1320";
  const portfolioRepo = `${username}.github.io`;
  const repoGrid = document.getElementById("repo-grid");
  const repoStatus = document.getElementById("repo-status");
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("site-nav");

  document.getElementById("year").textContent = new Date().getFullYear();

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));

  function makeElement(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  function addRepo(repo) {
    // Exclude the portfolio itself and archived repositories from the extra list.
    if (repo.name === portfolioRepo || repo.archived || repo.fork) return;

    const card = makeElement("article", "repo-card");
    const title = makeElement("h4", "", repo.name);
    const description = makeElement("p", "", repo.description || "No description added yet.");
    const meta = makeElement("div", "repo-meta");
    if (repo.language) meta.append(makeElement("span", "", `● ${repo.language}`));
    meta.append(makeElement("span", "", `★ ${repo.stargazers_count || 0}`));
    if (repo.updated_at) {
      const date = new Date(repo.updated_at);
      meta.append(makeElement("span", "", `Updated ${date.toLocaleDateString(undefined, { year: "numeric", month: "short" })}`));
    }
    const link = makeElement("a", "repo-link", "View repository ↗");
    link.href = repo.html_url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    card.append(title, description, meta, link);
    repoGrid.append(card);
  }

  async function loadRepositories() {
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=public`,
        { headers: { Accept: "application/vnd.github+json" } }
      );
      if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
      const repos = await response.json();
      const visibleRepos = repos.filter(repo =>
        repo.name !== portfolioRepo && !repo.archived && !repo.fork
      );
      visibleRepos.forEach(addRepo);
      if (!visibleRepos.length) {
        repoStatus.textContent = "No public repositories to show yet. Visit GitHub to explore the latest work.";
      } else {
        repoStatus.textContent = `Showing ${Math.min(visibleRepos.length, 100)} public repositories · automatically updated from GitHub.`;
      }
    } catch (error) {
      repoStatus.textContent = "The live repository list is temporarily unavailable. You can still browse all public repositories on GitHub.";
      const fallback = makeElement("a", "text-link", "Browse all repositories ↗");
      fallback.href = `https://github.com/${username}?tab=repositories`;
      fallback.target = "_blank";
      fallback.rel = "noopener noreferrer";
      repoStatus.append(" ", fallback);
    }
  }

  loadRepositories();
})();
