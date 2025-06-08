
// Combined JavaScript for BCN Futbol Academy Booking System
// Merges the best features from both versions while maintaining simplicity and reliability

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded - initializing BCN Futbol Academy booking system');
    
    // Browser compatibility and feature detection
    initializeBrowserSupport();
    
    // Initialize all components
    initializeMobileMenu();
    initializePricingTabs();
    initializeBookingSystem();
    initializeSmoothScrolling();
    
    // Check for existing booking in URL on page load
    checkForExistingBooking();
});

// Browser compatibility and feature detection
function initializeBrowserSupport() {
    // Add polyfills for older browsers
    addPolyfills();
    
    // Detect critical features
    const features = detectFeatures();
    
    // Show warnings for missing critical features
    if (!features.localStorage) {
        showCompatibilityWarning('localStorage');
    }
    
    return features;
}

function addPolyfills() {
    // Polyfill for Element.closest
    if (!Element.prototype.closest) {
        Element.prototype.closest = function(s) {
            var el = this;
            do {
                if (el.matches(s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }
    
    // Polyfill for Element.matches
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || 
                                    Element.prototype.webkitMatchesSelector;
    }
    
    // Polyfill for NodeList.forEach
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }
}

function detectFeatures() {
    const features = {
        localStorage: false,
        json: false,
        postMessage: false
    };
    
    // Test localStorage
    try {
        const testKey = 'test_localStorage';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        features.localStorage = true;
    } catch (e) {
        console.warn('localStorage not supported:', e);
    }
    
    // Test JSON
    if (typeof JSON === 'object' && typeof JSON.parse === 'function') {
        features.json = true;
    }
    
    // Test postMessage
    if (typeof window.postMessage === 'function') {
        features.postMessage = true;
    }
    
    console.log('Feature detection results:', features);
    return features;
}

function showCompatibilityWarning(feature) {
    // Check if warning already exists
    if (document.getElementById(`warning-${feature}`)) {
        return;
    }
    
    const warningEl = document.createElement('div');
    warningEl.id = `warning-${feature}`;
    warningEl.className = 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded shadow-sm';
    
    switch (feature) {
        case 'localStorage':
            warningEl.innerHTML = `
                <div class="flex items-start">
                    <div class="flex-shrink-0 mr-3">
                        <span class="text-yellow-500 text-xl">⚠️</span>
                    </div>
                    <div>
                        <p class="font-bold">Browser Storage Warning</p>
                        <p>Your browser has disabled local storage. This may affect booking functionality.</p>
                        <p class="mt-2 text-sm">Try enabling cookies or using a different browser.</p>
                    </div>
                    <button class="ml-auto text-yellow-700 hover:text-yellow-900" onclick="this.parentNode.parentNode.remove()">✕</button>
                </div>
            `;
            break;
    }
    
    // Insert at the top of the main content
    const mainContent = document.querySelector('main') || document.querySelector('section') || document.body;
    mainContent.insertAdjacentElement('afterbegin', warningEl);
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            const isExpanded = !mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            
            // Prevent scrolling when menu is open
            document.body.style.overflow = !isExpanded ? 'hidden' : '';
        });
        
        // Close mobile menu when clicking on links
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
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

// Pricing tabs functionality
function initializePricingTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const pricingContents = document.querySelectorAll('.pricing-content');
    
    console.log('Found tab buttons:', tabButtons.length);
    console.log('Found pricing contents:', pricingContents.length);
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                console.log('Tab clicked:', this.id);
                
                const tabId = this.id.replace('tab-', '');
                console.log('Tab ID:', tabId);
                
                // Hide all pricing contents
                pricingContents.forEach(content => {
                    content.classList.add('hidden');
                    content.setAttribute('aria-hidden', 'true');
                });
                
                // Show the selected content
                const selectedContent = document.getElementById(`pricing-${tabId}`);
                console.log('Selected content:', selectedContent);
                
                if (selectedContent) {
                    selectedContent.classList.remove('hidden');
                    selectedContent.setAttribute('aria-hidden', 'false');
                }
                
                // Update active tab styling
                tabButtons.forEach(btn => {
                    btn.classList.remove('bg-green-700', 'text-white');
                    btn.classList.add('bg-gray-800', 'text-gray-300');
                    btn.setAttribute('aria-pressed', 'false');
                });
                
                this.classList.remove('bg-gray-800', 'text-gray-300');
                this.classList.add('bg-green-700', 'text-white');
                this.setAttribute('aria-pressed', 'true');
            });
        });
    }
}

