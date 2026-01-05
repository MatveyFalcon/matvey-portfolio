// Main logic: theme, menu, projects rendering, modal + lightbox, reveal animations

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  initTheme();
  initMenu();
  initReveal();
  initProjects();
  initFilters();
  initModal();
  initLightbox();
});

/* =========================
   THEME
   ========================= */
function initTheme() {
  const html = document.documentElement;
  const toggle = qs("#themeToggle");
  const icon = qs("#themeIcon");

  // Load saved theme
  const saved = localStorage.getItem("theme");
  if (saved) html.setAttribute("data-theme", saved);

  updateIcon();

  toggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateIcon();
  });

  function updateIcon() {
    const theme = html.getAttribute("data-theme");
    icon.textContent = theme === "dark" ? "◐" : "◑";
  }
}

/* =========================
   MENU (MOBILE)
   ========================= */
function initMenu() {
  const burger = qs("#burger");
  const mobileMenu = qs("#mobileMenu");

  burger.addEventListener("click", () => {
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    lockScroll(true);
  });

  // close on click links
  qsa(".mobile-menu__link").forEach(link => {
    link.addEventListener("click", () => closeMenu());
  });

  // close on esc
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // close by clicking outside
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) closeMenu();
  });

  function closeMenu() {
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    lockScroll(false);
  }
}

/* =========================
   REVEAL ANIMATION
   ========================= */
function initReveal() {
  const items = qsa(".reveal");

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(el => io.observe(el));
}

/* =========================
   PROJECTS RENDER
   ========================= */
let currentFilter = "all";

function initProjects() {
  renderProjects(PROJECTS);
}

function renderProjects(projects) {
  const grid = qs("#projectsGrid");
  grid.innerHTML = "";

  projects.forEach(p => {
    const card = document.createElement("article");
    card.className = "project reveal";
    card.dataset.category = p.category;
    card.dataset.id = p.id;

    card.innerHTML = `
      <div class="project__img">
        <img src="${p.cover}" alt="${p.title}" loading="lazy" />
      </div>
      <div class="project__body">
        <div class="project__type">${p.type}</div>
        <h3 class="project__title">${p.title}</h3>
        <p class="project__desc">${p.desc}</p>
      </div>
    `;

    card.addEventListener("click", () => openModal(p.id));
    grid.appendChild(card);
  });

  // re-init reveal for newly added items
  initReveal();
}

/* =========================
   FILTERS
   ========================= */
function initFilters() {
  const filters = qsa(".filter");

  filters.forEach(btn => {
    btn.addEventListener("click", () => {
      filters.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      currentFilter = btn.dataset.filter;
      const filtered = currentFilter === "all"
        ? PROJECTS
        : PROJECTS.filter(p => p.category === currentFilter);

      renderProjects(filtered);
    });
  });
}

/* =========================
   MODAL
   ========================= */
let modalProject = null;

function initModal() {
  const modal = qs("#modal");
  const overlay = qs("#modalOverlay");
  const close = qs("#modalClose");

  overlay.addEventListener("click", closeModal);
  close.addEventListener("click", closeModal);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      closeLightbox();
    }
  });

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    lockScroll(false);
    modalProject = null;
  }

  window.closeModal = closeModal;
}

function openModal(id) {
  const modal = qs("#modal");
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;

  modalProject = p;

  qs("#modalTitle").textContent = p.title;
  qs("#modalSubtitle").textContent = p.desc;
  qs("#modalMeta").textContent = p.tools;

  qs("#modalTask").textContent = p.task;
  qs("#modalRole").textContent = p.role;
  qs("#modalTools").textContent = p.tools;

  const gallery = qs("#modalGallery");
  gallery.innerHTML = "";

  p.gallery.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = p.title;
    img.loading = "lazy";
    img.addEventListener("click", () => openLightbox(src));
    gallery.appendChild(img);
  });

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  lockScroll(true);
}

/* =========================
   LIGHTBOX
   ========================= */
function initLightbox() {
  const overlay = qs("#lightboxOverlay");
  const close = qs("#lightboxClose");

  overlay.addEventListener("click", closeLightbox);
  close.addEventListener("click", closeLightbox);
}

function openLightbox(src) {
  const lightbox = qs("#lightbox");
  const img = qs("#lightboxImg");

  img.src = src;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  lockScroll(true);
}

function closeLightbox() {
  const lightbox = qs("#lightbox");
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lockScroll(false);
}
