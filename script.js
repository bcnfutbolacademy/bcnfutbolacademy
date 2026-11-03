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
    indhg: {   // Individual · Hocker Grove MS (outdoor)
        '4': 'https://buy.stripe.com/fZu00i52y2aR7eo5ym3AY0q',
        '8': 'https://buy.stripe.com/bJebJ08eK2aReGQe4S3AY0r'
    },
    indapc: {  // Individual · Atletas Performance Center (indoor)
        '4': 'https://buy.stripe.com/9B628q52yg1HcyIe4S3AY0s',
        '8': 'https://buy.stripe.com/fZu14m66C2aR7eo2ma3AY0t'
    },
    winteru8: {
        '6':         'https://buy.stripe.com/8x27sK0MieXD8ise4S3AY0g',
        '11':        'https://buy.stripe.com/28E00ifHc7vb1U44ui3AY0h',
        '22':        'https://buy.stripe.com/6oU4gydz4g1HdCMgd03AY0i',
        'unlimited': 'https://buy.stripe.com/cNi28q0Mig1HgOY6Cq3AY0j'
    },
    winteru13: {
        '6':         'https://buy.stripe.com/5kQbJ08eKaHnaqAf8W3AY0k',
        '11':        'https://buy.stripe.com/7sY4gy52ycPvcyI0e23AY0l',
        '22':        'https://buy.stripe.com/fZu3cu7aG9Dj9mw8Ky3AY0m',
        'unlimited': 'https://buy.stripe.com/bJe3cu66CaHnfKUbWK3AY0n'
    },
    winterrec: {
        '5':  'https://buy.stripe.com/3cIfZg2Uq3eV9mwf8W3AY0o',
        '10': 'https://buy.stripe.com/bJe9ASgLgbLrgOY9OC3AY0p'
    },
    // Retired from the website (kept for reference)
    preseason: {
        '5':         'https://buy.stripe.com/eVq6oG9iOcPv42c2ma3AY0b',
        '10':         'https://buy.stripe.com/aFa7sKeD8bLrbuEaSG3AY0c',
        '20':        'https://buy.stripe.com/aFadR81Qm3eV8isf8W3AY0d',
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