// Main booking system functionality
function initializeBookingSystem() {
    const bookNowBtn = document.getElementById('book-now-btn');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', handleBookingClick);
    }
}

function handleBookingClick(e) {
    // Get form data for validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const packageSelect = document.getElementById('package');
    const messageInput = document.getElementById('message');
    
    // Basic validation
    if (!validateForm(nameInput, emailInput, phoneInput, packageSelect, messageInput)) {
        return;
    }
    
    // Check localStorage availability
    if (!isLocalStorageAvailable()) {
        alert('Your browser has disabled local storage. Please enable cookies or try a different browser.');
        return;
    }
    
    try {
        // Generate unique transaction ID
        const transactionId = generateTransactionId();
        
        // Store booking details
        const bookingDetails = {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            package: packageSelect.value,
            additionalInfo: messageInput.value,
            transactionId: transactionId,
            timestamp: new Date().toISOString(),
            paymentStatus: 'pending'
        };
        
        // Save booking data
        saveBookingData(transactionId, bookingDetails);
        
        // Show payment instructions
        showPaymentInstructions(bookingDetails);
        
        // Open Venmo with popup blocking detection
        openVenmoWithFallback();
        
        // Show payment completion button
        showPaymentCompleteButton(transactionId);
        
    } catch (error) {
        console.error("Error processing booking:", error);
        alert("Sorry, there was an error processing your booking. Please try again or contact support.");
    }
}

function validateForm(nameInput, emailInput, phoneInput, packageSelect) {
    if (!nameInput.value) {
        alert('Please enter your name.');
        nameInput.focus();
        return false;
    }
    
    if (!emailInput.value || !emailInput.checkValidity()) {
        alert('Please enter a valid email address.');
        emailInput.focus();
        return false;
    }
    
    if (!phoneInput.value || !phoneInput.checkValidity()) {
        alert('Please enter a valid phone number.');
        phoneInput.focus();
        return false;
    }
    
    if (!packageSelect.value) {
        alert('Please select a package.');
        packageSelect.focus();
        return false;
    }
    
    return true;
}

