// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (mobileMenuToggle && navMenu) {
    // Toggle menu on button click
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target) && navMenu.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// Navbar Transition on Scroll
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Search Button functionality
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-bar input');

if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            console.log(`Searching for: ${query}`);
            // In a real app, you would redirect to search page:
            // window.location.href = `/search?q=${encodeURIComponent(query)}`;
            searchInput.value = ''; // Clear input for demo
        } else {
            searchInput.focus();
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

// Smooth Scroll for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Section Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Enhanced Scroll Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-on-scroll').forEach(el => {
    observer.observe(el);
});

// Button Ripple Effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Testimonials Slider: Duplicate info for infinite loop
const sliderTrack = document.getElementById('slider-track');
if (sliderTrack) {
    const cards = sliderTrack.innerHTML;
    sliderTrack.innerHTML += cards; // Duplicate content once to create the loop
}

// Contact Form Handling with Formspree
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;

        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Hide any previous status messages
        formStatus.classList.remove('show', 'success', 'error');

        try {
            // Submit form to Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success - show success message
                formStatus.textContent = '✓ Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
                formStatus.classList.add('show', 'success');

                // Reset form
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    formStatus.classList.remove('show');
                }, 5000);
            } else {
                // Error from Formspree
                const data = await response.json();
                if (data.errors) {
                    formStatus.textContent = '✗ ' + data.errors.map(error => error.message).join(', ');
                } else {
                    formStatus.textContent = '✗ Oops! There was a problem sending your message. Please try again.';
                }
                formStatus.classList.add('show', 'error');
            }
        } catch (error) {
            // Network or other error
            formStatus.textContent = '✗ Network error. Please check your connection and try again.';
            formStatus.classList.add('show', 'error');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });

    // Basic client-side validation feedback
    const formInputs = contactForm.querySelectorAll('input[required], textarea[required]');
    formInputs.forEach(input => {
        input.addEventListener('invalid', (e) => {
            e.preventDefault();
            input.classList.add('error');
        });

        input.addEventListener('input', () => {
            input.classList.remove('error');
        });
    });
}

// SIP Calculator Functionality
const calculateBtn = document.getElementById('calculate-sip');
const resultsContainer = document.getElementById('calculator-results');

if (calculateBtn && resultsContainer) {
    calculateBtn.addEventListener('click', function () {
        // Get input values
        const monthlyInvestment = parseFloat(document.getElementById('monthly-investment').value);
        const tenureYears = parseFloat(document.getElementById('investment-tenure').value);
        const annualReturnRate = parseFloat(document.getElementById('return-rate').value);

        // Validate inputs
        if (!monthlyInvestment || !tenureYears || !annualReturnRate) {
            alert('Please fill in all fields with valid numbers.');
            return;
        }

        if (monthlyInvestment <= 0 || tenureYears <= 0 || annualReturnRate < 0) {
            alert('Please enter positive values for all fields.');
            return;
        }

        // Calculate SIP
        const monthlyRate = annualReturnRate / 12 / 100; // Convert annual rate to monthly decimal
        const totalMonths = tenureYears * 12;

        // SIP Future Value Formula: FV = P × ((1 + r)^n - 1) / r × (1 + r)
        let futureValue;
        if (monthlyRate === 0) {
            // If rate is 0, simple multiplication
            futureValue = monthlyInvestment * totalMonths;
        } else {
            futureValue = monthlyInvestment * (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
        }

        const totalInvested = monthlyInvestment * totalMonths;
        const estimatedReturns = futureValue - totalInvested;

        // Format numbers with US Dollar currency style
        const formatCurrency = (num) => {
            return '$' + num.toLocaleString('en-US', {
                maximumFractionDigits: 0,
                minimumFractionDigits: 0
            });
        };

        // Update result displays
        document.getElementById('total-invested').textContent = formatCurrency(totalInvested);
        document.getElementById('estimated-returns').textContent = formatCurrency(estimatedReturns);
        document.getElementById('maturity-amount').textContent = formatCurrency(futureValue);

        // Show results with animation
        resultsContainer.style.display = 'grid';

        // Trigger fade-in animation for result cards
        setTimeout(() => {
            const resultCards = resultsContainer.querySelectorAll('.result-card');
            resultCards.forEach(card => {
                card.classList.add('visible');
            });
        }, 100);

        // Smooth scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    // Allow Enter key to trigger calculation
    const calculatorInputs = document.querySelectorAll('.calculator-input-group input');
    calculatorInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                calculateBtn.click();
            }
        });
    });
}

// ===================================
// QR Code Modal Functionality
// ===================================

const floatingQrIcon = document.getElementById('floating-qr-icon');
const qrModal = document.getElementById('qr-modal');
const qrModalClose = document.getElementById('qr-modal-close');
const qrModalOverlay = qrModal?.querySelector('.qr-modal-overlay');

if (floatingQrIcon && qrModal && qrModalClose && qrModalOverlay) {
    // Open modal when clicking the floating icon
    floatingQrIcon.addEventListener('click', () => {
        qrModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    // Close modal when clicking the close button
    qrModalClose.addEventListener('click', () => {
        qrModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close modal when clicking the overlay (outside the content)
    qrModalOverlay.addEventListener('click', () => {
        qrModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close modal when pressing ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && qrModal.classList.contains('active')) {
            qrModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
}
