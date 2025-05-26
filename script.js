<!-- JavaScript -->
    <script>
        // Wait for DOM to be fully loaded before executing any JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded - initializing scripts');
    
    // Browser compatibility polyfills
    (function() {
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
    })();
    
    // Feature detection function
    function detectFeatures() {
        const features = {
            localStorage: false,
            iframe: true,
            fetch: false,
            json: false
        };
        
        // Test localStorage
        try {
            const testKey = 'test_localStorage';
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            features.localStorage = true;
        } catch (e) {
            console.warn('localStorage not supported');
        }
        
        // Test Fetch API
        if (typeof fetch === 'function') {
            features.fetch = true;
        } else {
            console.warn('Fetch API not supported');
        }
        
        // Test JSON
        if (typeof JSON === 'object' && typeof JSON.parse === 'function') {
            features.json = true;
        } else {
            console.warn('JSON not fully supported');
        }
        
        // Display appropriate warnings for missing features
        if (!features.localStorage) {
            showCompatibilityWarning('localStorage');
        }
        
        // Return the feature detection results
        return features;
    }

    // Function to show compatibility warning
    function showCompatibilityWarning(feature) {
        const warningEl = document.createElement('div');
        warningEl.className = 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4';
        
        switch (feature) {
            case 'localStorage':
                warningEl.innerHTML = `
                    <p class="font-bold">Browser Storage Warning</p>
                    <p>Your browser does not support or has disabled local storage. This may affect your ability to complete bookings. Try enabling cookies or using a different browser.</p>
                `;
                break;
            default:
                warningEl.innerHTML = `
                    <p class="font-bold">Browser Compatibility Warning</p>
                    <p>Your browser may not fully support all features of this website. For the best experience, please use a modern browser like Chrome, Firefox, Safari, or Edge.</p>
                `;
        }
        
        // Insert at the top of the page
        const firstElement = document.body.firstChild;
        document.body.insertBefore(warningEl, firstElement);
    }
    
    // Run feature detection
    const supportedFeatures = detectFeatures();
    
    // Rest of your initialization code follows...
    // Mobile menu toggle
    // ...
            
            // Enhanced mobile menu toggle with better touch behavior
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

