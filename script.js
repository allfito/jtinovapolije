/* ============================================================
   1. DATA PORTFOLIO & GALERI
   ============================================================ */
const portfolioData = [
    { id: 1, title: "Cerdas Cermat", category: "website", image: "assets/web1.png", description: "Aplikasi Lomba Cerdas Cermat Olimpiade Akuntansi Vokasi (OAV) 2024" },
    { id: 2, title: "Dexagon App", category: "website", image: "assets/web2.png", description: "Aplikasi Olimpiade Akuntansi Vokasi (OAV) 2024" },
    { id: 3, title: "SSC SMASA Web App", category: "website", image: "assets/web3.png", description: "Science School Competition 2024 SMA Negeri 1 Jember pembelajaran online dengan website dan mobile app" },
    { id: 4, title: "Daftar Ulang Polije", category: "website", image: "assets/web4.png", description: "Aplikasi untuk Daftar Ulang mahasiswa baru POLITEKNIK NEGERI JEMBER" },
    { id: 5, title: "Kenaikan Pangkat Kepegawaian", category: "website", image: "assets/web6.png", description: "Aplikasi Kenaikan Pangkat Kepegawaian" },
    { id: 6, title: "Dikantin Polije", category: "both", image: "assets/webmobile1.png", description: "Welcome to DIKANTIN POLIJE, the JTINOVA affiliated application designed to assist you in streamlining report management, sales recapitulation, and simplifying the sales process." },
    { id: 7, title: "CDC Polije", category: "both", image: "assets/webmobile2.png", description: "Satu Aplikasi, Untuk Alumni. Temukan Rekan Alumni dengan Cepat, dan Dapatkan Informasi Lowongan Terkini" },
    { id: 8, title: "Dikasiri Polije", category: "both", image: "assets/webmobile3.png", description: "Aplikasi Kasir Tefa Backery Polije" }
];

const galleryData = [
    { src: "assets/galeri1.jpg", title: "Nurul Chotib MOU" },
    { src: "assets/galeri2.jpg", title: "Weakly Meet" },
    { src: "assets/galeri3.jpg", title: "Pelatihan Game Developer" },
    { src: "assets/galeri4.jpg", title: "Podcast JTINova" },
    { src: "assets/galeri5.jpg", title: "Pelatihan Game Developer" },
    { src: "assets/galeri6.jpg", title: "Pelatihan Online" }
];


/* ============================================================
   2. UTILITY FUNCTIONS
   ============================================================ */

// Normalisasi kategori (website / mobile / both)
function normalizeCategory(category) {
    const cat = category.toLowerCase();
    if (cat.includes("website") && cat.includes("mobile")) return "both";
    if (cat.includes("website")) return "website";
    if (cat.includes("mobile")) return "mobile";
    return category;
}

// Label kategori yang ditampilkan di tampilan
function getCategoryLabel(category) {
    switch (category) {
        case "website": return "Website";
        case "mobile": return "Mobile App";
        case "both": return "Website & Mobile";
        default: return category;
    }
}


/* ============================================================
   3. PORTFOLIO SECTION
   ============================================================ */

// Membuat tampilan portfolio
function initializePortfolio() {
    const portfolioGrid = document.querySelector(".portfolio-grid");
    portfolioGrid.innerHTML = "";

    portfolioData.forEach(item => {
        const normalized = normalizeCategory(item.category);

        const col = document.createElement("div");
        col.className = `col-md-6 col-lg-4 portfolio-item ${normalized}`;

        col.innerHTML = `
            <div class="h-100 rounded shadow-sm overflow-hidden position-relative portfolio-click"
                data-bs-toggle="modal"
                data-bs-target="#imageModal"
                data-image="${item.image}">
                
                <img src="${item.image}" class="img-fluid" alt="${item.title}">
                
                <div class="portfolio-overlay">
                    <h5 class="fw-bold">${item.title}</h5>
                    <p class="mb-0">${item.description}</p>
                </div>

                <span class="portfolio-category">${getCategoryLabel(item.category)}</span>
            </div>
        `;

        portfolioGrid.appendChild(col);
    });
}

