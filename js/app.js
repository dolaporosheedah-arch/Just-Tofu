// JUST TOFU - Core UI & Interaction Controller

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initOpeningHoursStatus();
  renderFeaturedDishes();
  initMenuSection();
  initGallerySection();
  initDishModal();
  initSmoothScroll();
});

/* -------------------------------------------------------------
 * 1. NAVBAR & MOBILE DRAWER
 * ------------------------------------------------------------- */
function initNavbar() {
  const header = document.getElementById("mainHeader");
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileMenuDrawer = document.getElementById("mobileMenuDrawer");
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  // Sticky header blur & shadow on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    updateActiveNavLink();
  }, { passive: true });

  // Open / Close Mobile Menu
  function openMobileMenu() {
    mobileMenuDrawer.classList.add("open");
    mobileMenuOverlay.classList.add("active");
    mobileMenuToggle.classList.add("active");
    mobileMenuToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    mobileMenuDrawer.classList.remove("open");
    mobileMenuOverlay.classList.remove("active");
    mobileMenuToggle.classList.remove("active");
    mobileMenuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      if (mobileMenuDrawer.classList.contains("open")) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", closeMobileMenu);
  }

  document.querySelectorAll("[data-action='close-mobile-menu']").forEach(btn => {
    btn.addEventListener("click", closeMobileMenu);
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  // Scrollspy: update active nav item based on viewport
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll(".nav-link").forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }
}

/* -------------------------------------------------------------
 * 2. LIVE OPENING HOURS STATUS
 * ------------------------------------------------------------- */
function initOpeningHoursStatus() {
  const statusBadges = document.querySelectorAll(".live-status-badge");
  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 1 = Mon ...
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours + minutes / 60;

  // Restaurant hours: Mon - Sun 11:30 AM to 10:00 PM (11.5 to 22.0)
  const isOpen = (currentTime >= 11.5 && currentTime < 22.0);

  statusBadges.forEach(badge => {
    if (isOpen) {
      badge.innerHTML = `<span class="status-dot online"></span> Open Now &bull; Closes 10:00 PM`;
      badge.classList.add("status-open");
    } else {
      badge.innerHTML = `<span class="status-dot offline"></span> Closed Now &bull; Opens 11:30 AM`;
      badge.classList.add("status-closed");
    }
  });
}

/* -------------------------------------------------------------
 * 3. OUR TOFU - FEATURED SHOWCASE
 * ------------------------------------------------------------- */
