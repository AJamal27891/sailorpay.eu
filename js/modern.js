// Modern interactions for SailorPay Improved

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky header - with null check for dynamic loading
    function initStickyHeader() {
        const header = document.querySelector('.site-header');
        if (!header) {
            // Header not loaded yet, try again in a moment
            setTimeout(initStickyHeader, 100);
            return;
        }

        const headerHeight = header.offsetHeight;

        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }

    // Initialize sticky header
    initStickyHeader();

    // Mobile menu functionality is now handled by navbar-loader.js

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.fade-in, .slide-up, .slide-in-left, .slide-in-right');

    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;

            // Check if element is in viewport
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    }

    // Initial check
    checkIfInView();

    // Check on scroll
    window.addEventListener('scroll', checkIfInView);

    // Button hover effect
    const buttons = document.querySelectorAll('.button');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const x = e.clientX - button.getBoundingClientRect().left;
            const y = e.clientY - button.getBoundingClientRect().top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });

    // Form validation
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;

            // Check required fields
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');

                    // Add error message if not exists
                    let errorMessage = field.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMessage, field.nextSibling);
                    }
                } else {
                    field.classList.remove('error');

                    // Remove error message if exists
                    const errorMessage = field.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.remove();
                    }
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });
    });
});
