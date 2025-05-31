// Google Translate initialization function (global scope)
function googleTranslateElementInit() {
    console.log('👉 googleTranslateElementInit() called');
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,fr,de,es',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element_hidden');
}

// Navbar Loader - Loads centralized navbar across all pages
document.addEventListener('DOMContentLoaded', function() {
    // Function to load navbar
    function loadNavbar() {
        const navbarContainer = document.getElementById('navbar-container');
        if (!navbarContainer) {
            console.warn('Navbar container not found');
            return;
        }

        // Determine the correct path based on current page location
        const currentPath = window.location.pathname;
        const isInSubfolder = currentPath.includes('/') && currentPath !== '/';
        const navbarPath = isInSubfolder ? '../includes/navbar.html' : 'includes/navbar.html';

        // Try to fetch navbar, fallback to static if it fails
        fetch(navbarPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                navbarContainer.innerHTML = html;

                // Initialize navbar features after loading
                initializeNavbarFeatures();

                // Initialize Language Switcher
                initializeLanguageSwitcher();
            })
            .catch(error => {
                console.error('Error loading navbar:', error);
                console.warn('Falling back to static navbar');
                // Fallback: load static navbar
                loadFallbackNavbar();
            });
    }

    // Function to load fallback navbar for static hosting
    function loadFallbackNavbar() {
        const navbarContainer = document.getElementById('navbar-container');
        if (!navbarContainer) return;

        // Create static navbar HTML
        const navbarHTML = `
            <header id="masthead" class="site-header">
                <div class="wrapper header-wrapper">
                    <div class="site-branding">
                        <a href="index.html">
                            <img src="images/logo.png" alt="SailorPay" width="150" height="50">
                        </a>
                    </div>

                    <div class="header-contact-info">
                        <!-- Professional Language Switcher -->
                        <div class="language-switcher">
                            <button class="language-btn" id="language-toggle" title="Select Language">
                                <i class="fas fa-globe"></i>
                                <span class="current-lang">EN</span>
                                <i class="fas fa-chevron-down"></i>
                            </button>
                            <div class="language-dropdown" id="language-dropdown">
                                <a href="#" data-lang="en" class="lang-option active">
                                    <span class="flag-icon">🇬🇧</span>
                                    <span class="lang-text">English</span>
                                </a>
                                <a href="#" data-lang="fr" class="lang-option">
                                    <span class="flag-icon">🇫🇷</span>
                                    <span class="lang-text">Français</span>
                                </a>
                                <a href="#" data-lang="de" class="lang-option">
                                    <span class="flag-icon">🇩🇪</span>
                                    <span class="lang-text">Deutsch</span>
                                </a>
                                <a href="#" data-lang="es" class="lang-option">
                                    <span class="flag-icon">🇪🇸</span>
                                    <span class="lang-text">Español</span>
                                </a>
                            </div>
                        </div>

                        <a href="mailto:office@sailorpay.eu" class="email-link" title="Email us">
                            <i class="fas fa-envelope"></i>
                        </a>
                        <a href="https://www.linkedin.com/company/sailorpay" target="_blank" class="linkedin-link" title="Follow us on LinkedIn">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <button type="button" aria-label="Menu" aria-controls="navigation" class="hamburger hamburger--spin" id="menu-toggle">
                            <span class="hamburger-box">
                                <span class="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>

                    <nav id="site-navigation" class="main-navigation">
                        <ul id="primary-menu" class="menu">
                            <li class="menu-item" data-page="index"><a href="index.html">Home</a></li>
                            <li class="menu-item has-dropdown" data-page="services">
                                <a href="services.html">Services <i class="fas fa-chevron-down"></i></a>
                                <ul class="sub-menu">
                                    <li class="menu-item"><a href="services.html#merchant-account">Merchant Account Setup</a></li>
                                    <li class="menu-item"><a href="services.html#payment-gateway">Payment Gateway</a></li>
                                    <li class="menu-item"><a href="services.html#payment-orchestration">Payment Orchestration</a></li>
                                    <li class="menu-item"><a href="services.html#banking-services">Banking Services</a></li>
                                    <li class="menu-item"><a href="services.html#compliance">Compliance & Security</a></li>
                                    <li class="menu-item"><a href="services.html#support">24/7 Support</a></li>
                                </ul>
                            </li>
                            <li class="menu-item" data-page="company"><a href="company.html">Company</a></li>
                            <li class="menu-item" data-page="contact"><a href="contact.html">Contact</a></li>
                        </ul>
                    </nav>
                </div>

                <div class="mobile-menu" id="mobile-menu" style="left: -210px;">
                    <ul class="menu">
                        <li class="menu-item" data-page="index"><a href="index.html">Home</a></li>
                        <li class="menu-item has-dropdown" data-page="services">
                            <a href="services.html">Services <i class="fas fa-chevron-down"></i></a>
                            <ul class="sub-menu">
                                <li class="menu-item"><a href="services.html#merchant-account">Merchant Account Setup</a></li>
                                <li class="menu-item"><a href="services.html#payment-gateway">Payment Gateway</a></li>
                                <li class="menu-item"><a href="services.html#payment-orchestration">Payment Orchestration</a></li>
                                <li class="menu-item"><a href="services.html#banking-services">Banking Services</a></li>
                                <li class="menu-item"><a href="services.html#payment-methods">Payment Methods</a></li>
                                <li class="menu-item"><a href="services.html#pos">POS</a></li>
                            </ul>
                        </li>
                        <li class="menu-item" data-page="company"><a href="company.html">Company</a></li>
                        <li class="menu-item" data-page="contact"><a href="contact.html">Contact</a></li>
                    </ul>
                </div>
            </header>
        `;

        navbarContainer.innerHTML = navbarHTML;

        // Initialize navbar features after loading
        initializeNavbarFeatures();

        // Initialize Language Switcher
        initializeLanguageSwitcher();
    }

    // Function to initialize navbar features
    function initializeNavbarFeatures() {
        // Set active menu item based on current page
        setActiveMenuItem();
        
        // Initialize hamburger menu functionality
        initializeHamburgerMenu();
        
        // Initialize mobile menu close functionality
        initializeMobileMenuClose();
        
        // Initialize scroll effects if needed
        initializeScrollEffects();
    }

    // Function to set active menu item
    function setActiveMenuItem() {
        const currentPage = getCurrentPageName();
        const menuItems = document.querySelectorAll('.menu-item[data-page]');
        
        menuItems.forEach(item => {
            const pageName = item.getAttribute('data-page');
            if (pageName === currentPage) {
                item.classList.add('current-menu-item');
            } else {
                item.classList.remove('current-menu-item');
            }
        });
    }

    // Function to get current page name
    function getCurrentPageName() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        
        if (filename === '' || filename === 'index.html') {
            return 'index';
        }
        
        return filename.replace('.html', '');
    }

    // Function to initialize hamburger menu
    function initializeHamburgerMenu() {
        const menuToggle = document.querySelector('.hamburger');
        const mobileMenu = document.getElementById('mobile-menu');

        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                menuToggle.classList.toggle('is-active');

                // Directly manipulate the style for better compatibility
                if (mobileMenu.style.left === '-210px' || mobileMenu.style.left === '') {
                    mobileMenu.style.left = '0';
                    mobileMenu.style.opacity = '1';
                    mobileMenu.style.visibility = 'visible';
                    mobileMenu.classList.add('active');
                    document.body.classList.add('menu-open'); // Prevent body scrolling
                } else {
                    mobileMenu.style.left = '-210px';
                    mobileMenu.style.opacity = '0';
                    mobileMenu.style.visibility = 'hidden';
                    mobileMenu.classList.remove('active');
                    document.body.classList.remove('menu-open'); // Re-enable body scrolling
                }
            });
        }
    }

    // Function to initialize mobile menu close functionality
    function initializeMobileMenuClose() {
        const menuToggle = document.querySelector('.hamburger');
        const mobileMenu = document.getElementById('mobile-menu');

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (mobileMenu && mobileMenu.classList.contains('active') &&
                !mobileMenu.contains(event.target) &&
                !menuToggle.contains(event.target)) {
                mobileMenu.style.left = '-210px';
                mobileMenu.style.opacity = '0';
                mobileMenu.style.visibility = 'hidden';
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('is-active');
                document.body.classList.remove('menu-open'); // Re-enable body scrolling
            }
        });

        // Initialize mobile dropdown menu functionality
        const mobileMenuItems = document.querySelectorAll('.mobile-menu ul li.has-dropdown');

        mobileMenuItems.forEach(function(item) {
            const link = item.querySelector('a');
            const submenu = item.querySelector('.sub-menu');

            if (link && submenu) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Toggle active class
                    item.classList.toggle('active');

                    // Close other open dropdowns
                    mobileMenuItems.forEach(function(otherItem) {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                });
            }
        });
    }

    // Function to initialize scroll effects
    function initializeScrollEffects() {
        const header = document.querySelector('.site-header');
        if (!header) return;

        let scrollTimer;
        let lastScrollTop = 0;

        function handleScroll() {
            const currentScrollTop = window.scrollY;

            // Only trigger the animation when scrolling down past the threshold
            if (currentScrollTop > 50 && currentScrollTop > lastScrollTop) {
                if (!header.classList.contains('scrolled')) {
                    header.classList.add('scrolled');
                }
            } else if (currentScrollTop < 30 || currentScrollTop < lastScrollTop) {
                if (header.classList.contains('scrolled')) {
                    header.classList.remove('scrolled');
                }
            }

            lastScrollTop = currentScrollTop;
        }

        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(handleScroll, 10);
        });
    }

    // Function to initialize Professional Language Switcher
    function initializeLanguageSwitcher() {
        const languageToggle = document.getElementById('language-toggle');
        const languageDropdown = document.getElementById('language-dropdown');
        const langOptions = document.querySelectorAll('.lang-option');
        const currentLangSpan = document.querySelector('.current-lang');

        if (!languageToggle || !languageDropdown) return;

        // Toggle dropdown visibility
        languageToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            languageDropdown.classList.toggle('active');
            languageToggle.classList.toggle('active');
        });

        // Handle language selection
        langOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                const selectedLang = this.getAttribute('data-lang');
                console.log(`🌐 User selected language: ${selectedLang}`);

                // Update current language display
                currentLangSpan.textContent = selectedLang.toUpperCase();

                // Update active state
                langOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');

                // Close dropdown
                languageDropdown.classList.remove('active');
                languageToggle.classList.remove('active');

                // Call the trigger with logging
                triggerGoogleTranslate(selectedLang);

                // Store language preference
                localStorage.setItem('selectedLanguage', selectedLang);
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (
                !languageToggle.contains(e.target) &&
                !languageDropdown.contains(e.target)
            ) {
                languageDropdown.classList.remove('active');
                languageToggle.classList.remove('active');
            }
        });

        // Load saved language preference
        const savedLang = localStorage.getItem('selectedLanguage');
        if (savedLang && savedLang !== 'en') {
            console.log(`🔁 Restoring saved language: ${savedLang}`);
            const savedOption = document.querySelector(`[data-lang="${savedLang}"]`);
            if (savedOption) {
                savedOption.click();
            }
        }

        // Initialize Google Translate in the background
        loadGoogleTranslateScript();
    }

    // Function to trigger Google Translate
    function triggerGoogleTranslate(langCode) {
        console.log(`⏳ Attempting to trigger Translate for: ${langCode}`);
        let attempts = 0;

        function trySet() {
            const combo = document.querySelector(
                '#google_translate_element_hidden select.goog-te-combo'
            );
            if (combo) {
                console.log('✅ Found goog-te-combo, setting value');
                combo.value = langCode;
                combo.dispatchEvent(new Event('change'));
                console.log(`✅ Triggered translation to "${langCode}"`);
                return;
            }
            attempts++;
            if (attempts < 5) {
                console.log(`⚙️ goog-te-combo not found; retrying (${attempts})...`);
                setTimeout(trySet, 200);
            } else {
                console.warn('⚠️ Could not find goog-te-combo after multiple attempts');
            }
        }
        trySet();
    }

    // Function to load Google Translate script in background
    function loadGoogleTranslateScript() {
        if (!window.google || !window.google.translate) {
            console.log('📥 Loading Google Translate library...');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            document.head.appendChild(script);
        } else {
            console.log('▶️ Google Translate library already loaded');
        }
    }

    // Load the navbar
    loadNavbar();
});
