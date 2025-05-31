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

        // Check if we're on GitHub Pages or similar static hosting
        const isGitHubPages = window.location.hostname.includes('github.io') ||
                             window.location.hostname.includes('githubusercontent.com') ||
                             window.location.protocol === 'file:';

        if (isGitHubPages) {
            console.warn('Static hosting detected - using fallback navbar');
            loadFallbackNavbar();
            return;
        }

        // Fetch and load navbar
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
                            <li class="menu-item" data-page="imprint"><a href="imprint.html">Imprint</a></li>
                            <li class="menu-item" data-page="privacy-policy"><a href="privacy-policy.html">Privacy Policy</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        `;

        navbarContainer.innerHTML = navbarHTML;

        // Initialize navbar features after loading
        initializeNavbarFeatures();
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

    // Load the navbar
    loadNavbar();
});

// Alternative method using XMLHttpRequest for better browser compatibility
function loadNavbarXHR() {
    const navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) return;

    const xhr = new XMLHttpRequest();
    const currentPath = window.location.pathname;
    const isInSubfolder = currentPath.includes('/') && currentPath !== '/';
    const navbarPath = isInSubfolder ? '../includes/navbar.html' : 'includes/navbar.html';

    xhr.open('GET', navbarPath, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                navbarContainer.innerHTML = xhr.responseText;
                initializeNavbarFeatures();
            } else {
                console.error('Error loading navbar:', xhr.status);
                navbarContainer.innerHTML = '<header><p>Navbar could not be loaded.</p></header>';
            }
        }
    };
    xhr.send();
}
