// trueLinQ Static Landing Page JavaScript
class TrueLinQApp {
    constructor() {
        this.theme = 'light';
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.initTheme();
        this.initMobileMenu();
        this.initButtonHandlers();
        this.initScrollIndicator();
        this.initSmoothScrolling();
        this.initFlowRevealAnimation();
        console.log('trueLinQ application initialized');
    }

    // Theme Management
    initTheme() {
        // Check for saved theme preference or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        this.theme = savedTheme || systemTheme;
        
        // Apply initial theme
        this.applyTheme(this.theme);
        
        // Set up theme toggle buttons (desktop and mobile)
        const themeToggles = document.querySelectorAll('[data-testid^="button-theme-toggle"]');
        themeToggles.forEach(toggle => {
            toggle.addEventListener('click', () => this.toggleTheme());
        });
        this.updateThemeIcon();

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.theme = e.matches ? 'dark' : 'light';
                this.applyTheme(this.theme);
                this.updateThemeIcon();
            }
        });
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateThemeIcon();
        console.log(`Theme changed to ${this.theme}`);
    }

    applyTheme(theme) {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }

    updateThemeIcon() {
        const themeButtons = document.querySelectorAll('[data-testid^="button-theme-toggle"]');
        const iconHTML = this.theme === 'light' 
            ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>'
            : '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>';
        
        themeButtons.forEach(button => {
            const iconContainer = button.querySelector('.theme-icon');
            if (iconContainer) {
                iconContainer.innerHTML = iconHTML;
            }
        });
    }

    // Mobile Menu Management
    initMobileMenu() {
        const menuButton = document.querySelector('[data-testid="button-mobile-menu"]');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (menuButton && mobileMenu) {
            menuButton.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu when clicking on navigation links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    this.toggleMobileMenu();
                }
            });
        });
    }

    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        const mobileMenu = document.querySelector('.mobile-menu');
        const menuButton = document.querySelector('[data-testid="button-mobile-menu"]');
        const iconContainer = menuButton?.querySelector('.menu-icon');
        
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden', !this.isMenuOpen);
        }
        
        if (iconContainer) {
            iconContainer.innerHTML = this.isMenuOpen
                ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
                : '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
        }
    }

    // Button Handlers
    initButtonHandlers() {
        // Hero section buttons
        const getStartedBtn = document.querySelector('[data-testid="button-get-started"]');
        const learnMoreBtn = document.querySelector('[data-testid="button-learn-more"]');
        
        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', this.handleGetStarted.bind(this));
        }
        
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', this.handleLearnMore.bind(this));
        }

        // Navigation buttons
        const signInBtn = document.querySelector('[data-testid="button-sign-in"]');
        const signUpBtn = document.querySelector('[data-testid="button-sign-up"]');
        const mobileSignInBtn = document.querySelector('[data-testid="mobile-button-sign-in"]');
        const mobileSignUpBtn = document.querySelector('[data-testid="mobile-button-sign-up"]');
        
        if (signInBtn) signInBtn.addEventListener('click', this.handleSignIn.bind(this));
        if (signUpBtn) signUpBtn.addEventListener('click', this.handleSignUp.bind(this));
        if (mobileSignInBtn) mobileSignInBtn.addEventListener('click', this.handleSignIn.bind(this));
        if (mobileSignUpBtn) mobileSignUpBtn.addEventListener('click', this.handleSignUp.bind(this));

        // Feature cards click effects
        const featureCards = document.querySelectorAll('[data-testid^="card-feature-"]');
        featureCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const cardIndex = e.currentTarget.dataset.testid.split('-').pop();
                this.handleFeatureCardClick(cardIndex);
            });
        });
    }

    // Event Handlers
    handleGetStarted() {
        console.log('Get Started clicked');
        // Scroll to features section
        const featuresSection = document.querySelector('#features');
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
        // Show alert for demo purposes
        this.showNotification('Get Started clicked! This would normally redirect to signup.');
    }

    handleLearnMore() {
        console.log('Learn More clicked');
        // Scroll to features section
        const featuresSection = document.querySelector('#features');
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    handleSignIn() {
        console.log('Sign In clicked');
        this.showNotification('Sign In clicked! This would normally open the login form.');
    }

    handleSignUp() {
        console.log('Sign Up clicked');
        this.showNotification('Sign Up clicked! This would normally open the registration form.');
    }

    handleFeatureCardClick(index) {
        console.log(`Feature card ${index} clicked`);
        const features = [
            'Identity Verification',
            'Fraud Alerts',
            'Company Verification',
            'Consumer Reporting'
        ];
        const featureName = features[index] || 'Feature';
        this.showNotification(`${featureName} feature clicked! This would show more details.`);
    }

    // Smooth Scrolling for Navigation Links
    initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Scroll Indicator Animation
    initScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const featuresSection = document.querySelector('#features');
                if (featuresSection) {
                    featuresSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    // Scroll to pillars section if features not found
                    const pillarsSection = document.querySelector('.pillars-section');
                    if (pillarsSection) {
                        pillarsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        }
    }

    // Flow Reveal Animation on Scroll
    initFlowRevealAnimation() {
        const flowSteps = document.querySelectorAll('.flow-reveal');
        
        // Check if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            flowSteps.forEach(step => {
                // Initially hide elements if animations are enabled
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    step.style.opacity = '0';
                    step.style.transform = 'translateY(20px)';
                    step.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                }
                observer.observe(step);
            });
        }
    }

    // Notification System (for demo purposes)
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        
        // Add accessibility attributes
        notification.setAttribute('role', 'status');
        notification.setAttribute('aria-live', 'polite');
        notification.setAttribute('aria-atomic', 'true');
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #000000;
            color: #ffffff;
            border: 1px solid #333333;
            border-radius: 8px;
            padding: 16px 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 1001;
            max-width: 350px;
            font-size: 14px;
            line-height: 1.4;
            transform: translateX(100%);
            transition: transform 0.3s ease-out;
        `;
        
        // On mobile, adjust positioning
        if (window.innerWidth < 640) {
            notification.style.cssText += `
                left: 20px;
                right: 20px;
                max-width: calc(100% - 40px);
                text-align: center;
            `;
        }
        
        notification.textContent = message;

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
        
        // Log for debugging
        console.log('Notification shown:', message);
    }

    // Utility Methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Handle window resize for responsive adjustments
    initResizeHandler() {
        const handleResize = this.debounce(() => {
            // Adjust mobile menu on resize
            if (window.innerWidth >= 768 && this.isMenuOpen) {
                this.toggleMobileMenu();
            }
        }, 250);

        window.addEventListener('resize', handleResize);
    }

    // Initialize performance monitoring (optional)
    initPerformanceMonitoring() {
        // Log performance metrics
        window.addEventListener('load', () => {
            setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                const paintEntries = performance.getEntriesByType('paint');
                
                console.log('Performance Metrics:');
                console.log(`- DOM Content Loaded: ${navigation.domContentLoadedEventEnd - navigation.navigationStart}ms`);
                console.log(`- Page Load: ${navigation.loadEventEnd - navigation.navigationStart}ms`);
                
                paintEntries.forEach(paint => {
                    console.log(`- ${paint.name}: ${paint.startTime}ms`);
                });
            }, 0);
        });
    }
}

// Initialize the application
const app = new TrueLinQApp();

// Initialize additional features
document.addEventListener('DOMContentLoaded', () => {
    app.initResizeHandler();
    app.initPerformanceMonitoring();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TrueLinQApp;
}

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
});