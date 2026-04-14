// BCN Fútbol Academy — script.js

// Stripe Payment Links
const STRIPE_LINKS = {
    individual: {
        '4':  'https://buy.stripe.com/6oU5kC7aG7vb0Q0e4S3AY00',
        '8':  'https://buy.stripe.com/14A14m1QmeXD7eo6Cq3AY01',
        '12': 'https://buy.stripe.com/3cI3cu8eK4iZ56ggd03AY02',
        '16': 'https://buy.stripe.com/9B6fZgdz44iZ56g4ui3AY03'
    },
    group: {
        '4':  'https://buy.stripe.com/6oU5kC9iO5n342ce4S3AY04',
        '8':  'https://buy.stripe.com/14AfZg66C6r756ge4S3AY05',
        '12': 'https://buy.stripe.com/4gMbJ08eK9Dj6ak3qe3AY06',
        '16': 'https://buy.stripe.com/7sY8wOamScPvdCM9OC3AY07'
    },
    summer: {
        '4':         'https://buy.stripe.com/bJedR8amSbLr1U40e23AY08',
        '8':         'https://buy.stripe.com/bJeeVc3Yu16N2Y85ym3AY09',
        'unlimited': 'https://buy.stripe.com/8x214meD84iZfKUf8W3AY0a',
        'payg':      'https://buy.stripe.com/7sYfZgcv09Dj6ak1i63AY0f'
    },
    preseason: {
        '4':         'https://buy.stripe.com/eVq6oG9iOcPv42c2ma3AY0b',
        '8':         'https://buy.stripe.com/aFa7sKeD8bLrbuEaSG3AY0c',
        '12':        'https://buy.stripe.com/aFadR81Qm3eV8isf8W3AY0d',
        'unlimited': 'https://buy.stripe.com/aFacN49iO02JbuEaSG3AY0e'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeSmoothScrolling();
});

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            const isExpanded = !mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            document.body.style.overflow = !isExpanded ? 'hidden' : '';
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', function(event) {
            if (!mobileMenu.classList.contains('hidden') &&
                !mobileMenu.contains(event.target) &&
                !mobileMenuButton.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
}

// Smooth scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}