if(mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
        const isExpanded = mobileMenu.classList.contains('hidden') ? false : true;
        mobileMenu.classList.toggle('hidden');
        // Update ARIA attributes
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        
        // Prevent scrolling when menu is open
        if (!isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking on a link
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
            
            // Tab functionality for pricing section
            const tabButtons = document.querySelectorAll('.tab-btn');
            const pricingContents = document.querySelectorAll('.pricing-content');
            
            if(tabButtons.length > 0) {
                tabButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        // Get the tab id from the button id
                        const tabId = this.id.replace('tab-', '');
                        
                        // Hide all pricing contents
                        pricingContents.forEach(content => {
                            content.classList.add('hidden');
                            content.setAttribute('aria-hidden', 'true');
                        });
                        
                        // Show the selected content
                        const selectedContent = document.getElementById(`pricing-${tabId}`);
                        if(selectedContent) {
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
            
            // Book Now button click handler - redirect to Venmo
            const bookNowBtn = document.getElementById('book-now-btn');
            if (bookNowBtn) {
                bookNowBtn.addEventListener('click', function(e) {
                    // Get form data for validation
                    const nameInput = document.getElementById('name');
                    const emailInput = document.getElementById('email');
                    const phoneInput = document.getElementById('phone');
                    const packageSelect = document.getElementById('package');
                    
                    // Basic validation
                    if (!nameInput.value) {
                        alert('Please enter your name.');
                        nameInput.focus();
                        return;
                    }
                    
                    if (!emailInput.value || !emailInput.checkValidity()) {
                        alert('Please enter a valid email address.');
                        emailInput.focus();
                        return;
                    }
                    
                    if (!phoneInput.value || !phoneInput.checkValidity()) {
                        alert('Please enter a valid phone number.');
                        phoneInput.focus();
                        return;
                    }
                    
                    if (!packageSelect.value) {
                        alert('Please select a package.');
                        packageSelect.focus();
                        return;
                    }
                    
                    // Check if localStorage is available
                    if (!isLocalStorageAvailable()) {
                        alert('Your browser does not support local storage or it is disabled. Please enable cookies and local storage for this site to work properly.');
                        return;
                    }
                    
                    try {
                        // Generate a unique transaction ID
                        const transactionId = generateTransactionId();
                        
                        // Store booking details in localStorage for retrieval after payment
                        const bookingDetails = {
                            name: nameInput.value,
                            email: emailInput.value,
                            phone: phoneInput.value,
                            package: packageSelect.value,
                            transactionId: transactionId,
                            timestamp: new Date().toISOString(),
                            paymentStatus: 'pending'
                        };
                        
                        // Get existing bookings array or create a new one
                        let bookings = [];
                        try {
                            const existingBookings = localStorage.getItem('bcnBookings');
                            if (existingBookings) {
                                bookings = JSON.parse(existingBookings);
                            }
                        } catch (e) {
                            console.error("Error getting existing bookings:", e);
                            // Start with a fresh array if there's an error
                            bookings = [];
                        }
                        
                        // Add the new booking and store the array
                        bookings.push(transactionId);
                        localStorage.setItem('bcnBookings', JSON.stringify(bookings));
                        localStorage.setItem('bcnBooking_' + transactionId, JSON.stringify(bookingDetails));
                        
                        // Create a return URL that includes the transaction ID
                        const returnUrl = window.location.href.split('#')[0] + '#booking-calendar?tx=' + transactionId;
                        
                        // Save the return URL to localStorage as well
                        localStorage.setItem('bcnReturnUrl_' + transactionId, returnUrl);
                        
                        // Show a message to the user about returning after payment
                        alert('After completing payment on Venmo, please return to this tab and click "I\'ve Completed Payment" to schedule your sessions. IMPORTANT: Please keep this tab open during the payment process.');
                        
                        // Open Venmo in a new tab and handle popup blocking
                        try {
                            // Attempt to open the Venmo page in a new tab
                            const venmoWindow = window.open("https://www.venmo.com/u/bcnfutbolacademy", "_blank");
                            
                            // Check if the window was successfully opened
                            if (!venmoWindow || venmoWindow.closed || typeof venmoWindow.closed === 'undefined') {
                                // Popup was blocked
                                console.warn("Popup blocker prevented opening Venmo in a new tab");
                                
                                // Show a warning message with direct link
                                const popupWarning = document.createElement('div');
                                popupWarning.className = 'mt-4 p-3 bg-yellow-100 rounded-lg text-center';
                                popupWarning.innerHTML = `
                                    <p class="text-yellow-800 font-bold mb-2">Popup Blocked</p>
                                    <p class="text-gray-700 mb-3">Your browser appears to have blocked the Venmo payment page from opening automatically.</p>
                                    <a href="https://www.venmo.com/u/bcnfutbolacademy" target="_blank" class="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-full font-bold inline-block mb-3">
                                        Click here to open Venmo
                                    </a>
                                    <p class="text-sm text-gray-600">After completing your payment, return to this page and click "I've Completed Payment" below.</p>
                                `;
                                
                                // Insert the warning before the payment complete button
                                const paymentCompleteButton = document.getElementById('payment-complete-btn');
                                if (paymentCompleteButton && paymentCompleteButton.parentNode) {
                                    paymentCompleteButton.parentNode.insertBefore(popupWarning, paymentCompleteButton);
                                } else {
                                    // Fallback if button not found yet
                                    setTimeout(() => {
                                        const paymentReturnContainer = document.getElementById('payment-return-container');
                                        if (paymentReturnContainer) {
                                            paymentReturnContainer.insertBefore(popupWarning, paymentReturnContainer.firstChild);
                                        }
                                    }, 500);
                                }
                            } else {
                                // Window was opened successfully
                                console.log("Venmo opened in new tab");
                            }
                        } catch (e) {
                            console.error("Error opening Venmo:", e);
                            alert("There was an error opening the Venmo payment page. Please click 'I've Completed Payment' and use the link provided.");
                        }
                        
                        // Show the "I've Completed Payment" button
                        showPaymentCompleteButton(transactionId);
                    } catch (error) {
                        console.error("Error processing booking:", error);
                        alert("Sorry, there was an error processing your booking. Please try again or contact support.");
                    }
                });
            }
            
            // Enhanced feature detection for localStorage and other critical features
function isLocalStorageAvailable() {
    try {
        const testKey = 'test_localStorage';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        console.warn('localStorage not available:', e);
        return false;
    }
}

// Comprehensive feature detection for the application
function detectFeatures() {
    const features = {
        localStorage: isLocalStorageAvailable(),
        iframe: true,
        postMessage: window.postMessage !== undefined,
        json: typeof JSON === 'object' && typeof JSON.parse === 'function'
    };
    
    // Log feature detection results
    console.log('Feature detection results:', features);
    
    // Show warnings for critical missing features
    if (!features.localStorage) {
        showFeatureWarning('localStorage');
    }
    
    if (!features.postMessage) {
        console.warn('postMessage API not supported - calendar communication may be affected');
    }
    
    return features;
}

// Function to show feature compatibility warnings
function showFeatureWarning(feature) {
    // Check if warning already exists
    if (document.getElementById(`warning-${feature}`)) {
        return;
    }
    
    const warningEl = document.createElement('div');
    warningEl.id = `warning-${feature}`;
    warningEl.className = 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 my-4 rounded shadow-sm';
    
    switch (feature) {
        case 'localStorage':
            warningEl.innerHTML = `
                <div class="flex">
                    <div class="flex-shrink-0">
                        <i class="fas fa-exclamation-triangle text-yellow-500"></i>
                    </div>
                    <div class="ml-3">
                        <p class="font-bold">Browser Storage Warning</p>
                        <p>Your browser does not support or has disabled local storage. This may affect your ability to complete bookings.</p>
                        <p class="mt-2 text-sm">Recommendations:</p>
                        <ul class="list-disc pl-5 text-sm">
                            <li>Enable cookies and local storage in your browser settings</li>
                            <li>Try using a private/incognito browsing window</li>
                            <li>Try a different browser (Chrome, Firefox, Safari, or Edge)</li>
                        </ul>
                    </div>
                </div>
                <button class="mt-2 text-sm text-yellow-800 hover:text-yellow-900" onclick="this.parentNode.remove()">Dismiss</button>
            `;
            break;
        default:
            warningEl.innerHTML = `
                <div class="flex">
                    <div class="flex-shrink-0">
                        <i class="fas fa-exclamation-triangle text-yellow-500"></i>
                    </div>
                    <div class="ml-3">
                        <p class="font-bold">Browser Compatibility Warning</p>
                        <p>Your browser may not fully support all features needed. For the best experience, please use a modern browser.</p>
                    </div>
                </div>
                <button class="mt-2 text-sm text-yellow-800 hover:text-yellow-900" onclick="this.parentNode.remove()">Dismiss</button>
            `;
    }
    
    // Try to insert after the header/nav, or at the beginning of the main content
    const mainContent = document.querySelector('main') || document.querySelector('section') || document.body;
    mainContent.insertAdjacentElement('afterbegin', warningEl);
}
            
            // Function to generate a unique transaction ID
            function generateTransactionId() {
                // Create a truly unique ID by combining:
                // 1. Current timestamp
                // 2. Random string
                // 3. Random number between 1000-9999
                const timestamp = new Date().getTime();
                const randomStr = Math.random().toString(36).substring(2, 10);
                const randomNum = Math.floor(Math.random() * 9000) + 1000;
                return `TX-${timestamp}-${randomStr}-${randomNum}`;
            }
            
            // Function to show the "I've Completed Payment" button
            function showPaymentCompleteButton(transactionId) {
                // Create a container for the payment return section
                const paymentReturnContainer = document.createElement('div');
                paymentReturnContainer.id = 'payment-return-container';
                paymentReturnContainer.className = 'mt-6 p-4 bg-green-100 rounded text-center';
                
                // Create a heading
                const heading = document.createElement('h4');
                heading.className = 'font-bold text-green-800 mb-2';
                heading.textContent = 'Complete Your Booking';
                
                // Create instructions
                const instructions = document.createElement('p');
                instructions.className = 'text-gray-700 mb-4';
                instructions.innerHTML = 'Once you\'ve completed payment on Venmo, click the button below to schedule your sessions.<br><strong>Important:</strong> Please keep this tab open during the payment process.';
                
                // Create the button
                const completeBtn = document.createElement('button');
                completeBtn.id = 'payment-complete-btn';
                completeBtn.className = 'bg-green-700 hover:bg-green-800 px-6 py-2 rounded-full font-bold text-white hover:shadow-lg transition duration-300';
                completeBtn.textContent = 'I\'ve Completed Payment';
                
                // Add event listener to the button
                completeBtn.addEventListener('click', function() {
                    // Disable the button to prevent multiple clicks
                    completeBtn.disabled = true;
                    completeBtn.textContent = 'Processing...';
                    completeBtn.className = 'bg-gray-500 px-6 py-2 rounded-full font-bold text-white cursor-not-allowed';
                    
                    // Check if localStorage is still available
                    if (!isLocalStorageAvailable()) {
                        alert('Your browser does not support local storage or it is disabled. Please enable cookies and local storage for this site to work properly.');
                        // Re-enable the button
                        completeBtn.disabled = false;
                        completeBtn.textContent = 'I\'ve Completed Payment';
                        completeBtn.className = 'bg-green-700 hover:bg-green-800 px-6 py-2 rounded-full font-bold text-white hover:shadow-lg transition duration-300';
                        return;
                    }
                    
                    try {
                        // Check if the transaction exists in localStorage
                        const bookingData = localStorage.getItem('bcnBooking_' + transactionId);
                        
                        if (bookingData) {
                            // Update the payment status to "completed" (this would normally be verified by a server)
                            const bookingDetails = JSON.parse(bookingData);
                            bookingDetails.paymentStatus = 'completed';
                            localStorage.setItem('bcnBooking_' + transactionId, JSON.stringify(bookingDetails));
                            
                            // Redirect to the booking calendar section
                            window.location.hash = 'booking-calendar?tx=' + transactionId;
                            
                            // Show the calendar and ensure it's scrolled into view
                            showBookingCalendar(transactionId);
                            
                            // Create the booking calendar section if it doesn't exist yet
                            let calendarSection = document.getElementById('booking-calendar-section');
                            if (!calendarSection) {
                                createCalendarSection(transactionId);
                            }
                            
                            // Scroll to the calendar section
                            scrollToElementSafely('booking-calendar-section');
                        } else {
                            alert('Booking information not found. Please try again or contact support.');
                            // Re-enable the button if there's an error
                            completeBtn.disabled = false;
                            completeBtn.textContent = 'I\'ve Completed Payment';
                            completeBtn.className = 'bg-green-700 hover:bg-green-800 px-6 py-2 rounded-full font-bold text-white hover:shadow-lg transition duration-300';
                        }
                    } catch (error) {
                        console.error("Error processing payment completion:", error);
                        alert("Sorry, there was an error processing your payment completion. Please try again or contact support.");
                        // Re-enable the button if there's an error
                        completeBtn.disabled = false;
                        completeBtn.textContent = 'I\'ve Completed Payment';
                        completeBtn.className = 'bg-green-700 hover:bg-green-800 px-6 py-2 rounded-full font-bold text-white hover:shadow-lg transition duration-300';
                    }
                });
                
                // Assemble and inject the container
                paymentReturnContainer.appendChild(heading);
                paymentReturnContainer.appendChild(instructions);
                paymentReturnContainer.appendChild(completeBtn);
                
                // Find the form and inject after it
                const bookingForm = document.getElementById('booking-form');
                if (bookingForm) {
                    bookingForm.parentNode.insertBefore(paymentReturnContainer, bookingForm.nextSibling);
                    
                    // Hide the form to reduce confusion
                    bookingForm.style.display = 'none';
                }
            }
            
            // Function to scroll to element safely (cross-browser compatible)
            function scrollToElementSafely(elementId) {
                setTimeout(function() {
                    const element = document.getElementById(elementId);
                    if (element) {
                        // Use scrollIntoView with a fallback
                        if (typeof element.scrollIntoView === 'function') {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        } else {
                            // Fallback for older browsers
                            const rect = element.getBoundingClientRect();
                            window.scrollTo({
                                top: rect.top + window.pageYOffset,
                                left: rect.left + window.pageXOffset,
                                behavior: 'smooth'
                            });
                        }
                    }
                }, 300);
            }
            
            // Function to create the booking calendar section
            function createCalendarSection(transactionId) {
                // Create the calendar section
                const calendarSection = document.createElement('section');
                calendarSection.id = 'booking-calendar-section';
                calendarSection.className = 'py-16 bg-gray-100';
                
                // Create the container
                const container = document.createElement('div');
                container.className = 'container mx-auto px-4';
                
                // Create the heading
                const heading = document.createElement('h2');
                heading.className = 'text-3xl font-bold mb-8 text-center text-green-700';
                heading.textContent = 'Schedule Your Sessions';
                
                // Create a placeholder for the calendar
                const calendarPlaceholder = document.createElement('div');
                calendarPlaceholder.id = 'google-calendar-embed';
                calendarPlaceholder.className = 'bg-white p-6 rounded-lg shadow-md';
                
                // Initial loading state
                calendarPlaceholder.innerHTML = '<div class="text-center py-8">' +
                                              '<p class="text-gray-700 mb-4">Preparing your booking calendar...</p>' +
                                              '<div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-700"></div>' +
                                              '</div>';
                
                // Assemble the section
                container.appendChild(heading);
                container.appendChild(calendarPlaceholder);
                calendarSection.appendChild(container);
                
                // Add the section to the page
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.parentNode.insertBefore(calendarSection, contactSection.nextSibling);
                } else {
                    // Fallback if contact section isn't found
                    document.body.appendChild(calendarSection);
                }
                
                return calendarSection;
            }
            
            // Placeholder function for showBookingCalendar (implementation for step 3)
            function showBookingCalendar(transactionId) {
                console.log("Showing booking calendar for transaction:", transactionId);
                
                try {
                    // Get the booking data
                    const bookingData = localStorage.getItem('bcnBooking_' + transactionId);
                    if (bookingData) {
                        const bookingDetails = JSON.parse(bookingData);
                        console.log("Booking details:", bookingDetails);
                        
                        // Create or get the calendar container
                        let calendarContainer = document.getElementById('google-calendar-embed');
                        if (!calendarContainer) {
                            // If the calendar section doesn't exist yet, create it
                            const calendarSection = createCalendarSection(transactionId);
                            calendarContainer = document.getElementById('google-calendar-embed');
                        }
                        
                        if (calendarContainer) {
                            // Clear any existing content
                            calendarContainer.innerHTML = '';
                            
                            // Add a loading indicator
                            const loadingIndicator = document.createElement('div');
                            loadingIndicator.className = 'text-center py-8';
                            loadingIndicator.innerHTML = '<p class="text-gray-700 mb-4">Loading calendar...</p>' +
                                                         '<div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-700"></div>';
                            calendarContainer.appendChild(loadingIndicator);
                            
                            // Create a container for booking details
                            const bookingInfoContainer = document.createElement('div');
                            bookingInfoContainer.className = 'bg-green-100 p-4 rounded-lg mb-6';
                            bookingInfoContainer.innerHTML = `
                                <h3 class="text-xl font-bold mb-3 text-green-700">Booking Information</h3>
                                <p class="text-gray-700"><strong>Name:</strong> ${bookingDetails.name}</p>
                                <p class="text-gray-700"><strong>Package:</strong> ${getPackageDisplayName(bookingDetails.package)}</p>
                                <p class="text-gray-700"><strong>Transaction ID:</strong> ${bookingDetails.transactionId}</p>
                                <p class="text-gray-700 mt-4">Please select your preferred time slots from the calendar below.</p>
                            `;
                            
                            // After a short delay (to show loading indicator), embed the Google Calendar
                            setTimeout(() => {
                                // Clear the loading indicator
                                calendarContainer.innerHTML = '';
                                
                                // Add booking info
                                calendarContainer.appendChild(bookingInfoContainer);
                                
function showBookingCalendar(transactionId) {
    console.log("Showing booking calendar for transaction:", transactionId);
    
    try {
        // Get the booking data
        const bookingData = localStorage.getItem('bcnBooking_' + transactionId);
        if (bookingData) {
            const bookingDetails = JSON.parse(bookingData);
            console.log("Booking details:", bookingDetails);
            
            // Create or get the calendar container
            let calendarContainer = document.getElementById('google-calendar-embed');
            if (!calendarContainer) {
                // If the calendar section doesn't exist yet, create it
                const calendarSection = createCalendarSection(transactionId);
                calendarContainer = document.getElementById('google-calendar-embed');
            }
            
            if (calendarContainer) {
                // Clear any existing content
                calendarContainer.innerHTML = '';
                
                // Add a loading indicator
                const loadingIndicator = document.createElement('div');
                loadingIndicator.className = 'text-center py-8';
                loadingIndicator.innerHTML = '<p class="text-gray-700 mb-4">Loading calendar...</p>' +
                                           '<div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-700"></div>';
                calendarContainer.appendChild(loadingIndicator);
                
                // Create a container for booking details
                const bookingInfoContainer = document.createElement('div');
                // ... (booking info container code) ...
                
                // After a short delay (to show loading indicator), embed the Google Calendar
                setTimeout(() => {
                    // Clear the loading indicator
                    calendarContainer.innerHTML = '';
                    
                    // Add booking info
                    calendarContainer.appendChild(bookingInfoContainer);
                    
                    // ADD THIS CODE HERE - START
                    // Check iframe and postMessage support for calendar functionality
                    const calendarFeaturesSupported = (function() {
                        const features = {
                            iframe: true,
                            postMessage: window.postMessage !== undefined
                        };
                        
                        // Test iframe functionality (some browsers block or restrict iframes)
                        try {
                            const testFrame = document.createElement('iframe');
                            testFrame.style.display = 'none';
                            document.body.appendChild(testFrame);
                            document.body.removeChild(testFrame);
                        } catch (e) {
                            features.iframe = false;
                            console.warn('Iframe testing failed:', e);
                        }
                        
                        return features;
                    })();

                    // Show warning if calendar features are not supported
                    if (!calendarFeaturesSupported.iframe || !calendarFeaturesSupported.postMessage) {
                        const calendarWarning = document.createElement('div');
                        calendarWarning.className = 'bg-yellow-100 p-4 rounded-lg mb-6 text-yellow-800';
                        calendarWarning.innerHTML = `
                            <p class="font-bold">Calendar Integration Warning</p>
                            <p>Your browser may have restrictions that affect the calendar booking system. If you experience issues:</p>
                            <ul class="list-disc pl-5 mt-2">
                                <li>Try disabling tracking prevention or shields in your browser</li>
                                <li>Check if iframes are being blocked</li>
                                <li>Try a different browser</li>
                            </ul>
                        `;
                        
                        // Insert the warning before the calendar
                        calendarContainer.appendChild(calendarWarning);
                    }
                    // ADD THIS CODE HERE - END
                    
                    // Create the iframe for Google Calendar
                    const calendarFrame = document.createElement('iframe');
                    calendarFrame.src = getCalendarUrl(bookingDetails);
                    // ... (rest of the iframe configuration) ...

                                // Create the iframe for Google Calendar
                               const calendarFrame = document.createElement('iframe');
calendarFrame.src = getCalendarUrl(bookingDetails);
calendarFrame.style.width = '100%';
calendarFrame.style.height = '600px';
calendarFrame.style.border = '0';
calendarFrame.frameBorder = '0';
calendarFrame.className = 'rounded-lg shadow-md';
calendarFrame.title = 'BCN Futbol Academy Appointment Scheduling';
                                
                                // Add responsive styles for mobile
                                const mediaQuery = `
                                    @media (max-width: 768px) {
                                        #calendar-iframe {
                                            height: 400px;
                                        }
                                    }
                                    @media (max-width: 480px) {
                                        #calendar-iframe {
                                            height: 350px;
                                        }
                                    }
                                `;
                                
                                const style = document.createElement('style');
                                style.innerHTML = mediaQuery;
                                document.head.appendChild(style);
                                calendarFrame.id = 'calendar-iframe';
                                
                                // Add event listener for when the calendar loads
                                calendarFrame.onload = function() {
                                    console.log("Appointment scheduling iframe loaded");
                                    // Remove any loading classes when the iframe is loaded
                                    calendarFrame.classList.remove('opacity-50');
                                    
                                    // Clear the loading timeout if calendar loads successfully
                                    if (window.calendarLoadingTimeout) {
                                        clearTimeout(window.calendarLoadingTimeout);
                                    }
                                };
                                
                                // Set a timeout to check if the calendar fails to load
                                window.calendarLoadingTimeout = setTimeout(() => {
    // Create a fallback message
    const fallbackMessage = document.createElement('div');
    fallbackMessage.className = 'p-4 bg-yellow-100 rounded-lg border border-yellow-300 text-center';
    fallbackMessage.innerHTML = `
        <p class="text-yellow-800 font-bold mb-2">Unable to load appointment scheduler</p>
        <p class="text-gray-700 mb-3">The booking calendar could not be loaded at this time. Please try one of the following:</p>
        <ul class="text-left list-disc pl-5 mb-4 text-gray-700">
            <li>Refresh the page and try again</li>
            <li>Try using a different browser</li>
            <li>Contact us directly to schedule your sessions</li>
        </ul>
        <a href="${getCalendarUrl(bookingDetails)}" target="_blank" class="inline-block bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">
            Open Scheduler in New Tab
        </a>
    `;
    
    // Check if the iframe failed to load properly and replace it with the fallback message
    if (calendarFrame.classList.contains('opacity-50')) {
        calendarFrame.parentNode.replaceChild(fallbackMessage, calendarFrame);
    }
}, 10000); // 10 second timeout
                                
                                // Append the iframe to the container
                                calendarContainer.appendChild(calendarFrame);
                                
                                // Add instructions below the calendar
                                const instructions = document.createElement('div');
                                instructions.className = 'mt-6 p-4 bg-gray-100 rounded-lg';
                                instructions.innerHTML = `
                                    <h4 class="font-bold text-gray-800 mb-2">Booking Instructions</h4>
                                    <p class="text-gray-700 mb-3">Thank you for your payment! To schedule your sessions, please follow these steps:</p>
                                    <ol class="list-decimal pl-5 space-y-2 text-gray-700">
                                        <li>Select the type of session you want to book from the dropdown menu.</li>
                                        <li>Choose an available date and time slot from the calendar above.</li>
                                        <li>Fill in your details to confirm the appointment.</li>
                                        <li>You'll receive an email confirmation once your appointment is scheduled.</li>
                                    </ol>
                                    <div class="mt-4 p-3 bg-green-100 rounded-lg">
                                        <p class="font-bold text-green-800 mb-2">Need help with scheduling?</p>
                                        <p class="text-gray-700">
                                            <i class="fas fa-envelope mr-2 text-green-700" aria-hidden="true"></i>
                                            <a href="mailto:bcnfutbolacademy@gmail.com" class="text-green-700 hover:underline">bcnfutbolacademy@gmail.com</a>
                                        </p>
                                        <p class="text-gray-700">
                                            <i class="fas fa-phone mr-2 text-green-700" aria-hidden="true"></i>
                                            <a href="tel:+18167307552" class="text-green-700 hover:underline">(816) 730-7552</a>
                                        </p>
                                        <p class="mt-2 text-sm text-gray-600">Please include your name, package selected, and transaction ID: <span class="font-mono bg-gray-200 px-1 py-0.5 rounded">${bookingDetails.transactionId}</span></p>
                                    </div>
                                `;
                                calendarContainer.appendChild(instructions);
                                
                                // Add message event listener to detect appointment confirmations
window.addEventListener('message', function(event) {
    // Check if the message is from Google Calendar
    if (event.origin.includes('calendar.google.com')) {
        try {
            // Try to parse the message data
            const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
            
            // Check if this is an appointment confirmation message
            if (data && (data.action === 'appointmentCreated' || 
                (data.message && data.message.includes('appointment')))) {
                
                console.log('Appointment confirmation detected:', data);
                
                // Show confirmation message to user
                showConfirmationMessage(bookingDetails);
            }
        } catch (error) {
            console.error('Error processing appointment message:', error);
        }
    }
});

// Function to show confirmation message to user
function showConfirmationMessage(details) {
    // Create confirmation message element
    const confirmationMessage = document.createElement('div');
    confirmationMessage.className = 'mt-6 p-6 bg-green-100 rounded-lg text-center';
    confirmationMessage.innerHTML = `
        <div class="text-5xl text-green-700 mb-4">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3 class="text-2xl font-bold text-green-700 mb-2">Booking Confirmed!</h3>
        <p class="text-gray-700 mb-4">Thank you for booking with BCN Futbol Academy!</p>
        <p class="text-gray-700">You will receive a confirmation email shortly.</p>
        <p class="text-gray-700 mt-4">Your transaction ID: <span class="font-mono bg-white px-2 py-1 rounded">${details.transactionId}</span></p>
        <div class="mt-6 p-4 bg-white rounded-lg">
            <h4 class="font-bold text-gray-800 mb-2">What's Next?</h4>
            <ol class="text-left list-decimal pl-5 space-y-2 text-gray-700">
                <li>Save your confirmation email for reference</li>
                <li>Prepare for your training session by bringing appropriate gear</li>
                <li>Arrive 10 minutes before your scheduled time</li>
                <li>Contact us if you need to reschedule or have any questions</li>
            </ol>
        </div>
    `;
    
    // Find the calendar container and add the confirmation message
    const calendarContainer = document.getElementById('google-calendar-embed');
    if (calendarContainer) {
        // Add the confirmation message after the calendar
        calendarContainer.parentNode.appendChild(confirmationMessage);
        
        // Scroll to the confirmation message
        confirmationMessage.scrollIntoView({ behavior: 'smooth' });
    }
}
                }
            }
            
            // Function to get a display-friendly name for the package
            function getPackageDisplayName(packageId) {
                const packageMap = {
                    'individual-4': '4 Individual Sessions - $240',
                    'individual-8': '8 Individual Sessions - $440',
                    'individual-12': '12 Individual Sessions - $600',
                    'individual-16': '16 Individual Sessions - $720',
                    'group-2': '2 Players Group Session - $50 each',
                    'group-3': '3 Players Group Session - $45 each',
                    'group-4': '4 Players Group Session - $40 each',
                    'group-5': '5+ Players Group Session - $35 each',
                    'summer-mini': 'Summer Mini Pack (4 Sessions) - $200',
                    'summer-half': 'Summer Half Pack (8 Sessions) - $250',
                    'summer-flex': 'Summer Flex Pack (12 Sessions) - $375',
                    'summer-full': 'Summer Full Pack (16 Sessions) - $480'
                };
                
                return packageMap[packageId] || packageId;
            }
            
            // Function to get the appropriate Google Calendar URL based on the booking details
            function getCalendarUrl(bookingDetails) {
                // Use your Google Calendar Appointment Scheduling URL
                return = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ21ML_t3tbaJuZrcRYyej9zsHAdcNyP7G0tKPmSgkq_41IjXbfxA_6hcTDkEyKllN4NTyrjy6mR?gv=true";
    
                      
            
            }
            
            // Function to get the number of sessions from the package ID
            function getNumberOfSessions(packageId) {
                // Extract session count from package ID
                if (packageId.includes('-')) {
                    const parts = packageId.split('-');
                    if (parts.length > 1) {
                        // For packages like 'individual-4', 'summer-mini', etc.
                        if (parts[0] === 'individual' || parts[0] === 'group') {
                            return parseInt(parts[1], 10) || null;
                        } else if (parts[0] === 'summer') {
                            // Map summer packages to session counts
                            const summerPackages = {
                                'mini': 4,
                                'half': 8,
                                'flex': 12,
                                'full': 16
                            };
                            return summerPackages[parts[1]] || null;
                        }
                    }
                }
                return null;
            }
            
            // Create the booking calendar section if it doesn't exist yet
            
            // Check if there's a transaction ID in the URL hash when the page loads
            function checkForTransactionInUrl() {
                try {
                    if (!isLocalStorageAvailable()) {
                        console.error("localStorage not available, cannot load transaction data");
                        return;
                    }
                    
                    const hash = window.location.hash;
                    if (hash.includes('booking-calendar')) {
                        // Extract the transaction ID from the URL
                        const txMatch = hash.match(/tx=([^&]+)/);
                        if (txMatch && txMatch[1]) {
                            const transactionId = txMatch[1];
                            
                            // Check if the booking exists
                            const bookingData = localStorage.getItem('bcnBooking_' + transactionId);
                            if (bookingData) {
                                const bookingDetails = JSON.parse(bookingData);
                                
                                if (bookingDetails.paymentStatus === 'completed') {
                                    // Create or show the calendar section
                                    let calendarSection = document.getElementById('booking-calendar-section');
                                    if (!calendarSection) {
                                        createCalendarSection(transactionId);
                                    }
                                    
                                    // Show the calendar
                                    showBookingCalendar(transactionId);
                                    
                                    // Scroll to the calendar section
                                    scrollToElementSafely('booking-calendar-section');
                                }
                            }
                        }
                    }
                } catch (error) {
                    console.error("Error checking for transaction in URL:", error);
                }
            }
            
            // Run the URL check when the page loads
            checkForTransactionInUrl();
            
            // Smooth scrolling for all anchor links
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
        });
        
        // Calendar functions
        function showBookingCalendar() {
            // Create overlay for calendar
            const overlay = document.createElement('div');
            overlay.classList.add('fixed', 'inset-0', 'bg-black', 'bg-opacity-50', 'z-50', 'flex', 'items-center', 'justify-center');
            overlay.setAttribute('role', 'dialog');
            overlay.setAttribute('aria-modal', 'true');
            overlay.setAttribute('aria-labelledby', 'calendar-title');
            
            const calendarModal = document.createElement('div');
            calendarModal.classList.add('bg-white', 'p-6', 'rounded-lg', 'shadow-xl', 'max-w-4xl', 'w-full', 'max-h-screen', 'overflow-y-auto');
            
            // Calendar header
            const header = document.createElement('div');
            header.classList.add('flex', 'justify-between', 'items-center', 'mb-6');
            
            const title = document.createElement('h3');
            title.id = 'calendar-title';
            title.classList.add('text-2xl', 'font-bold', 'text-green-700');
            title.textContent = 'Select Your Training Time Slots';
            
            const closeBtn = document.createElement('button');
            closeBtn.classList.add('text-gray-500', 'hover:text-gray-800');
            closeBtn.innerHTML = '<i class="fas fa-times text-xl" aria-hidden="true"></i>';
            closeBtn.setAttribute('aria-label', 'Close calendar');
            closeBtn.addEventListener('click', () => overlay.remove());
            
            header.appendChild(title);
            header.appendChild(closeBtn);
            calendarModal.appendChild(header);
            
            // Calendar instructions
            const instructions = document.createElement('p');
            instructions.classList.add('text-gray-600', 'mb-6');
            instructions.textContent = 'Thank you for your payment! Please select available time slots for your training sessions from the calendar below:';
            calendarModal.appendChild(instructions);
            
            // Calendar view
            const calendarView = document.createElement('div');
            calendarView.classList.add('mb-6');
            
            // Month navigation
            const monthNav = document.createElement('div');
            monthNav.classList.add('flex', 'justify-between', 'items-center', 'mb-4');
            
            const prevBtn = document.createElement('button');
            prevBtn.classList.add('text-gray-600', 'hover:text-green-700');
            prevBtn.innerHTML = '<i class="fas fa-chevron-left" aria-hidden="true"></i>';
            prevBtn.setAttribute('aria-label', 'Previous month');
            
            const monthDisplay = document.createElement('h4');
            monthDisplay.classList.add('text-xl', 'font-bold');
            const currentDate = new Date();
            monthDisplay.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;
            
            const nextBtn = document.createElement('button');
            nextBtn.classList.add('text-gray-600', 'hover:text-green-700');
            nextBtn.innerHTML = '<i class="fas fa-chevron-right" aria-hidden="true"></i>';
            nextBtn.setAttribute('aria-label', 'Next month');
            
            monthNav.appendChild(prevBtn);
            monthNav.appendChild(monthDisplay);
            monthNav.appendChild(nextBtn);
            calendarView.appendChild(monthNav);
            
            // Calendar grid
            const calendarGrid = document.createElement('div');
            calendarGrid.classList.add('grid', 'grid-cols-7', 'gap-1');
            calendarGrid.setAttribute('role', 'grid');
            calendarGrid.setAttribute('aria-labelledby', 'calendar-title');
            
            // Days of week
            const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            daysOfWeek.forEach(day => {
                const dayElem = document.createElement('div');
                dayElem.classList.add('text-center', 'py-2', 'font-bold', 'text-gray-600');
                dayElem.setAttribute('role', 'columnheader');
                dayElem.textContent = day;
                calendarGrid.appendChild(dayElem);
            });
            
            // Generate current month days
            const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
            const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
            
            // Empty cells for previous month
            for (let i = 0; i < firstDay; i++) {
                const emptyDay = document.createElement('div');
                emptyDay.classList.add('text-center', 'py-2', 'bg-gray-100', 'text-gray-400');
                emptyDay.setAttribute('role', 'gridcell');
                emptyDay.setAttribute('aria-hidden', 'true');
                calendarGrid.appendChild(emptyDay);
            }
            
            // Current month days
            for (let i = 1; i <= daysInMonth; i++) {
                const dayElem = document.createElement('div');
                dayElem.classList.add('border', 'text-center', 'py-2', 'hover:bg-gray-100', 'cursor-pointer');
                dayElem.setAttribute('role', 'gridcell');
                dayElem.setAttribute('tabindex', '0');
                dayElem.textContent = i;
                
                // Simulate some days having available slots and some being booked
                const hasSlots = Math.random() > 0.3; // 70% chance of having slots available
                if (!hasSlots) {
                    dayElem.classList.add('bg-gray-200', 'text-gray-500');
                    dayElem.title = 'No available slots';
                    dayElem.setAttribute('aria-disabled', 'true');
                }                 else {
                    dayElem.classList.add('hover:bg-green-100');
                    dayElem.addEventListener('click', () => showTimeSlots(i, calendarModal));
                    dayElem.addEventListener('keypress', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            showTimeSlots(i, calendarModal);
                        }
                    });
                }
                
                calendarGrid.appendChild(dayElem);
            }
            
            calendarView.appendChild(calendarGrid);
            calendarModal.appendChild(calendarView);
            
            // Selected slots display
            const selectedSlots = document.createElement('div');
            selectedSlots.id = 'selected-slots';
            selectedSlots.classList.add('mt-6', 'p-4', 'bg-gray-100', 'rounded');
            selectedSlots.setAttribute('aria-live', 'polite');
            selectedSlots.innerHTML = '<h4 class="font-bold mb-2">Your Selected Time Slots:</h4><p class="text-gray-600">No time slots selected yet.</p>';
            calendarModal.appendChild(selectedSlots);
            
            // Confirm button
            const confirmBtn = document.createElement('button');
            confirmBtn.classList.add('bg-green-700', 'text-white', 'px-6', 'py-3', 'rounded-full', 'font-bold', 'hover:bg-green-800', 'hover:shadow-lg', 'transition', 'duration-300', 'w-full', 'mt-6');
            confirmBtn.textContent = 'Confirm Bookings';
            confirmBtn.addEventListener('click', () => {
                alert('Thank you for booking your sessions! You will receive a confirmation email shortly with all the details.');
                overlay.remove();
            });
            calendarModal.appendChild(confirmBtn);
            
            overlay.appendChild(calendarModal);
            document.body.appendChild(overlay);
            
            // Focus trap for accessibility
            const focusableElements = calendarModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];
            
            // Set focus to the first focusable element
            firstFocusable.focus();
            
            // Handle Tab key navigation
            overlay.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    overlay.remove();
                }
                
                if (e.key === 'Tab') {
                    // Trap focus inside the modal
                    if (e.shiftKey && document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            });
        }
        
        function showTimeSlots(day, calendarModal) {
            // Create time slots modal
            const timeSlotsOverlay = document.createElement('div');
            timeSlotsOverlay.classList.add('absolute', 'inset-0', 'bg-black', 'bg-opacity-30', 'flex', 'items-center', 'justify-center');
            timeSlotsOverlay.setAttribute('role', 'dialog');
            timeSlotsOverlay.setAttribute('aria-modal', 'true');
            timeSlotsOverlay.setAttribute('aria-labelledby', 'time-slots-title');
            
            const timeSlotsModal = document.createElement('div');
            timeSlotsModal.classList.add('bg-white', 'p-6', 'rounded-lg', 'shadow-xl', 'max-w-md', 'w-full');
            
            // Time slots header
            const header = document.createElement('div');
            header.classList.add('flex', 'justify-between', 'items-center', 'mb-6');
            
            const title = document.createElement('h3');
            title.id = 'time-slots-title';
            title.classList.add('text-xl', 'font-bold', 'text-green-700');
            const currentDate = new Date();
            const monthName = currentDate.toLocaleString('default', { month: 'long' });
            title.textContent = `Available Slots - ${monthName} ${day}`;
            
            const closeBtn = document.createElement('button');
            closeBtn.classList.add('text-gray-500', 'hover:text-gray-800');
            closeBtn.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';
            closeBtn.setAttribute('aria-label', 'Close time slots');
            closeBtn.addEventListener('click', () => timeSlotsOverlay.remove());
            
            header.appendChild(title);
            header.appendChild(closeBtn);
            timeSlotsModal.appendChild(header);
            
            // Time slots grid
            const timeSlots = document.createElement('div');
            timeSlots.classList.add('grid', 'grid-cols-2', 'gap-3');
            
            // Simulate available time slots
            const availableTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'];
            
            // Randomly mark some as booked
            availableTimes.forEach(time => {
                const slot = document.createElement('div');
                const isBooked = Math.random() > 0.7; // 30% chance of being already booked
                
                if (isBooked) {
                    slot.classList.add('py-2', 'px-4', 'bg-gray-200', 'text-gray-500', 'rounded', 'text-center');
                    slot.setAttribute('aria-disabled', 'true');
                    slot.textContent = `${time} - Booked`;
                } else {
                    slot.classList.add('py-2', 'px-4', 'bg-green-100', 'hover:bg-green-200', 'text-green-800', 'rounded', 'text-center', 'cursor-pointer');
                    slot.setAttribute('tabindex', '0');
                    slot.setAttribute('role', 'button');
                    slot.textContent = time;
                    slot.addEventListener('click', () => {
                        selectTimeSlot(`${monthName} ${day}, ${time}`);
                        timeSlotsOverlay.remove();
                    });
                    slot.addEventListener('keypress', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            selectTimeSlot(`${monthName} ${day}, ${time}`);
                            timeSlotsOverlay.remove();
                        }
                    });
                }
                
                timeSlots.appendChild(slot);
            });
            
            timeSlotsModal.appendChild(timeSlots);
            timeSlotsOverlay.appendChild(timeSlotsModal);
            calendarModal.appendChild(timeSlotsOverlay);
            
            // Focus trap for time slots modal
            const focusableElements = timeSlotsModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];
            
            // Set focus to the first focusable element
            firstFocusable.focus();
            
            // Handle Tab key navigation
            timeSlotsOverlay.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    timeSlotsOverlay.remove();
                }
                
                if (e.key === 'Tab') {
                    // Trap focus inside the modal
                    if (e.shiftKey && document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            });
        }
        
        function selectTimeSlot(timeSlot) {
            const selectedSlots = document.getElementById('selected-slots');
            if (selectedSlots) {
                // Check if there's already a selection
                const noSlotsText = selectedSlots.querySelector('p.text-gray-600');
                
                if (noSlotsText && noSlotsText.textContent === 'No time slots selected yet.') {
                    // This is the first selection, clear the "no slots" message
                    selectedSlots.innerHTML = '<h4 class="font-bold mb-2">Your Selected Time Slots:</h4>';
                    const slotsList = document.createElement('ul');
                    slotsList.classList.add('space-y-2');
                    selectedSlots.appendChild(slotsList);
                }
                
                // Get or create the slots list
                let slotsList = selectedSlots.querySelector('ul');
                if (!slotsList) {
                    slotsList = document.createElement('ul');
                    slotsList.classList.add('space-y-2');
                    selectedSlots.appendChild(slotsList);
                }
                
                // Add the new time slot
                const slotItem = document.createElement('li');
                slotItem.classList.add('flex', 'justify-between', 'items-center');
                
                const slotText = document.createElement('span');
                slotText.textContent = timeSlot;
                slotText.classList.add('text-green-800');
                
                const removeBtn = document.createElement('button');
                removeBtn.classList.add('text-red-500', 'hover:text-red-700');
                removeBtn.innerHTML = '<i class="fas fa-times-circle" aria-hidden="true"></i>';
                removeBtn.setAttribute('aria-label', `Remove ${timeSlot}`);
                removeBtn.addEventListener('click', () => {
                    slotItem.remove();
                    
                    // If no slots left, restore the "no slots" message
                    if (slotsList.children.length === 0) {
                        selectedSlots.innerHTML = '<h4 class="font-bold mb-2">Your Selected Time Slots:</h4><p class="text-gray-600">No time slots selected yet.</p>';
                    }
                });
                
                slotItem.appendChild(slotText);
                slotItem.appendChild(removeBtn);
                slotsList.appendChild(slotItem);
                
                // Announce to screen readers that the slot was added
                const announcement = document.createElement('div');
                announcement.classList.add('sr-only');
                announcement.setAttribute('aria-live', 'polite');
                announcement.textContent = `Added time slot: ${timeSlot}`;
                selectedSlots.appendChild(announcement);
                
                // Remove the announcement after it's been read
                setTimeout(() => {
                    announcement.remove();
                }, 3000);
            }
        }
    </script>