function isLocalStorageAvailable() {
    try {
        const testKey = 'test_localStorage';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
}

function generateTransactionId() {
    const timestamp = new Date().getTime();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const randomNum = Math.floor(Math.random() * 9000) + 1000;
    return `BCN-${timestamp}-${randomStr}-${randomNum}`;
}

function saveBookingData(transactionId, bookingDetails) {
    // Get existing bookings array or create new one
    let bookings = [];
    try {
        const existingBookings = localStorage.getItem('bcnBookings');
        if (existingBookings) {
            bookings = JSON.parse(existingBookings);
        }
    } catch (e) {
        console.warn("Error getting existing bookings:", e);
    }
    
    // Add new booking
    bookings.push(transactionId);
    localStorage.setItem('bcnBookings', JSON.stringify(bookings));
    localStorage.setItem('bcnBooking_' + transactionId, JSON.stringify(bookingDetails));
}

function showPaymentInstructions(bookingDetails) {
    alert(`Thank you ${bookingDetails.name}!\n\n` +
          `1. You'll be redirected to Venmo for payment\n` +
          `2. After completing payment, return to this page and click "I've Completed Payment"\n` +
          `3. You'll then be directed to schedule your sessions\n\n`);
}

function openVenmoWithFallback() {
    try {
        const venmoWindow = window.open("https://www.venmo.com/u/bcnfutbolacademy", "_blank");
        
        // Check if popup was blocked
        if (!venmoWindow || venmoWindow.closed || typeof venmoWindow.closed === 'undefined') {
            console.warn("Popup blocked - will show fallback link");
            setTimeout(showVenmoFallback, 1000);
        }
    } catch (e) {
        console.error("Error opening Venmo:", e);
        showVenmoFallback();
    }
}

function showVenmoFallback() {
    const fallbackDiv = document.createElement('div');
    fallbackDiv.className = 'mt-4 p-4 bg-yellow-100 rounded-lg border border-yellow-300';
    fallbackDiv.innerHTML = `
        <p class="text-yellow-800 font-bold mb-2">Popup Blocked</p>
        <p class="text-gray-700 mb-3">Click the link below to complete your payment:</p>
        <a href="https://www.venmo.com/u/bcnfutbolacademy" target="_blank" 
           class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-full font-bold inline-block">
            Open Venmo Payment
        </a>
        <p class="text-sm text-gray-600 mt-3">After payment, return here and click "I've Completed Payment"</p>
    `;
    
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.parentNode.insertBefore(fallbackDiv, bookingForm.nextSibling);
    }
}

function showPaymentCompleteButton(transactionId) {
    const paymentSection = document.createElement('div');
    paymentSection.id = 'payment-confirmation';
    paymentSection.className = 'mt-6 p-6 bg-blue-50 rounded-lg border-2 border-blue-200';
    
    paymentSection.innerHTML = `
        <h3 class="text-xl font-bold text-blue-800 mb-4">Complete Your Booking</h3>
        <p class="text-gray-700 mb-4">
            Once you've completed payment on Venmo, click the button below to schedule your sessions.
        </p>
        <button id="payment-complete-btn" 
                class="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg">
            I've Completed Payment - Schedule Sessions
        </button>
    `;
    
    // Add after booking form and hide the form
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.parentNode.insertBefore(paymentSection, bookingForm.nextSibling);
        bookingForm.style.display = 'none';
    }
    
    // Add click handler
    const completeBtn = document.getElementById('payment-complete-btn');
    completeBtn.addEventListener('click', function() {
        handlePaymentCompletion(transactionId, completeBtn);
    });
}

function handlePaymentCompletion(transactionId, button) {
    // Disable button to prevent double clicks
    button.disabled = true;
    button.textContent = 'Processing...';
    button.className = 'bg-gray-500 text-white font-bold py-3 px-6 rounded-full cursor-not-allowed';
    
    try {
        // Verify booking exists
        const bookingData = localStorage.getItem('bcnBooking_' + transactionId);
        if (!bookingData) {
            throw new Error('Booking data not found');
        }
        
        // Update payment status
        const bookingDetails = JSON.parse(bookingData);
        bookingDetails.paymentStatus = 'completed';
        localStorage.setItem('bcnBooking_' + transactionId, JSON.stringify(bookingDetails));
        
        // Get appropriate scheduling URL
        const schedulingUrl = getSchedulingUrl(bookingDetails.package);
        
        // Show success message and redirect
        setTimeout(() => {
            alert(`Perfect! You'll now be directed to schedule your sessions.\n\n` +
                  `Please have this information ready:\n` +
                  `- Player's Name & Age:\n`);
            
            // Open scheduling calendar
            window.open(schedulingUrl, '_blank');
            
            // Update button and show instructions
            button.textContent = 'Scheduling Opened - Check New Tab';
            button.className = 'bg-green-600 text-white font-bold py-3 px-6 rounded-full';
            
            // Show detailed instructions
            showSchedulingInstructions(bookingDetails, schedulingUrl);
        }, 1000);
        
    } catch (error) {
        console.error("Error processing payment completion:", error);
        alert("Sorry, there was an error. Please try again or contact support.");
        
        // Re-enable button
        button.disabled = false;
        button.textContent = 'I\'ve Completed Payment - Schedule Sessions';
        button.className = 'bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg';
    }
}

