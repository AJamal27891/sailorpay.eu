// Footer Loader - Loads centralized footer across all pages
document.addEventListener('DOMContentLoaded', function() {
    // Function to load footer
    function loadFooter() {
        const footerContainer = document.getElementById('footer-container');
        if (!footerContainer) {
            console.warn('Footer container not found');
            return;
        }

        // Determine the correct path based on current page location
        const currentPath = window.location.pathname;
        const isInSubfolder = currentPath.includes('/') && currentPath !== '/';
        const footerPath = isInSubfolder ? '../includes/footer.html' : 'includes/footer.html';

        // Try to fetch footer, fallback to static if it fails
        fetch(footerPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                footerContainer.innerHTML = html;

                // Trigger any footer-specific JavaScript after loading
                initializeFooterFeatures();
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                console.warn('Falling back to static footer');
                // Fallback: load static footer
                loadFallbackFooter();
            });
    }

    // Function to load fallback footer for static hosting
    function loadFallbackFooter() {
        const footerContainer = document.getElementById('footer-container');
        if (!footerContainer) return;

        // Create static footer HTML
        const footerHTML = `
            <footer id="colophon" class="site-footer">
                <section class="footer-menus">
                    <div class="wrapper">
                        <div class="row fade-in">
                            <div class="col col-2">
                                <span class="widget-title">Company</span>
                                <ul class="menu">
                                    <li class="menu-item"><a href="index.html">Home</a></li>
                                    <li class="menu-item"><a href="services.html">Services</a></li>
                                    <li class="menu-item"><a href="contact.html">Contact Us</a></li>
                                </ul>

                                <span class="widget-title">Customer Care</span>
                                <ul class="menu">
                                    <li class="menu-item"><a href="contact.html">Support</a></li>
                                    <li class="menu-item"><a href="https://wa.me/436763395055" target="_blank">WhatsApp</a></li>
                                </ul>
                            </div>

                            <div class="col col-2">
                                <span class="widget-title">Products</span>
                                <ul class="menu">
                                    <li class="menu-item"><a href="services.html#merchant-account">Merchant Account Setup</a></li>
                                    <li class="menu-item"><a href="https://xolvispay.paymentsandbox.cloud/documentation/apiv3?php" target="_blank">Payment Gateway</a></li>
                                    <li class="menu-item"><a href="https://xolvis.com/xolvis-pay-features/" target="_blank">Payment Orchestration</a></li>
                                </ul>
                            </div>

                            <div class="col col-2">
                                <span class="widget-title">Payment Methods</span>
                                <ul class="menu">
                                    <li class="menu-item"><a href="services.html#payment-methods">Credit Cards</a></li>
                                    <li class="menu-item"><a href="services.html#payment-methods">Debit Cards</a></li>
                                    <li class="menu-item"><a href="services.html#payment-methods">Alternative Payments</a></li>
                                </ul>
                            </div>

                            <div class="col col-2">
                                <span class="widget-title">Industries</span>
                                <ul class="menu">
                                    <li class="menu-item"><a href="services.html">E-commerce</a></li>
                                    <li class="menu-item"><a href="services.html">Retail</a></li>
                                    <li class="menu-item"><a href="services.html">Travel</a></li>
                                    <li class="menu-item"><a href="services.html">Digital Services</a></li>
                                    <li class="menu-item"><a href="services.html">Other Industries</a></li>
                                </ul>
                            </div>

                            <div class="col col-2">
                                <span class="widget-title">Resources</span>
                                <ul class="menu">
                                    <li class="menu-item"><a href="#">API Documentation</a></li>
                                    <li class="menu-item"><a href="#">Integration Guides</a></li>
                                    <li class="menu-item"><a href="services.html#secure-transactions">PCI Compliance</a></li>
                                </ul>

                                <span class="widget-title">Legal</span>
                                <ul class="menu">
                                    <li class="menu-item"><a href="privacy-policy.html">Privacy Policy</a></li>
                                    <li class="menu-item"><a href="https://policies.google.com/terms" target="_blank">Terms of Service</a></li>
                                    <li class="menu-item"><a href="imprint.html">Imprint</a></li>
                                    <li class="menu-item"><a href="#">AML Policy</a></li>
                                </ul>
                            </div>

                            <div class="col col-2">
                                <span class="widget-title">Partnership</span>
                                <ul class="menu">
                                    <li class="menu-item"><a href="#" title="Coming Soon">Referral Program</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="footer-bottom">
                    <div class="wrapper">
                        <div class="footer-main">
                            <div class="footer-left">
                                <a class="footer-logo" href="index.html">
                                    <img src="images/logo-footer.png" alt="SailorPay" width="150">
                                </a>
                            </div>
                            <div class="footer-center">
                                <div class="payment-logos">
                                    <img src="images/visa-logo.png" alt="Visa" class="payment-logo-img">
                                    <img src="images/mastercard-logo.png" alt="Mastercard" class="payment-logo-img">
                                    <img src="images/pci-logo.png" alt="PCI DSS Compliant" class="payment-logo-img">
                                    <img src="images/gdbr-logo.png" alt="GDPR" class="payment-logo-img">
                                </div>
                            </div>
                            <div class="footer-right">
                                <div class="footer-contact-info">
                                    <a href="mailto:office@sailorpay.eu" class="email-link"><i class="fas fa-envelope"></i></a>
                                    <a href="https://www.linkedin.com/company/sailorpay" target="_blank" class="linkedin-link"><i class="fab fa-linkedin-in"></i></a>
                                    <a href="https://wa.me/436763395055" target="_blank" class="whatsapp-link"><i class="fab fa-whatsapp"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="footer-bottom">
                            <p class="disclaimer">&copy; 2023 SailorPay. All Rights Reserved. SailorPay is a registered payment service provider.</p>
                        </div>
                    </div>
                </section>
            </footer>
        `;

        footerContainer.innerHTML = footerHTML;

        // Initialize footer features after loading
        initializeFooterFeatures();
    }

    // Initialize footer-specific features after loading
    function initializeFooterFeatures() {
        // Add any footer-specific JavaScript here
        // For example, analytics tracking, hover effects, etc.
        
        // Add fade-in animation if not already present
        const footerMenus = document.querySelector('.footer-menus .row');
        if (footerMenus && !footerMenus.classList.contains('fade-in')) {
            footerMenus.classList.add('fade-in');
        }
    }

    // Load the footer
    loadFooter();
});

// Alternative method using XMLHttpRequest for better browser compatibility
function loadFooterXHR() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;

    const xhr = new XMLHttpRequest();
    const currentPath = window.location.pathname;
    const isInSubfolder = currentPath.includes('/') && currentPath !== '/';
    const footerPath = isInSubfolder ? '../includes/footer.html' : 'includes/footer.html';

    xhr.open('GET', footerPath, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                footerContainer.innerHTML = xhr.responseText;
                initializeFooterFeatures();
            } else {
                console.error('Error loading footer:', xhr.status);
                footerContainer.innerHTML = '<footer><p>Footer could not be loaded.</p></footer>';
            }
        }
    };
    xhr.send();
}