// Filter berdasarkan kategori
function filterPortfolio(filter) {
    const items = document.querySelectorAll('.portfolio-item');
    items.forEach(item => {
        item.style.display = (filter === 'all' || item.classList.contains(filter)) ? "block" : "none";
    });
}

// Event filter
function setupPortfolioFilter() {
    const buttons = document.querySelectorAll('.portfolio-filter .btn');
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            buttons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            filterPortfolio(this.dataset.filter);
        });
    });
}


/* ============================================================
   4. GALLERY SECTION (CAROUSEL + GRID)
   ============================================================ */

function initializeGallery() {
    initializeGalleryCarousel();
    initializeGalleryGrid();
}

// Carousel (3 gambar per slide)
function initializeGalleryCarousel() {
    const carouselInner = document.querySelector('#galleryCarousel .carousel-inner');
    const indicators = document.querySelector('#galleryCarousel .carousel-indicators');

    if (!carouselInner || !indicators) return;

    const slides = [];
    for (let i = 0; i < galleryData.length; i += 3) {
        slides.push(galleryData.slice(i, i + 3));
    }

    carouselInner.innerHTML = slides.map((group, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <div class="carousel-item-row">
                ${group.map(item => `
                    <div class="carousel-image-container" data-bs-toggle="modal"
                        data-bs-target="#imageModal" data-image-src="${item.src}"
                        data-image-title="${item.title}">
                        <img src="${item.src}" class="img-fluid">
                        <div class="carousel-image-overlay">
                            <h6>${item.title}</h6>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
    `).join("");

    indicators.innerHTML = slides.map((_, i) =>
        `<button type="button" data-bs-target="#galleryCarousel" data-bs-slide-to="${i}" class="${i === 0 ? "active" : ""}"></button>`
    ).join("");
}

// Grid Gallery
function initializeGalleryGrid() {
    const grid = document.querySelector(".gallery-grid");
    if (!grid) return;

    grid.innerHTML = galleryData.map(item => `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="gallery-item shadow-sm rounded overflow-hidden"
                data-bs-toggle="modal" data-bs-target="#imageModal"
                data-image-src="${item.src}" data-image-title="${item.title}">
                
                <img src="${item.src}" class="img-fluid">
                <div class="gallery-overlay">
                    <h6 class="fw-semibold">${item.title}</h6>
                    <small>Klik untuk memperbesar</small>
                </div>
            </div>
        </div>
    `).join("");
}


/* ============================================================
   5. MODAL SECTION
   ============================================================ */

function setupModalEvent() {
    const modal = document.getElementById('imageModal');
    modal.addEventListener('show.bs.modal', function (event) {
        const target = event.relatedTarget;

        document.getElementById('modalImage').src = target.dataset.imageSrc || target.dataset.image;
        document.getElementById('modalImageTitle').textContent = target.dataset.imageTitle || "";
    });
}


/* ============================================================
   6. NAVIGATION & SMOOTH SCROLL
   ============================================================ */

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;

            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: "smooth"
            });
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    let current = "";

    sections.forEach(sec => {
        let top = sec.offsetTop - 120;
        if (scrollY >= top) current = sec.id;
    });

    navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
}

function setupNavbarScroll() {
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        navbar.classList.toggle("navbar-scrolled", scrollY > 100);
        updateActiveNavLink();
    });
}


/* ============================================================
   7. CONTACT FORM
   ============================================================ */

function setupContactForm() {
    const form = document.getElementById("contactForm");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Terima kasih! Pesan Anda berhasil dikirim.");
        form.reset();
    });
}


/* ============================================================
   8. NAVBAR SCROLLED STYLE (Inject CSS)
   ============================================================ */

const style = document.createElement('style');
style.textContent = `
    .navbar-scrolled {
        background-color: rgba(44, 62, 80, 0.95) !important;
        backdrop-filter: blur(10px);
        transition: background-color .3s ease;
    }
`;
document.head.appendChild(style);


/* ============================================================
   9. INITIALIZE ALL FUNCTIONS
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    initializePortfolio();
    setupPortfolioFilter();
    initializeGallery();
    setupModalEvent();
    setupSmoothScrolling();
    setupNavbarScroll();
    setupContactForm();
    updateActiveNavLink();
});
