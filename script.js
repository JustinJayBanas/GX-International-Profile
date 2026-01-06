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
            { img: 'img/product 1.jpg', pdf: '', title: 'TELSTAR', desc: 'Premium international shipping solution.' },
            { img: 'img/product 2.jpg', pdf: 'productspdf/ROVASTIN_removed.pdf', title: 'ROVASTIN', desc: 'ROVASTIN is the EPIC Rosuvastatin—effective, potent, quality-assured, affordable, and convenient—proven to significantly reduce cardiovascular risk while helping patients with dyslipidemia better comply with treatment.' },
            { img: 'img/product 3.jpg', pdf: 'productspdf/BETACARD_removed.pdf', title: 'BETACARD', desc: 'BETACARD (Carvedilol) is a trusted, bioequivalent beta-blocker proven to reduce morbidity and mortality in patients with Heart Failure and Hypertension, offering quality, efficacy, and affordability for improved patient compliance for over 17 years.' },
            { img: 'img/product 4.jpg', pdf: 'productspdf/ANOION.pdf', title: 'ANOION', desc: 'Cost-optimized routing and consolidation.' },
            { img: 'img/product 5.jpg', pdf: '', title: 'AMLOTITAN', desc: 'Automated customs documentation.' },
            { img: 'img/product 6.jpg', pdf: '', title: 'RILIXIA', desc: 'Simplified international returns.' },
            { img: 'img/product 7.jpg', pdf: 'productspdf/PROTEK GFR_removed.pdf', title: 'Premium Support', desc: 'PROTEK GFR is an affordable ketoanalogues + ESA renal nutrition therapy that, together with a low-protein diet, helps slow CKD progression, improve patient compliance, and deliver significant monthly savings while protecting kidney function.' },
            { img: 'img/TRYME MR.jpeg', pdf: 'productspdf/TRYME MR_removed.pdf', title: 'TRYME MR', desc: '24/7 dedicated account support.' }
            
        ];

        const isMobile = window.innerWidth <= 768;
        const containerHtml = `
            <div class="card">
                <h3 style="margin-bottom: 20px;">Managed Product Portfolio</h3>
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
                item.innerHTML = `
                    <img src="${p.img}" alt="${p.title}" title="Click image for more details" class="product-img" data-title="${p.title}" data-desc="${p.desc}" data-pdf="${p.pdf}">
                    <div class="product-hint">Click image for more details</div>
                    <div class="product-info">
                        <h4>${p.title}</h4>
                        <p>${p.desc}</p>
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
                item.innerHTML = `
                    <img src="${p.img}" alt="${p.title}" title="Click image for more details" class="product-img" data-title="${p.title}" data-desc="${p.desc}" data-pdf="${p.pdf}">
                    <div class="product-hint">Click image for more details</div>
                    <div class="product-info">
                        <h4>${p.title}</h4>
                        <p>${p.desc}</p>
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

    // Image lightbox (click to zoom) - event delegation
    function createImageLightbox() {
        let lb = document.getElementById('imageLightbox');
        if (lb) return lb;

        lb = document.createElement('div');
        lb.id = 'imageLightbox';
        lb.className = 'img-lightbox';
        lb.innerHTML = `
            <div class="img-lightbox-content">
                <button class="img-close" aria-label="Close">&times;</button>
                <div class="img-lightbox-wrapper">
                    <img src="" alt="" style="display:none;">
                    <iframe src="" frameborder="0" style="display:none;" title="PDF viewer"></iframe>
                    <div class="img-lightbox-info">
                        <h3></h3>
                        <p></p>
                    </div>
                </div>
            </div>`;

        document.body.appendChild(lb);

        lb.addEventListener('click', (ev) => {
            // Close when clicking overlay or close button
            if (ev.target === lb || ev.target.classList.contains('img-close')) {
                lb.style.display = 'none';
                const img = lb.querySelector('img');
                const iframe = lb.querySelector('iframe');
                img.src = '';
                img.alt = '';
                iframe.src = '';
                lb.querySelector('h3').textContent = '';
                lb.querySelector('p').textContent = '';
                img.style.display = 'none';
                iframe.style.display = 'none';
            }
        });

        window.addEventListener('keydown', (ev) => {
            if (ev.key === 'Escape' && lb.style.display === 'flex') {
                lb.style.display = 'none';
            }
        });

        return lb;
    }

    document.addEventListener('click', (ev) => {
        const clicked = ev.target.closest ? ev.target.closest('.product-img') : null;
        if (!clicked) return;

        const src = clicked.getAttribute('src');
        const alt = clicked.getAttribute('alt') || '';
        const title = clicked.getAttribute('data-title') || '';
        const desc = clicked.getAttribute('data-desc') || '';
        const pdf = clicked.getAttribute('data-pdf') || '';
        const lb = createImageLightbox();
        const img = lb.querySelector('img');
        const iframe = lb.querySelector('iframe');

        // If a PDF is specified, show it in the iframe, otherwise show the image
        if (pdf) {
            iframe.src = pdf;
            iframe.style.display = 'block';
            img.style.display = 'none';
        } else {
            img.src = src;
            img.alt = alt;
            img.style.display = 'block';
            iframe.style.display = 'none';
        }

        lb.querySelector('h3').textContent = title;
        lb.querySelector('p').textContent = desc;
        lb.style.display = 'flex';
    });
});