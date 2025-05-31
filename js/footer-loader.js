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

        // Fetch and load footer
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
                // Fallback: show a basic footer message
                footerContainer.innerHTML = '<footer><p>Footer could not be loaded.</p></footer>';
            });
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