function showSchedulingInstructions(bookingDetails, schedulingUrl) {
    const instructionsSection = document.createElement('div');
    instructionsSection.className = 'mt-6 p-6 bg-green-50 rounded-lg border-2 border-green-200';
    
    instructionsSection.innerHTML = `
        <h3 class="text-xl font-bold text-green-800 mb-4">Next: Schedule Your Sessions</h3>
        <div class="mb-4">
                  </div>
        
        <div class="bg-white p-4 rounded-lg mb-4">
            <p class="text-gray-700 mb-3"><strong>Scheduling Instructions:</strong></p>
            <ol class="list-decimal pl-5 space-y-1 text-gray-700">
                <li>Check the new tab that opened with your scheduling calendar</li>
                <li>Select your preferred dates and times</li>
                <li>You'll receive email confirmations for each scheduled session</li>
            </ol>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-3">
            <a href="${schedulingUrl}" target="_blank" 
               class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-center transition duration-300">
                Open Scheduling Again
            </a>
            <a href="mailto:bcnfutbolacademy@gmail.com?subject=Booking%20Assistance%20-%20${bookingDetails.transactionId}" 
               class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full text-center transition duration-300">
                Need Help? Email Us
            </a>
        </div>
    `;
    
    // Add after payment confirmation section
    const paymentSection = document.getElementById('payment-confirmation');
    if (paymentSection) {
        paymentSection.parentNode.insertBefore(instructionsSection, paymentSection.nextSibling);
    }
}

function getSchedulingUrl(packageType) {
    if (packageType.startsWith('individual-')) {
        return "https://calendar.app.google/DKyrC3Hd16Ybw5KM6";
    } else if (packageType.startsWith('summer-')) {
        return "https://calendar.app.google/Y2rSBJ1vUiCaDv819";
    } else {
        return "https://calendar.app.google/DKyrC3Hd16Ybw5KM6";
    }
}

function getPackageDisplayName(packageId) {
    const packageMap = {
        'individual-4': '4 Individual Sessions ($240)',
        'individual-8': '8 Individual Sessions ($440)', 
        'individual-12': '12 Individual Sessions ($600)',
        'individual-16': '16 Individual Sessions ($720)',
        'summer-mini': 'Summer Mini Pack - 4 Sessions ($200)',
        'summer-half': 'Summer Half Pack - 8 Sessions ($250)',
        'summer-flex': 'Summer Flex Pack - 12 Sessions ($375)',
        'summer-full': 'Summer Full Pack - 16 Sessions ($480)',
        'summer-payg': 'Summer Pay-As-You-Go ($35 per session)'
    };
    
    return packageMap[packageId] || packageId;
}

function checkForExistingBooking() {
    try {
        if (!isLocalStorageAvailable()) {
            return;
        }
        
        const hash = window.location.hash;
        if (hash.includes('booking-calendar')) {
            const txMatch = hash.match(/tx=([^&]+)/);
            if (txMatch && txMatch[1]) {
                const transactionId = txMatch[1];
                const bookingData = localStorage.getItem('bcnBooking_' + transactionId);
                
                if (bookingData) {
                    const bookingDetails = JSON.parse(bookingData);
                    if (bookingDetails.paymentStatus === 'completed') {
                        // Show calendar section for existing completed booking
                        const schedulingUrl = getSchedulingUrl(bookingDetails.package);
                        showSchedulingInstructions(bookingDetails, schedulingUrl);
                        
                        // Scroll to instructions
                        setTimeout(() => {
                            const instructions = document.querySelector('.bg-green-50');
                            if (instructions) {
                                instructions.scrollIntoView({ behavior: 'smooth' });
                            }
                        }, 500);
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error checking for existing booking:", error);
    }
}

function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}