function renderFeaturedDishes() {
  const container = document.getElementById("featuredDishesGrid");
  if (!container) return;

  const featuredDishes = FEATURED_ITEMS.map(id => MENU_DATA.find(d => d.id === id)).filter(Boolean);

  container.innerHTML = featuredDishes.map(dish => {
    const isSignature = dish.isSignature;
    return `
      <div class="featured-card ${isSignature ? 'signature-featured-card' : ''}" data-id="${dish.id}">
        <div class="featured-image-wrap" onclick="openDishModal('${dish.id}')">
          <img src="${dish.image}" alt="${dish.name}" class="featured-image" loading="lazy" onerror="this.src='images/tofu_pepper_soup.jpg'">
          ${dish.badge ? `<span class="featured-badge ${isSignature ? 'signature-badge' : ''}">${dish.badge}</span>` : ''}
          ${dish.spiceLevel > 0 ? `<span class="spice-tag">${'🌶️'.repeat(dish.spiceLevel)}</span>` : ''}
        </div>
        <div class="featured-content">
          <div class="featured-header">
            <h3 class="featured-title" onclick="openDishModal('${dish.id}')">${dish.name}</h3>
            <span class="featured-price">$${dish.price.toFixed(2)}</span>
          </div>
          <p class="featured-desc">${dish.description}</p>
          <div class="featured-footer">
            <div class="dietary-pills">
              ${dish.dietary.slice(0, 2).map(tag => `<span class="diet-pill">${tag}</span>`).join('')}
            </div>
            <button class="btn btn-add-order" onclick="window.cart.addItem('${dish.id}', 1)">
              <span>ADD TO ORDER</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

/* -------------------------------------------------------------
 * 4. MENU SECTION WITH CATEGORIES & SEARCH
 * ------------------------------------------------------------- */
let activeCategory = "ALL";
let searchQuery = "";

function initMenuSection() {
  const categoryBtns = document.querySelectorAll(".menu-cat-btn");
  const searchInput = document.getElementById("menuSearchInput");

  categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.dataset.category;
      renderMenuCards();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderMenuCards();
    });
  }

  renderMenuCards();
}

function renderMenuCards() {
  const container = document.getElementById("menuItemsGrid");
  const noResults = document.getElementById("menuNoResults");
  if (!container) return;

  let filtered = MENU_DATA;

  // Filter by category
  if (activeCategory !== "ALL") {
    filtered = filtered.filter(item => {
      return item.category === activeCategory || (item.tags && item.tags.includes(activeCategory));
    });
  }

  // Filter by search query
  if (searchQuery) {
    filtered = filtered.filter(item => {
      return item.name.toLowerCase().includes(searchQuery) ||
             item.description.toLowerCase().includes(searchQuery) ||
             item.dietary.some(d => d.toLowerCase().includes(searchQuery));
    });
  }

  if (filtered.length === 0) {
    container.innerHTML = "";
    if (noResults) noResults.style.display = "block";
    return;
  }

  if (noResults) noResults.style.display = "none";

  container.innerHTML = filtered.map(item => `
    <div class="menu-card ${item.isSignature ? 'signature-menu-card' : ''}" data-category="${item.category}" data-id="${item.id}">
      <div class="menu-card-img-wrap" onclick="openDishModal('${item.id}')">
        <img src="${item.image}" alt="${item.name}" class="menu-card-img" loading="lazy" onerror="this.src='images/tofu_pepper_soup.jpg'">
        ${item.badge ? `<span class="menu-card-badge ${item.isSignature ? 'badge-signature' : ''}">${item.badge}</span>` : ''}
        ${item.spiceLevel > 0 ? `<span class="spice-tag">${'🌶️'.repeat(item.spiceLevel)}</span>` : ''}
      </div>
      <div class="menu-card-body">
        <div class="menu-card-top">
          <span class="menu-card-category">${item.category}</span>
          <span class="menu-card-calories">${item.calories || ''}</span>
        </div>
        <h4 class="menu-card-title" onclick="openDishModal('${item.id}')">${item.name}</h4>
        <p class="menu-card-desc">${item.description}</p>
        <div class="menu-card-bottom">
          <span class="menu-card-price">$${item.price.toFixed(2)}</span>
          <button class="btn btn-sm-order" onclick="window.cart.addItem('${item.id}', 1)" title="Add to Order">
            <span>Add to Order</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

/* -------------------------------------------------------------
 * 5. DISH DETAILS MODAL
 * ------------------------------------------------------------- */
function initDishModal() {
  const modal = document.getElementById("dishDetailModal");
  if (!modal) return;

  document.querySelectorAll("[data-action='close-dish-modal']").forEach(btn => {
    btn.addEventListener("click", () => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  const modalOverlay = modal.querySelector(".modal-backdrop");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", () => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }
}

window.openDishModal = function(dishId) {
  const dish = MENU_DATA.find(d => d.id === dishId);
  const modal = document.getElementById("dishDetailModal");
  if (!dish || !modal) return;

  let modalQty = 1;

  document.getElementById("modalDishImg").src = dish.image;
  document.getElementById("modalDishImg").alt = dish.name;
  document.getElementById("modalDishTitle").textContent = dish.name;
  document.getElementById("modalDishPrice").textContent = `$${dish.price.toFixed(2)}`;
  document.getElementById("modalDishDesc").textContent = dish.description;
  document.getElementById("modalDishBadge").textContent = dish.badge || dish.category;
  document.getElementById("modalDishCalories").textContent = dish.calories || "Crafted with organic soybeans";

  const dietaryEl = document.getElementById("modalDishDietary");
  if (dietaryEl) {
    dietaryEl.innerHTML = dish.dietary.map(d => `<span class="diet-pill">${d}</span>`).join("");
  }

  const spiceEl = document.getElementById("modalDishSpice");
  if (spiceEl) {
    spiceEl.innerHTML = dish.spiceLevel > 0 
      ? `<span>Spice Level: </span><strong>${'🌶️'.repeat(dish.spiceLevel)}</strong>` 
      : `<span>Mild & Gentle</span>`;
  }

  const qtyVal = document.getElementById("modalDishQty");
  if (qtyVal) qtyVal.textContent = "1";

  const decreaseBtn = document.getElementById("modalQtyDec");
  const increaseBtn = document.getElementById("modalQtyInc");
  
  if (decreaseBtn && increaseBtn && qtyVal) {
    decreaseBtn.onclick = () => {
      if (modalQty > 1) {
        modalQty--;
        qtyVal.textContent = modalQty;
      }
    };
    increaseBtn.onclick = () => {
      modalQty++;
      qtyVal.textContent = modalQty;
    };
  }

  const addToCartBtn = document.getElementById("modalAddToCartBtn");
  if (addToCartBtn) {
    addToCartBtn.onclick = () => {
      const instructions = document.getElementById("modalSpecialNotes")?.value || "";
      window.cart.addItem(dish.id, modalQty, instructions);
      modal.classList.remove("active");
      document.body.style.overflow = "";
      if (document.getElementById("modalSpecialNotes")) {
        document.getElementById("modalSpecialNotes").value = "";
      }
    };
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
};

/* -------------------------------------------------------------
 * 6. GALLERY & LIGHTBOX
 * ------------------------------------------------------------- */
function initGallerySection() {
  const container = document.getElementById("galleryGrid");
  const lightbox = document.getElementById("galleryLightbox");
  if (!container) return;

  container.innerHTML = GALLERY_ITEMS.map((item, index) => `
    <div class="gallery-item" onclick="openLightbox(${index})">
      <img src="${item.image}" alt="${item.title}" class="gallery-img" loading="lazy" onerror="this.src='images/tofu_pepper_soup.jpg'">
      <div class="gallery-overlay">
        <span class="gallery-tag">${item.tag}</span>
        <h4 class="gallery-title">${item.title}</h4>
        <p class="gallery-subtitle">${item.subtitle}</p>
        <span class="gallery-zoom-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        </span>
      </div>
    </div>
  `).join("");

  // Lightbox handlers
  if (lightbox) {
    document.querySelectorAll("[data-action='close-lightbox']").forEach(btn => {
      btn.addEventListener("click", closeLightbox);
    });

    const prevBtn = document.getElementById("lightboxPrevBtn");
    const nextBtn = document.getElementById("lightboxNextBtn");

    if (prevBtn) prevBtn.addEventListener("click", prevLightbox);
    if (nextBtn) nextBtn.addEventListener("click", nextLightbox);

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "ArrowRight") nextLightbox();
    });
  }
}

let currentLightboxIndex = 0;

window.openLightbox = function(index) {
  currentLightboxIndex = index;
  const item = GALLERY_ITEMS[index];
  const lightbox = document.getElementById("galleryLightbox");
  if (!item || !lightbox) return;

  document.getElementById("lightboxImg").src = item.image;
  document.getElementById("lightboxImg").alt = item.title;
  document.getElementById("lightboxTitle").textContent = item.title;
  document.getElementById("lightboxSubtitle").textContent = item.subtitle;
  document.getElementById("lightboxCounter").textContent = `${index + 1} / ${GALLERY_ITEMS.length}`;

  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
};

function closeLightbox() {
  const lightbox = document.getElementById("galleryLightbox");
  if (lightbox) {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function prevLightbox() {
  currentLightboxIndex = (currentLightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
  window.openLightbox(currentLightboxIndex);
}

function nextLightbox() {
  currentLightboxIndex = (currentLightboxIndex + 1) % GALLERY_ITEMS.length;
  window.openLightbox(currentLightboxIndex);
}

/* -------------------------------------------------------------
 * 7. SMOOTH SCROLLING
 * ------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length <= 1) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
