/* ===== Bytefixer — Used Hardware Marketplace ===== */
(function () {
  'use strict';

  // --- LocalStorage keys ---
  const STORAGE_KEY = 'bytefixer_used_listings';

  // --- Category / Condition maps ---
  const CATEGORY_LABELS = {
    laptop: 'Laptop',
    desktop: 'Desktop PC',
    mobile: 'Κινητό / Tablet',
    component: 'Εξάρτημα',
    peripheral: 'Περιφερειακό',
    network: 'Δικτυακός Εξοπλ.',
    other: 'Άλλο'
  };
  const CONDITION_LABELS = {
    excellent: 'Άριστη',
    good: 'Καλή',
    fair: 'Μέτρια',
    parts: 'Ανταλλακτικά'
  };

  // --- State ---
  let listings = loadListings();
  let uploadedPhotos = []; // array of base64 strings
  let lightboxImages = [];
  let lightboxIndex = 0;

  // --- DOM refs ---
  const grid = document.getElementById('listingsGrid');
  const emptyState = document.getElementById('emptyState');
  const listingCount = document.getElementById('listingCount');
  const addModal = document.getElementById('addModal');
  const form = document.getElementById('addListingForm');
  const photoInput = document.getElementById('photoInput');
  const photoDrop = document.getElementById('photoDrop');
  const photoPreviews = document.getElementById('photoPreviews');
  const filterCategory = document.getElementById('filterCategory');
  const filterCondition = document.getElementById('filterCondition');
  const filterSort = document.getElementById('filterSort');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCounter = document.getElementById('lightboxCounter');

  // --- Nav toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
  }

  // --- Load / Save ---
  function loadListings() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) { return []; }
  }
  function saveListings() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
  }

  // --- Demo data ---
  function seedDemoData() {
    if (listings.length > 0) return;
    listings = [
      {
        id: 'demo1',
        title: 'Laptop HP EliteBook 840 G5',
        description: 'Intel Core i5-8350U, 16GB RAM, 256GB SSD NVMe, οθόνη 14" FHD IPS. Μπαταρία σε πολύ καλή κατάσταση. Φορτιστής περιλαμβάνεται. Ιδανικό για εργασία και φοιτητές.',
        price: 280,
        category: 'laptop',
        condition: 'good',
        photos: [],
        date: new Date(Date.now() - 86400000 * 2).toISOString()
      },
      {
        id: 'demo2',
        title: 'Samsung Galaxy S22 Ultra 128GB',
        description: 'Σε άριστη κατάσταση, χωρίς γρατζουνιές. Περιλαμβάνει θήκη, φορτιστή και S-Pen. Μπαταρία 92% health. Ξεκλείδωτο για όλα τα δίκτυα.',
        price: 420,
        category: 'mobile',
        condition: 'excellent',
        photos: [],
        date: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'demo3',
        title: 'NVIDIA RTX 3060 Ti 8GB',
        description: 'Κάρτα γραφικών σε πλήρη λειτουργία. Χρησιμοποιήθηκε μόνο για gaming (όχι mining). Κουτί και απόδειξη αγοράς διαθέσιμα.',
        price: 200,
        category: 'component',
        condition: 'good',
        photos: [],
        date: new Date().toISOString()
      },
      {
        id: 'demo4',
        title: 'Desktop PC Gaming — i7 12700K',
        description: 'Custom build: Intel i7-12700K, 32GB DDR5, RTX 4070, 1TB NVMe SSD, NZXT case, 750W PSU. Τέλειο για gaming και content creation.',
        price: 950,
        category: 'desktop',
        condition: 'excellent',
        photos: [],
        date: new Date(Date.now() - 86400000 * 5).toISOString()
      },
      {
        id: 'demo5',
        title: 'Ubiquiti UniFi AP AC Pro',
        description: 'Access point σε άριστη κατάσταση. Dual-band, PoE, mount kit περιλαμβάνεται. Ιδανικό για μικρές επιχειρήσεις.',
        price: 65,
        category: 'network',
        condition: 'good',
        photos: [],
        date: new Date(Date.now() - 86400000 * 3).toISOString()
      }
    ];
    saveListings();
  }

  // --- Render ---
  function renderListings() {
    const filtered = getFilteredListings();
    listingCount.textContent = filtered.length;

    if (filtered.length === 0) {
      grid.innerHTML = '';
      emptyState.style.display = 'block';
      return;
    }
    emptyState.style.display = 'none';

    grid.innerHTML = filtered.map(listing => {
      const hasPhotos = listing.photos && listing.photos.length > 0;
      const condClass = listing.condition === 'fair' ? 'fair' : listing.condition === 'parts' ? 'parts' : '';
      const dateStr = formatDate(listing.date);

      return `
        <div class="listing-card" data-id="${listing.id}">
          <div class="listing-images" onclick="window._openLightbox('${listing.id}', 0)">
            ${hasPhotos ? `
              <img src="${listing.photos[0]}" alt="${listing.title}" id="img-${listing.id}" data-idx="0">
              ${listing.photos.length > 1 ? `
                <button class="img-nav prev" onclick="event.stopPropagation(); window._slideImg('${listing.id}', -1)">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button class="img-nav next" onclick="event.stopPropagation(); window._slideImg('${listing.id}', 1)">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
                <div class="img-dots">${listing.photos.map((_, i) => `<span class="${i === 0 ? 'active' : ''}" data-dot="${listing.id}-${i}"></span>`).join('')}</div>
              ` : ''}
              ${listing.photos.length > 1 ? `
                <div class="img-count-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  ${listing.photos.length}
                </div>
              ` : ''}
            ` : `
              <div class="img-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              </div>
            `}
          </div>
          <div class="listing-body">
            <div class="listing-meta">
              <span class="listing-badge badge-category">${CATEGORY_LABELS[listing.category] || listing.category}</span>
              <span class="listing-badge badge-condition ${condClass}">${CONDITION_LABELS[listing.condition] || listing.condition}</span>
            </div>
            <h3 class="listing-title">${escapeHtml(listing.title)}</h3>
            <p class="listing-desc">${escapeHtml(listing.description)}</p>
            <div class="listing-footer">
              <div>
                <div class="listing-price">${listing.price}€</div>
                <div class="listing-date">${dateStr}</div>
              </div>
              <div class="listing-actions">
                <a href="index.html#contact" class="btn-contact-listing">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  Επικοινωνία
                </a>
                <button class="btn-delete-listing" onclick="window._deleteListing('${listing.id}')" title="Διαγραφή">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function getFilteredListings() {
    let result = [...listings];
    const cat = filterCategory.value;
    const cond = filterCondition.value;
    const sort = filterSort.value;

    if (cat !== 'all') result = result.filter(l => l.category === cat);
    if (cond !== 'all') result = result.filter(l => l.condition === cond);

    if (sort === 'newest') result.sort((a, b) => new Date(b.date) - new Date(a.date));
    else if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);

    return result;
  }

  // --- Image slider in card ---
  window._slideImg = function (id, dir) {
    const listing = listings.find(l => l.id === id);
    if (!listing || !listing.photos.length) return;
    const img = document.getElementById('img-' + id);
    if (!img) return;
    let idx = parseInt(img.dataset.idx || '0') + dir;
    if (idx < 0) idx = listing.photos.length - 1;
    if (idx >= listing.photos.length) idx = 0;
    img.src = listing.photos[idx];
    img.dataset.idx = idx;
    // Update dots
    document.querySelectorAll(`[data-dot^="${id}-"]`).forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
  };

  // --- Lightbox ---
  window._openLightbox = function (id, idx) {
    const listing = listings.find(l => l.id === id);
    if (!listing || !listing.photos || listing.photos.length === 0) return;
    lightboxImages = listing.photos;
    lightboxIndex = idx || 0;
    updateLightbox();
    lightbox.classList.add('open');
  };

  function updateLightbox() {
    lightboxImg.src = lightboxImages[lightboxIndex];
    lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
  }

  document.getElementById('lightboxClose').addEventListener('click', () => lightbox.classList.remove('open'));
  document.getElementById('lightboxPrev').addEventListener('click', () => {
    lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    updateLightbox();
  });
  document.getElementById('lightboxNext').addEventListener('click', () => {
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    updateLightbox();
  });
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });

  // --- Delete ---
  window._deleteListing = function (id) {
    if (!confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή την αγγελία;')) return;
    listings = listings.filter(l => l.id !== id);
    saveListings();
    renderListings();
  };

  // --- Modal ---
  document.getElementById('openAddModal').addEventListener('click', () => {
    uploadedPhotos = [];
    photoPreviews.innerHTML = '';
    form.reset();
    addModal.classList.add('open');
  });
  document.getElementById('closeAddModal').addEventListener('click', () => addModal.classList.remove('open'));
  addModal.addEventListener('click', (e) => { if (e.target === addModal) addModal.classList.remove('open'); });

  // --- Photo upload ---
  photoDrop.addEventListener('click', () => photoInput.click());
  photoDrop.addEventListener('dragover', (e) => { e.preventDefault(); photoDrop.classList.add('dragover'); });
  photoDrop.addEventListener('dragleave', () => photoDrop.classList.remove('dragover'));
  photoDrop.addEventListener('drop', (e) => {
    e.preventDefault();
    photoDrop.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
  });
  photoInput.addEventListener('change', () => {
    handleFiles(photoInput.files);
    photoInput.value = '';
  });

  function handleFiles(files) {
    const remaining = 5 - uploadedPhotos.length;
    const toProcess = Array.from(files).slice(0, remaining);
    toProcess.forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        // Resize image for storage
        resizeImage(e.target.result, 800, (resized) => {
          uploadedPhotos.push(resized);
          renderPhotoPreview();
        });
      };
      reader.readAsDataURL(file);
    });
  }

  function resizeImage(dataUrl, maxSize, callback) {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let w = img.width, h = img.height;
      if (w > maxSize || h > maxSize) {
        if (w > h) { h = Math.round(h * maxSize / w); w = maxSize; }
        else { w = Math.round(w * maxSize / h); h = maxSize; }
      }
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      callback(canvas.toDataURL('image/jpeg', 0.82));
    };
    img.src = dataUrl;
  }

  function renderPhotoPreview() {
    photoPreviews.innerHTML = uploadedPhotos.map((src, i) => `
      <div class="photo-preview">
        <img src="${src}" alt="Preview ${i + 1}">
        <button type="button" class="remove-photo" onclick="window._removePhoto(${i})">×</button>
      </div>
    `).join('');
    photoDrop.style.display = uploadedPhotos.length >= 5 ? 'none' : '';
  }

  window._removePhoto = function (idx) {
    uploadedPhotos.splice(idx, 1);
    renderPhotoPreview();
  };

  // --- Submit listing ---
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('listingTitle').value.trim();
    const price = parseInt(document.getElementById('listingPrice').value);
    const category = document.getElementById('listingCategory').value;
    const condition = document.getElementById('listingCondition').value;
    const description = document.getElementById('listingDesc').value.trim();

    if (!title || !price || !category || !condition || !description) return;

    const listing = {
      id: 'l' + Date.now() + Math.random().toString(36).slice(2, 6),
      title,
      price,
      category,
      condition,
      description,
      photos: uploadedPhotos,
      date: new Date().toISOString()
    };

    listings.unshift(listing);
    saveListings();
    renderListings();
    addModal.classList.remove('open');
    form.reset();
    uploadedPhotos = [];
    photoPreviews.innerHTML = '';
    photoDrop.style.display = '';
  });

  // --- Filters ---
  filterCategory.addEventListener('change', renderListings);
  filterCondition.addEventListener('change', renderListings);
  filterSort.addEventListener('change', renderListings);

  // --- Keyboard ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      addModal.classList.remove('open');
      lightbox.classList.remove('open');
    }
    if (lightbox.classList.contains('open')) {
      if (e.key === 'ArrowLeft') {
        lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
        updateLightbox();
      }
      if (e.key === 'ArrowRight') {
        lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
        updateLightbox();
      }
    }
  });

  // --- Helpers ---
  function formatDate(dateStr) {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - d) / 86400000);
    if (diff === 0) return 'Σήμερα';
    if (diff === 1) return 'Χθες';
    if (diff < 7) return `${diff} ημέρες πριν`;
    return d.toLocaleDateString('el-GR', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // --- Init ---
  seedDemoData();
  renderListings();

})();
