document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobileMenu');
    const navWrapper = document.getElementById('navWrapper');
    const mainContent = document.getElementById('mainContent');
    const loginBtn = document.getElementById('loginBtn');

    // 1. Mobile Menu Toggle
    mobileMenu.addEventListener('click', () => {
        navWrapper.classList.toggle('active');
    });

    // 2. Navigation Content Logic
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            updateContent(section);
            navWrapper.classList.remove('active'); // Close menu on mobile
        });
    });

    function updateContent(section) {
    const mainContent = document.getElementById('mainContent');

    if (section === 'products') {
        // products data source
        const products = [
            { img: 'img/product 1.jpg', images: [], pdf: '', title: 'TELSTAR', desc: 'N/A' },
            { img: 'img/product 2.jpg', images: ['img/ROVASTIN/1.jpg', 'img/ROVASTIN/2.jpg', 'img/ROVASTIN/3.jpg', 'img/ROVASTIN/4.jpg', 'img/ROVASTIN/5.jpg'], pdf: 'productspdf/ROVASTIN_DL.pdf', title: 'ROVASTIN', desc: 'ROVASTIN is the EPIC Rosuvastatin—effective, potent, quality-assured, affordable, and convenient—proven to significantly reduce cardiovascular risk while helping patients with dyslipidemia better comply with treatment.' },
            { img: 'img/product 3.jpg', images: ['img/BETACARD/1.jpg', 'img/BETACARD/2.jpg', 'img/BETACARD/3.jpg', 'img/BETACARD/4.jpg'], pdf: 'productspdf/BETACARD_DL.pdf', title: 'BETACARD', desc: 'BETACARD (Carvedilol) is a trusted, bioequivalent beta-blocker proven to reduce morbidity and mortality in patients with Heart Failure and Hypertension, offering quality, efficacy, and affordability for improved patient compliance for over 17 years.' },
            { img: 'img/product 4.jpg', images: ['img/ANOION/1.jpg', 'img/ANOION/2.jpg', 'img/ANOION/3.jpg'], pdf: 'productspdf/ANOION.pdf', title: 'ANOION', desc: 'ANOION is a trusted, quality-assured, and affordable Amiodarone that helps patients with heart rhythm disorders stay in tune with life, offering over 18 years of proven efficacy and compliance support.' },
            { img: 'img/product 5.jpg', images: [], pdf: '', title: 'AMLOTITAN', desc: 'N/A' },
            { img: 'img/product 6.jpg', images: [], pdf: '', title: 'RILIXIA', desc: 'N/A' },
            { img: 'img/product 7.jpg', images: ['img/PROTEK-GFR/1.jpg', 'img/PROTEK-GFR/2.jpg', 'img/PROTEK-GFR/3.jpg'], pdf: 'productspdf/PROTEK GFR_DL.pdf', title: 'PROTEK GFR', desc: 'PROTEK GFR is an affordable ketoanalogues + ESA renal nutrition therapy that, together with a low-protein diet, helps slow CKD progression, improve patient compliance, and deliver significant monthly savings while protecting kidney function.' },
            { img: 'img/TRYME MR.jpeg', images: ['img/TRYME_MR/1.jpg', 'img/TRYME_MR/2.jpg', 'img/TRYME_MR/3.jpg', 'img/TRYME_MR/4.jpg'], pdf: 'productspdf/TRYME MR_DL.pdf', title: 'TRYME MR', desc: 'TRYME MR is the smart choice for angina management—quality-tested, bioequivalent, and affordable, helping patients save while ensuring effective heart support as the metabolic energizer of the heart.' }
            
        ];

        const isMobile = window.innerWidth <= 768;
        const containerHtml = `
            <div class="card">
                <h3 style="margin-bottom: 20px;">Products Services Portfolio</h3>
                <div id="productContainer"></div>
            </div>`;

        mainContent.innerHTML = containerHtml;
        const productContainer = document.getElementById('productContainer');

        if (!isMobile) {
            // Desktop/tablet: show all products in a grid
            const grid = document.createElement('div');
            grid.className = 'product-grid';
            products.forEach(p => {
                const item = document.createElement('div');
                item.className = 'product-item';
                const downloadBtn = p.pdf ? `<a href="${p.pdf}" download class="btn-download" title="Download PDF">📥 Download PDF</a>` : '';
                item.innerHTML = `
                    <img src="${p.img}" alt="${p.title}" title="Click to view images" class="product-img" data-title="${p.title}" data-desc="${p.desc}" data-pdf="${p.pdf}" data-images="${JSON.stringify(p.images).replace(/"/g, '&quot;')}">
                    <div class="product-hint">Click image to view</div>
                    <div class="product-info">
                        <h4>${p.title}</h4>
                        <p>${p.desc}</p>
                        ${downloadBtn}
                    </div>`;
                grid.appendChild(item);
            });
            productContainer.appendChild(grid);
            return;
        }

        // Mobile: paginate products, 3 per page with Next button and remaining count
        const pageSize = 3;
        let page = 0;

        function renderPage() {
            const start = page * pageSize;
            const pageItems = products.slice(start, start + pageSize);

            productContainer.innerHTML = '';

            const grid = document.createElement('div');
            grid.className = 'product-grid';
            pageItems.forEach(p => {
                const item = document.createElement('div');
                item.className = 'product-item';
                const downloadBtn = p.pdf ? `<a href="${p.pdf}" download class="btn-download" title="Download PDF">📥 Download PDF</a>` : '';
                item.innerHTML = `
                    <img src="${p.img}" alt="${p.title}" title="Click to view images" class="product-img" data-title="${p.title}" data-desc="${p.desc}" data-pdf="${p.pdf}" data-images="${JSON.stringify(p.images).replace(/"/g, '&quot;')}">
                    <div class="product-hint">Click image to view</div>
                    <div class="product-info">
                        <h4>${p.title}</h4>
                        <p>${p.desc}</p>
                        ${downloadBtn}
                    </div>`;
                grid.appendChild(item);
            });

            const pager = document.createElement('div');
            pager.className = 'pager';

            const remaining = Math.max(0, products.length - (start + pageItems.length));
            const remainingEl = document.createElement('div');
            remainingEl.className = 'remaining';
            remainingEl.textContent = remaining > 0 ? `${remaining} more product${remaining > 1 ? 's' : ''}` : 'No more products';

            const nextBtn = document.createElement('button');
            nextBtn.className = 'btn-next';
            nextBtn.textContent = 'Next';
            nextBtn.disabled = remaining === 0;


            const prevBtn = document.createElement('button');
            prevBtn.className = 'btn-prev';
            prevBtn.textContent = 'Previous';
            prevBtn.disabled = page === 0;

            prevBtn.addEventListener('click', () => {
                if (page > 0) {
                    page -= 1;
                    renderPage();
                }
            });

            nextBtn.addEventListener('click', () => {
                if (remaining > 0) {
                    page += 1;
                    renderPage();
                }
            });

            pager.appendChild(prevBtn);
            pager.appendChild(remainingEl);
            pager.appendChild(nextBtn);

            productContainer.appendChild(grid);
            productContainer.appendChild(pager);
        }

        renderPage();
    } else if (section === 'contacts') {
        mainContent.innerHTML = `
            <div class="card contact-card">
                <h3>Contact Information</h3>
                <div class="contact-grid">
                    <div class="contact-details">
                        <p class="contact-intro">Reach out to us — we're happy to assist.</p>

                        <div class="contact-item">
                            <strong>Address</strong>
                            <span>Daraga, Albay, Philippines</span>
                        </div>

                        <div class="contact-item">
                            <strong>Phone</strong>
                            <a href="tel:+639381236488">+63 9381236488</a>
                        </div>

                        <div class="contact-item">
                            <strong>Email</strong>
                            <a>gblovendino.gxii@gmail.com</a>
                        </div>

                        <div class="contact-item">
                            <strong>Facebook</strong>
                            <a href="https://www.facebook.com/ghanel.bianca.22" target="_blank" rel="noopener">Ghanel Bianca B. Lovendino</a>
                        </div>
                    </div>
                </div>
            </div>`;
    } else {
        // This handles the "Profile" tab
        location.reload(); 
    }
}

    // 3. Login Event
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    const loginForm = document.getElementById('loginForm');

    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        loginModal.style.display = 'none';
        loginForm.reset();
    });

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
            loginForm.reset();
        }
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;

        // Basic validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Here you would typically send the data to a server
        console.log('Login attempt:', { email, remember });
        alert('Login successful! Welcome to GX International.');
        loginModal.style.display = 'none';
        loginForm.reset();
    });

    // Image gallery (click to view multiple images from folder)
    function createImageGallery() {
        let gallery = document.getElementById('imageGallery');
        if (gallery) return gallery;

        gallery = document.createElement('div');
        gallery.id = 'imageGallery';
        gallery.className = 'img-gallery';
        gallery.innerHTML = `
            <div class="img-gallery-content">
                <button class="img-close" aria-label="Close">&times;</button>
                <div class="img-gallery-wrapper">
                    <button class="gallery-prev" style="display:none;">❮</button>
                    <img src="" alt="" class="gallery-image">
                    <button class="gallery-next" style="display:none;">❯</button>
                    <div class="img-gallery-info">
                        <h3></h3>
                        <p></p>
                        <div class="gallery-counter"></div>
                        <a href="" class="gallery-download-btn" style="display:none;" download title="Download PDF">📥 Download PDF</a>
                    </div>
                </div>
            </div>`;

        document.body.appendChild(gallery);

        gallery.addEventListener('click', (ev) => {
            // Close when clicking overlay or close button
            if (ev.target === gallery || ev.target.classList.contains('img-close')) {
                gallery.style.display = 'none';
            }
        });

        window.addEventListener('keydown', (ev) => {
            if (ev.key === 'Escape' && gallery.style.display === 'flex') {
                gallery.style.display = 'none';
            }
        });

        return gallery;
    }

    document.addEventListener('click', (ev) => {
        const clicked = ev.target.closest ? ev.target.closest('.product-img') : null;
        if (!clicked) return;

        const imagesJson = clicked.getAttribute('data-images') || '[]';
        let images = JSON.parse(imagesJson);
        const title = clicked.getAttribute('data-title') || '';
        const desc = clicked.getAttribute('data-desc') || '';
        const productImage = clicked.getAttribute('src') || '';
        const pdf = clicked.getAttribute('data-pdf') || '';
        
        // If no additional images, use the current product image
        if (!images || images.length === 0) {
            images = [productImage];
        }

        const gallery = createImageGallery();
        let currentImageIndex = 0;

        function updateGalleryDisplay() {
            if (images.length === 0) return;
            
            const img = gallery.querySelector('.gallery-image');
            const prevBtn = gallery.querySelector('.gallery-prev');
            const nextBtn = gallery.querySelector('.gallery-next');
            const counter = gallery.querySelector('.gallery-counter');
            const downloadBtn = gallery.querySelector('.gallery-download-btn');

            img.src = images[currentImageIndex];
            img.alt = title;
            counter.textContent = `${currentImageIndex + 1} / ${images.length}`;

            prevBtn.style.display = images.length > 1 ? 'block' : 'none';
            nextBtn.style.display = images.length > 1 ? 'block' : 'none';
            prevBtn.disabled = currentImageIndex === 0;
            nextBtn.disabled = currentImageIndex === images.length - 1;

            gallery.querySelector('h3').textContent = title;
            gallery.querySelector('p').textContent = desc;
            
            // Show download button only if PDF exists
            if (pdf) {
                downloadBtn.href = pdf;
                downloadBtn.style.display = 'inline-block';
            } else {
                downloadBtn.style.display = 'none';
            }
        }

        gallery.querySelector('.gallery-prev').onclick = () => {
            if (currentImageIndex > 0) {
                currentImageIndex--;
                updateGalleryDisplay();
            }
        };

        gallery.querySelector('.gallery-next').onclick = () => {
            if (currentImageIndex < images.length - 1) {
                currentImageIndex++;
                updateGalleryDisplay();
            }
        };

        currentImageIndex = 0;
        updateGalleryDisplay();
        gallery.style.display = 'flex';
    });
});