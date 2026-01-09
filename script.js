document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobileMenu');
    const navWrapper = document.getElementById('navWrapper');
    const mainContent = document.getElementById('mainContent');
    const loginBtn = document.getElementById('loginBtn');

    // Clinic locations and addresses mapping
    const CLINIC_LOCATIONS = {
        'ALBAY TOWNS': ['CAMLIG RHU', 'GUINABATAN RHU', 'LIGAO CITY CHU', 'POLANGUI RHU', 'ENCISCO CLINIC', 'APILAN CLINIC', 'MUNOZ CLINIC', 'GMH', 'ZMI'],
        'LEGAZPI': ['BRHMC', 'USTLH', 'EMH', 'DDH', 'ACE', 'CENTRAL LINK', 'WONG CLINIC', 'TGH', 'DARAGA RHU', 'BETHESDA INFIRMARY'],
        'TABACO': ['BUELA CLINIC', 'COPE', 'GOLEKOH', 'MMG TABACO', 'TABACO CHO', 'BILO CLINIC', 'TABACO CITY'],
        'CATANDUANES': ['NATIVIDAD CLINIC', 'SANTOS CLINIC', 'TUPLANO CLINIC', 'BALMADRID CLINIC', 'VIRAC MEDICAL CENTER', 'CDHI', 'HEALTHLINE', 'LAMBAN CLINIC', 'VENTS', 'GUERRERO CLINIC']
    };

    // Store Profile Content here since we are not reloading the page anymore
    const profileContent = `
    <div class="card">
        <h3>Executive Summary</h3>
        <p class="summary-text">
            Results-driven Sales Service Executive with experience in client engagement, product presentation, and sales support within the pharmaceutical industry. Skilled in building professional relationships, coordinating with healthcare partners, and representing the GX International brand with integrity and confidence.
        </p>
    </div>`;

    // Helper for login state
    function isLoggedIn() {
        return localStorage.getItem('gx_logged_in') === 'true';
    }

    function setLoggedIn(val) {
        localStorage.setItem('gx_logged_in', val ? 'true' : 'false');
    }

    // 1. Mobile Menu Toggle
    mobileMenu.addEventListener('click', () => {
        navWrapper.classList.toggle('active');
    });

    // 2. Navigation Content Logic
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const section = link.getAttribute('data-section');

            // Only prevent default and handle section switching if data-section exists
            if (section) {
                e.preventDefault();
                updateContent(section);
                navWrapper.classList.remove('active'); // Close menu on mobile
            }
        });
    });

    // Auth-only nav helpers
    function showAuthLinks() {
        document.querySelectorAll('.auth-only').forEach(el => el.style.display = 'inline-block');
    }

    function hideAuthLinks() {
        document.querySelectorAll('.auth-only').forEach(el => el.style.display = 'none');
    }

    function updateContent(section) {
        const mainContent = document.getElementById('mainContent');

        // Always hide the places section by default when switching content
        const placesSec = document.getElementById('placesSection');
        if (placesSec) placesSec.style.display = 'none';

        if (section === 'products') {
            // --- PRODUCTS LIST WITH CUSTOM COLORS ---
            const products = [
                { 
                    img: 'img/product 1.jpg', 
                    images: [], 
                    pdf: '', 
                    title: '(TELSTAR) Telmisartan 40mg / 80mg', 
                    desc: 'N/A',
                    color: '#1703f9ff' 
                },
                { 
                    img: 'img/ROVASTIN/4.jpg', 
                    images: ['img/ROVASTIN/1.jpg', 'img/ROVASTIN/2.jpg', 'img/ROVASTIN/3.jpg', 'img/ROVASTIN/4.jpg', 'img/ROVASTIN/5.jpg'], 
                    pdf: 'productspdf/ROVASTIN_DL.pdf', 
                    title: '(ROVASTIN) Rosuvastatin 10mg', 
                    desc: 'ROVASTIN is the EPIC Rosuvastatin—effective, potent, quality-assured, affordable, and convenient—proven to significantly reduce cardiovascular risk while helping patients with dyslipidemia better comply with treatment.',
                    color: '#0f00afff' 
                },
                { 
                    img: 'img/BETACARD/4.jpg', 
                    images: ['img/BETACARD/2.jpg', 'img/BETACARD/3.jpg', 'img/BETACARD/4.jpg'], 
                    pdf: 'productspdf/BETACARD_DL.pdf', 
                    title: '(BETACARD) Carvedilol 6.25mg / 25mg', 
                    desc: 'BETACARD (Carvedilol) is a trusted, bioequivalent beta-blocker proven to reduce morbidity and mortality in patients with Heart Failure and Hypertension, offering quality, efficacy, and affordability for improved patient compliance for over 17 years.',
                    color: '#e67e22' 
                },
                { 
                    img: 'img/ANOION/3.jpg', 
                    images: ['img/ANOION/1.jpg', 'img/ANOION/2.jpg', 'img/ANOION/3.jpg'], 
                    pdf: 'productspdf/ANOION.pdf', 
                    title: '(ANOION) Amiodarone Hydrochloride 200mg', 
                    desc: 'ANOION is a trusted, quality-assured, and affordable Amiodarone that helps patients with heart rhythm disorders stay in tune with life, offering over 18 years of proven efficacy and compliance support.',
                    color: '#318000ff' 
                },
                { 
                    img: 'img/product 5.jpg', 
                    images: [], 
                    pdf: '', 
                    title: '(AMLOTITAN) Amlodipine Losartan 5mg / 50mg, 5mg / 100mg', 
                    desc: 'N/A',
                    color: '#ae9700ff' 
                },
                { 
                    img: 'img/product 6.jpg', 
                    images: [], 
                    pdf: '', 
                    title: '(RILAXIA) Etoricoxib 120mg', 
                    desc: 'N/A',
                    color: '#1a4300ff' 
                },
                { 
                    img: 'img/PROTEK-GFR/3.jpg', 
                    images: ['img/PROTEK-GFR/1.jpg', 'img/PROTEK-GFR/2.jpg', 'img/PROTEK-GFR/3.jpg'], 
                    pdf: 'productspdf/PROTEK GFR_DL.pdf', 
                    title: '(PROTEK - GFR) Ketoanalogues + Essential Amino Acids', 
                    desc: 'PROTEK GFR is an affordable ketoanalogues + ESA renal nutrition therapy that, together with a low-protein diet, helps slow CKD progression, improve patient compliance, and deliver significant monthly savings while protecting kidney function.',
                    color: '#6e00a9ff' 
                },
                { 
                    img: 'img/TRYME MR.jpeg', 
                    images: ['img/TRYME_MR/1.jpg', 'img/TRYME_MR/2.jpg', 'img/TRYME_MR/3.jpg', 'img/TRYME_MR/4.jpg'], 
                    pdf: 'productspdf/TRYME MR_DL.pdf', 
                    title: '(TRYME MR) Trimetazidine HCl 35mg', 
                    desc: 'TRYME MR is the smart choice for angina management—quality-tested, bioequivalent, and affordable, helping patients save while ensuring effective heart support as the metabolic energizer of the heart.',
                    color: '#d33f00ff' 
                }
            ];

            const isMobile = window.innerWidth <= 768;
            const containerHtml = `
            <div class="card">
                <h3 style="margin-bottom: 20px;">Products Services Portfolio</h3>
                <div id="productContainer"></div>
            </div>`;

            mainContent.innerHTML = containerHtml;
            const productContainer = document.getElementById('productContainer');

            function formatTitle(title, color) {
                if (!title) return '';
                const styleAttr = color ? `style="color: ${color} !important;"` : '';
                const closingParenIndex = title.indexOf(')');
                if (closingParenIndex !== -1) {
                    const highlightPart = title.slice(0, closingParenIndex + 1);
                    const restPart = title.slice(closingParenIndex + 1);
                    return `<span class="title-highlight" ${styleAttr}>${highlightPart}</span>${restPart}`;
                }
                const firstSpaceIndex = title.indexOf(' ');
                if (firstSpaceIndex === -1) {
                    return `<span class="title-highlight" ${styleAttr}>${title}</span>`;
                }
                return `<span class="title-highlight" ${styleAttr}>${title.slice(0, firstSpaceIndex)}</span>${title.slice(firstSpaceIndex)}`;
            }

            if (!isMobile) {
                const grid = document.createElement('div');
                grid.className = 'product-grid';
                products.forEach(p => {
                    const item = document.createElement('div');
                    item.className = 'product-item';
                    const downloadBtn = p.pdf ? `<a href="${p.pdf}" download class="btn-download" title="Download PDF">📥 Download PDF</a>` : '';
                    const imagesCount = (p.images && p.images.length) ? p.images.length : 0;
                    const pdfBadge = p.pdf ? `<span class="badge pdf-badge" title="PDF available"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 2H8a2 2 0 00-2 2v4h2V4h11v16H8v-4H6v4a2 2 0 002 2h11a2 2 0 002-2V4a2 2 0 00-2-2z" fill="currentColor"/></svg></span>` : '';
                    const imgBadge = imagesCount > 1 ? `<span class="badge img-badge" title="${imagesCount} images"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14h18zM5 5h14v14H5V5zm3 9l2.5-3 3.5 4.5H8z" fill="currentColor"/></svg><span class="badge-count">${imagesCount}</span></span>` : '';

                    item.innerHTML = `
                    <div class="product-badges">${pdfBadge}${imgBadge}</div>
                    <img src="${p.img}" alt="${p.title}" class="product-img" data-title="${p.title}" data-desc="${p.desc}" data-pdf="${p.pdf}" data-images="${JSON.stringify(p.images).replace(/"/g, '&quot;')}">
                    
                    <div class="product-hint" style="font-weight:bold;">${formatTitle(p.title, p.color)}</div>
                    
                    <div class="product-info">
                        <h4>${formatTitle(p.title, p.color)}</h4>
                        <p>${p.desc}</p>
                        ${downloadBtn}
                    </div>`;
                    grid.appendChild(item);
                });
                productContainer.appendChild(grid);
                return;
            }

            // Mobile: paginate products
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
                    const imagesCount = (p.images && p.images.length) ? p.images.length : 0;
                    const pdfBadge = p.pdf ? `<span class="badge pdf-badge" title="PDF available"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 2H8a2 2 0 00-2 2v4h2V4h11v16H8v-4H6v4a2 2 0 002 2h11a2 2 0 002-2V4a2 2 0 00-2-2z" fill="currentColor"/></svg></span>` : '';
                    const imgBadge = imagesCount > 1 ? `<span class="badge img-badge" title="${imagesCount} images"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14h18zM5 5h14v14H5V5zm3 9l2.5-3 3.5 4.5H8z" fill="currentColor"/></svg><span class="badge-count">${imagesCount}</span></span>` : '';

                    item.innerHTML = `
                    <div class="product-badges">${pdfBadge}${imgBadge}</div>
                    <img src="${p.img}" alt="${p.title}" class="product-img" data-title="${p.title}" data-desc="${p.desc}" data-pdf="${p.pdf}" data-images="${JSON.stringify(p.images).replace(/"/g, '&quot;')}">
                    
                    <div class="product-hint" style="font-weight:bold;">${formatTitle(p.title, p.color)}</div>
                    
                    <div class="product-info">
                        <h4>${formatTitle(p.title, p.color)}</h4>
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
                            <div class="contact-icon" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor"/></svg></div>
                            <div class="contact-body"><strong>Address</strong><span>Daraga, Albay, Philippines</span></div>
                        </div>
                        <div class="contact-item">
                            <div class="contact-icon" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.62 10.79a15.091 15.091 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 21.5 2.5 13.93 2.5 4a1 1 0 011-1H7a1 1 0 011 1c0 1.24.2 2.45.57 3.57.14.36.04.77-.24 1.01l-2.2 2.21z" fill="currentColor"/></svg></div>
                            <div class="contact-body"><strong>Phone</strong><a href="tel:+639381236488">+63 9381236488</a></div>
                        </div>
                        <div class="contact-item">
                            <div class="contact-icon" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5L4 8V6l8 5 8-5v2z" fill="currentColor"/></svg></div>
                            <div class="contact-body"><strong>Email</strong><a href="mailto:gblovendino.gxii@gmail.com">gblovendino.gxii@gmail.com</a></div>
                        </div>
                        <div class="contact-item">
                            <div class="contact-icon" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.09 5.66 21.28 10.44 22v-7.03H8.08v-2.9h2.36V9.98c0-2.33 1.38-3.61 3.5-3.61.99 0 2.03.18 2.03.18v2.23h-1.14c-1.12 0-1.47.7-1.47 1.41v1.71h2.5l-.4 2.9h-2.1V22C18.34 21.28 22 17.09 22 12.07z" fill="currentColor"/></svg></div>
                            <div class="contact-body"><strong>Facebook</strong><a href="https://www.facebook.com/ghanel.bianca.22" target="_blank" rel="noopener">Ghanel Bianca B. Lovendino</a></div>
                        </div>
                    </div>
                    <div class="contact-panel">
                        <div class="company-card">
                            <img src="img/logo.png" alt="GX logo" class="contact-logo">
                            <p class="contact-panel-text">For partnership or product inquiries, reach us via phone or email. We typically respond within 1 business day.</p>
                            <div class="contact-ctas"><a href="tel:+639381236488" class="btn-primary">Call</a><a href="mailto:gblovendino.gxii@gmail.com" class="btn-outline">Email</a></div>
                        </div>
                    </div>
                </div>
            </div>`;
        } else if (section === 'profile') {
            // NEW: Render profile using the variable instead of reloading
            mainContent.innerHTML = profileContent;
        } else if (section === 'places') {
            document.querySelectorAll('#mainContent .card').forEach(c => c.style.display = 'none');
            const ps = document.getElementById('placesSection');
            if (ps) {
                ps.style.display = 'block';
                ps.scrollIntoView({ behavior: 'smooth' });
                renderPlaces();
            }
        } else if (section === 'saved_schedules') {
            window.location.href = 'saved_schedules.html';
        }
    }

    // 3. Login Event
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    const loginForm = document.getElementById('loginForm');

    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (isLoggedIn()) {
            setLoggedIn(false);
            loginBtn.textContent = 'Login';
            const ps = document.getElementById('placesSection'); if (ps) ps.style.display = 'none';
            hideAuthLinks();
            alert('Logged out');
            // Reload to reset view
            updateContent('products');
        } else {
            loginModal.style.display = 'block';
        }
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

    // Sign-up modal handlers
    const signupModal = document.getElementById('signupModal');
    const closeSignupModal = document.getElementById('closeSignupModal');
    const signupForm = document.getElementById('signupForm');
    const showSignupLink = document.getElementById('showSignupLink');
    const backToLoginLink = document.getElementById('backToLoginLink');

    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
        signupModal.style.display = 'block';
    });

    backToLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupModal.style.display = 'none';
        signupForm.reset();
        loginModal.style.display = 'block';
    });

    closeSignupModal.addEventListener('click', () => {
        signupModal.style.display = 'none';
        signupForm.reset();
    });

    window.addEventListener('click', (e) => {
        if (e.target === signupModal) {
            signupModal.style.display = 'none';
            signupForm.reset();
        }
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        const passwordConfirm = document.getElementById('signupPasswordConfirm').value;

        if (!name || !email || !password || !passwordConfirm) {
            alert('Please fill in all fields');
            return;
        }

        const fd = new FormData();
        fd.append('name', name);
        fd.append('email', email);
        fd.append('password', password);
        fd.append('password_confirm', passwordConfirm);

        fetch('register.php', {
            method: 'POST',
            body: fd,
            credentials: 'same-origin'
        }).then(r => r.json())
            .then(data => {
                if (data && data.success) {
                    alert(data.message);
                    signupModal.style.display = 'none';
                    signupForm.reset();
                    loginModal.style.display = 'block';
                } else {
                    alert(data && data.message ? data.message : 'Registration failed');
                }
            }).catch(err => {
                console.error('Registration error', err);
                alert('Registration request failed');
            });
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        const fd = new FormData();
        fd.append('email', email);
        fd.append('password', password);

        fetch('login.php', {
            method: 'POST',
            body: fd,
            credentials: 'same-origin'
        }).then(r => r.json())
            .then(data => {
                if (data && data.success) {
                    setLoggedIn(true);
                    loginBtn.textContent = 'Logout';
                    showAuthLinks();
                    alert('Login successful!');
                    loginModal.style.display = 'none';
                    loginForm.reset();
                } else {
                    alert(data && data.message ? data.message : 'Login failed');
                }
            }).catch(err => {
                console.error('Login error', err);
                alert('Login request failed');
            });
    });

    // Places logic (DB-backed via places.php)
    function loadPlaces() {
        return fetch('places.php?action=list', { credentials: 'same-origin' })
            .then(r => {
                if (!r.ok) {
                    throw new Error(`HTTP ${r.status}: ${r.statusText}`);
                }
                return r.text();
            })
            .then(text => {
                try {
                    return JSON.parse(text);
                } catch (e) {
                    return [];
                }
            })
            .then(data => (data && data.success) ? (data.places || []) : [])
            .catch(err => {
                console.error('Load places error:', err);
                return [];
            });
    }

    function addPlace(doctorName, clinicAddress, specialty, clinicHours, location) {
        // ... (existing addPlace logic kept same) ...
        // Note: For brevity, assuming this is existing code. 
        // If you need the full function body here let me know, but it wasn't changed.
        const fd = new FormData();
        fd.append('action', 'add');
        fd.append('doctor_name', doctorName);
        fd.append('clinic_address', clinicAddress);
        fd.append('specialty', specialty);
        fd.append('clinic_hours', clinicHours);
        fd.append('location', location);

        return fetch('places.php', { method: 'POST', body: fd, credentials: 'same-origin' })
            .then(r => r.json())
            .then(data => {
                if (data && data.success) return true;
                alert(data && data.message ? data.message : 'Failed to add place');
                return false;
            })
            .catch(err => {
                 return false; 
            });
    }

    function deletePlace(placeId) {
        const fd = new FormData();
        fd.append('action', 'delete');
        fd.append('place_id', placeId);

        return fetch('places.php', { method: 'POST', body: fd, credentials: 'same-origin' })
            .then(r => r.json())
            .then(data => {
                if (data && data.success) return true;
                alert(data && data.message ? data.message : 'Failed to delete place');
                return false;
            })
            .catch(err => {
                return false;
            });
    }

    function renderPlaces() {
        const section = document.getElementById('placesSection');
        if (!isLoggedIn()) { if (section) section.style.display = 'none'; return; }

        loadPlaces().then(list => {
            const container = document.getElementById('placeList');
            const filterInput = document.getElementById('placeListFilter');
            const filterText = filterInput ? filterInput.value.toLowerCase() : '';
            const locationFilterInput = document.getElementById('placeLocationFilter');
            const selectedLocation = locationFilterInput ? locationFilterInput.value : 'all';

            container.innerHTML = '';
            const filteredList = list.filter(it => {
                const matchesSearch = it.doctor_name.toLowerCase().includes(filterText) ||
                    it.specialty.toLowerCase().includes(filterText);
                const matchesLocation = (selectedLocation === 'all') || (it.location === selectedLocation);
                return matchesSearch && matchesLocation;
            });

            if (filteredList.length === 0) {
                container.innerHTML = '<div class="meta" style="padding:10px;">No matching places found.</div>';
                return;
            }

            filteredList.forEach((it) => {
                const el = document.createElement('div');
                el.className = 'schedule-item';
                el.innerHTML = `
                <div class="left">
                    <strong>${escapeHtml(it.doctor_name)}</strong>
                    <div class="meta">${escapeHtml(it.specialty)} · ${escapeHtml(it.clinic_address)}</div>
                    <div class="meta">Location: ${escapeHtml(it.location)} | Hours: ${escapeHtml(it.clinic_hours)}</div>
                </div>
                <div class="actions" style="display: flex; gap: 8px;">
                    <button class="btn-edit" style="background: #f39c12; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Edit</button>
                    <button class="btn-del" data-id="${it.id}">Delete</button>
                </div>`;

                el.querySelector('.btn-edit').addEventListener('click', () => {
                    document.getElementById('doctorName').value = it.doctor_name;
                    document.getElementById('location').value = it.location;
                    const locationSelect = document.getElementById('location');
                    locationSelect.dispatchEvent(new Event('change'));
                    document.getElementById('clinicAddress').value = it.clinic_address;
                    document.getElementById('specialty').value = it.specialty;
                    document.getElementById('clinicHours').value = it.clinic_hours;

                    const placeForm = document.getElementById('placeForm');
                    placeForm.dataset.editId = it.id;
                    placeForm.querySelector('button[type="submit"]').textContent = 'Update Place';
                    placeForm.scrollIntoView({ behavior: 'smooth' });
                });

                el.querySelector('.btn-del').addEventListener('click', async () => {
                    if (!confirm('Delete this place?')) return;
                    const success = await deletePlace(it.id);
                    if (success) renderPlaces();
                });

                container.appendChild(el);
            });
        });
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str).replace(/[&<>"']/g, function (s) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[s]);
        });
    }

    /* --- Filter Listeners & Form Logic --- */
    const placeForm = document.getElementById('placeForm');
    const locationSelect = document.getElementById('location');
    const clinicAddressSelect = document.getElementById('clinicAddress');

    const placeListFilter = document.getElementById('placeListFilter');
    if (placeListFilter) {
        placeListFilter.addEventListener('input', () => renderPlaces());
    }

    const placeLocationFilter = document.getElementById('placeLocationFilter');
    if (placeLocationFilter) {
        placeLocationFilter.addEventListener('change', () => renderPlaces());
    }

    if (locationSelect) {
        locationSelect.addEventListener('change', (e) => {
            const location = e.target.value;
            clinicAddressSelect.innerHTML = '<option value="">-- Select Hospital/Clinic --</option>';
            if (location && CLINIC_LOCATIONS[location]) {
                CLINIC_LOCATIONS[location].forEach(clinic => {
                    const option = document.createElement('option');
                    option.value = clinic;
                    option.textContent = clinic;
                    clinicAddressSelect.appendChild(option);
                });
            }
        });
    }

    if (placeForm) {
        placeForm.addEventListener('submit', async (ev) => {
            ev.preventDefault();
            const location = document.getElementById('location').value.trim();
            const doctorName = document.getElementById('doctorName').value.trim();
            const clinicAddress = document.getElementById('clinicAddress').value.trim();
            const specialty = document.getElementById('specialty').value.trim();
            const clinicHours = document.getElementById('clinicHours').value.trim();
            const hoursPattern = /^(M|T|W|Th|F|Sa|Su)(-(M|T|W|Th|F|Sa|Su))?\s+\d{1,2}(?::\d{2})?\s*-\s*\d{1,2}(?::\d{2})?$/i;

            if (!hoursPattern.test(clinicHours)) {
                alert('Clinic hours must match formats like "M-F 8-12" or "M 7-12" using day initials.');
                return;
            }

            if (!location || !doctorName || !clinicAddress || !specialty || !clinicHours) {
                alert('Please fill all place fields');
                return;
            }

            const editId = placeForm.dataset.editId;
            const fd = new FormData();
            if (editId) {
                fd.append('action', 'update');
                fd.append('place_id', editId);
            } else {
                fd.append('action', 'add');
            }

            fd.append('doctor_name', doctorName);
            fd.append('clinic_address', clinicAddress);
            fd.append('specialty', specialty);
            fd.append('clinic_hours', clinicHours);
            fd.append('location', location);

            try {
                const response = await fetch('places.php', { method: 'POST', body: fd, credentials: 'same-origin' });
                const data = await response.json();

                if (data && data.success) {
                    alert(editId ? 'Place updated!' : 'Place added!');
                    placeForm.reset();
                    delete placeForm.dataset.editId;
                    placeForm.querySelector('button[type="submit"]').textContent = 'Add Place';
                    clinicAddressSelect.innerHTML = '<option value="">-- Select Hospital/Clinic --</option>';
                    renderPlaces();
                } else {
                    alert(data.message || 'Operation failed');
                }
            } catch (err) {
                console.error('Error:', err);
            }
        });
    }

    const clearBtn = document.getElementById('clearPlaces');
    if (clearBtn) {
        clearBtn.addEventListener('click', async () => {
            if (!confirm('Clear all saved places?')) return;
            const list = await loadPlaces();
            for (let item of list) {
                await deletePlace(item.id);
            }
            renderPlaces();
        });
    }

    if (isLoggedIn()) {
        loginBtn.textContent = 'Logout';
        showAuthLinks();
    }

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

        if (!images || images.length === 0) images = [productImage];

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

    // --- TRIGGER DEFAULT PAGE ---
    // Load products by default instead of the profile
    updateContent('products');
});