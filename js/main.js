// Ekow AI Technologies - Main JavaScript
// Professional interactions and functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initEmailCapture();
    initAnimations();
    initMobileMenu();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const ctaButtons = document.querySelectorAll('.nav-cta');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // CTA button functionality
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            scrollToEmailCapture();
        });
    });
}

// Enhanced scroll effects and animations
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Trigger count-up animation for statistics
                if (entry.target.classList.contains('stat')) {
                    animateStatNumber(entry.target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.founder-card, .tech-card, .product-card, .section-header, .stat');
    animateElements.forEach(el => observer.observe(el));
    
    // Enhanced parallax effects
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const heroBackground = document.querySelector('.hero-background');
        const eagleSilhouette = document.querySelector('.eagle-silhouette');
        const particles = document.querySelectorAll('.particle');
        
        if (heroBackground) {
            heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
        
        if (eagleSilhouette) {
            eagleSilhouette.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0) rotate(${scrolled * 0.02}deg)`;
        }
        
        // Parallax effect for particles
        particles.forEach((particle, index) => {
            const speed = 0.1 + (index * 0.05);
            particle.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Smooth reveal animations for sections
    const revealElements = document.querySelectorAll('.tech-card, .product-card, .founder-card');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
}

// Count-up animation for statistics
function animateStatNumber(statElement) {
    const numberElement = statElement.querySelector('.stat-number');
    const finalNumber = numberElement.textContent;
    
    // Handle different types of numbers
    if (finalNumber === 'First') {
        // Animate text reveal for "First"
        numberElement.style.opacity = '0';
        setTimeout(() => {
            numberElement.style.opacity = '1';
            numberElement.style.transform = 'scale(1.1)';
            setTimeout(() => {
                numberElement.style.transform = 'scale(1)';
            }, 200);
        }, 300);
        return;
    }
    
    // Extract number from text like "40+"
    const numericValue = parseInt(finalNumber.replace(/\D/g, ''));
    const suffix = finalNumber.replace(/\d/g, '');
    
    if (isNaN(numericValue)) return;
    
    let currentNumber = 0;
    const increment = numericValue / 60; // 60 frames for smooth animation
    const duration = 2000; // 2 seconds
    const frameRate = duration / 60;
    
    numberElement.textContent = '0' + suffix;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= numericValue) {
            currentNumber = numericValue;
            clearInterval(timer);
        }
        numberElement.textContent = Math.floor(currentNumber) + suffix;
    }, frameRate);
}

// Email capture functionality
function initEmailCapture() {
    const emailForm = document.getElementById('emailForm');
    const submitButton = emailForm.querySelector('.submit-button');
    
    emailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(emailForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            role: formData.get('role')
        };
        
        // Validate form
        if (!validateForm(data)) {
            return;
        }
        
        // Show loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            handleFormSubmission(data);
        }, 2000);
    });
}

// Form validation
function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.role) {
        errors.push('Please select your role in football');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('. '), 'error');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle form submission
function handleFormSubmission(data) {
    const submitButton = document.querySelector('.submit-button');
    
    // In a real implementation, you would send this to your backend
    // For now, we'll simulate a successful submission
    console.log('Form submitted:', data);
    
    // Show success message
    showNotification('Welcome to the revolution! Check your email for exclusive updates.', 'success');
    
    // Reset form
    document.getElementById('emailForm').reset();
    
    // Reset button state
    submitButton.classList.remove('loading');
    submitButton.disabled = false;
    
    // Track conversion (replace with actual analytics)
    trackConversion('email_signup', data);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        z-index: 10000;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-weight: 500;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

// Animation initialization
function initAnimations() {
    // Add CSS for mobile menu animation
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 80px;
                left: 0;
                right: 0;
                background: rgba(248, 255, 254, 0.98);
                backdrop-filter: blur(20px);
                flex-direction: column;
                padding: 32px 24px;
                transform: translateY(-100%);
                transition: transform 0.3s ease;
                border-bottom: 1px solid rgba(107, 114, 128, 0.1);
            }
            
            .nav-menu.active {
                transform: translateY(0);
            }
            
            .hamburger.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
            
            .menu-open {
                overflow: hidden;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.2s ease;
        }
        
        .notification-close:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }
        
        .navbar.scrolled {
            background: rgba(248, 255, 254, 0.98);
            box-shadow: 0 2px 20px rgba(11, 20, 38, 0.1);
        }
    `;
    document.head.appendChild(style);
}

// Utility functions
function scrollToEmailCapture() {
    const emailSection = document.getElementById('contact');
    if (emailSection) {
        const offsetTop = emailSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        const offsetTop = productsSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Analytics tracking (replace with actual implementation)
function trackConversion(event, data) {
    // Google Analytics 4 example
    if (typeof gtag !== 'undefined') {
        gtag('event', event, {
            'custom_parameter_1': data.role,
            'custom_parameter_2': 'landing_page'
        });
    }
    
    // Facebook Pixel example
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_category: 'AI_Football_Technology'
        });
    }
    
    console.log('Conversion tracked:', event, data);
}

// Performance optimization
function optimizeImages() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizeImages);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Export functions for global access
window.EkowAI = {
    scrollToEmailCapture,
    scrollToProducts,
    trackConversion,
    showNotification
};
