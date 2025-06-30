// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
    disable: window.innerWidth < 768
});

// Mobile menu elements
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

// Back to top button
const backToTopButton = document.getElementById('back-to-top');

// Initialize only if elements exist
if (mobileMenuButton && mobileMenu) {
    // Mobile menu toggle
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        mobileMenuButton.setAttribute('aria-expanded', !mobileMenu.classList.contains('hidden'));
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
    });
}

// Digital clock
function updateClock() {
    const clockElement = document.getElementById('digitalClock');
    if (clockElement) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

if (document.getElementById('digitalClock')) {
    setInterval(updateClock, 1000);
    updateClock();
}

// Back to top button functionality
if (backToTopButton) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.remove('opacity-100', 'visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Rotating words animation
let rotateInterval;
function rotateWords() {
    const words = document.querySelectorAll('.rotate-words b');
    if (words.length === 0) return;

    let currentWord = 0;
    words[0].classList.add('is-visible');

    rotateInterval = setInterval(() => {
        words.forEach(word => word.classList.remove('is-visible'));
        currentWord = (currentWord + 1) % words.length;
        words[currentWord].classList.add('is-visible');
    }, 4000);
}

// Highlight active page
function highlightActiveTab() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const tabs = {
        'index.html': 'home-tab',
        'cleaning.html': 'cleaning-tab',
        'transport.html': 'transport-tab',
        'elderly-care.html': 'care-tab',
        'contact.html': 'contact-tab'
    };

    const activeTabId = tabs[currentPage];
    if (activeTabId) {
        const activeTab = document.getElementById(activeTabId);
        if (activeTab) {
            activeTab.classList.add('bg-blue-50', 'text-blue-600');
            activeTab.classList.remove('hover:bg-blue-50', 'hover:text-blue-600', 'text-gray-700');
            
            const icon = activeTab.querySelector('i');
            if (icon) {
                icon.classList.add('text-blue-600');
                icon.classList.remove('text-blue-400');
            }
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    rotateWords();
    highlightActiveTab();

    if (window.innerWidth < 768) {
        document.body.classList.add('no-animations');
    }
});

// Cleanup on window unload
window.addEventListener('beforeunload', function() {
    if (rotateInterval) {
        clearInterval(rotateInterval);
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
        document.body.classList.remove('no-animations');
    } else {
        document.body.classList.add('no-animations');
    }
});