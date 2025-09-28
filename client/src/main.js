// Vanilla JavaScript replacement for React functionality
class OneIDApp {
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
    console.log('OneID application initialized');
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
      getStartedBtn.addEventListener('click', this.handleGetStarted);
    }
    
    if (learnMoreBtn) {
      learnMoreBtn.addEventListener('click', this.handleLearnMore);
    }

    // Navigation buttons
    const signInBtn = document.querySelector('[data-testid="button-sign-in"]');
    const signUpBtn = document.querySelector('[data-testid="button-sign-up"]');
    const mobileSignInBtn = document.querySelector('[data-testid="mobile-button-sign-in"]');
    const mobileSignUpBtn = document.querySelector('[data-testid="mobile-button-sign-up"]');
    
    if (signInBtn) signInBtn.addEventListener('click', this.handleSignIn);
    if (signUpBtn) signUpBtn.addEventListener('click', this.handleSignUp);
    if (mobileSignInBtn) mobileSignInBtn.addEventListener('click', this.handleSignIn);
    if (mobileSignUpBtn) mobileSignUpBtn.addEventListener('click', this.handleSignUp);

    // Feature cards hover effects
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
    // TODO: Add real navigation/modal functionality
  }

  handleLearnMore() {
    console.log('Learn More clicked');
    // TODO: Add real navigation/scroll functionality
  }

  handleSignIn() {
    console.log('Sign In clicked');
    // TODO: Add real authentication
  }

  handleSignUp() {
    console.log('Sign Up clicked');
    // TODO: Add real authentication
  }

  handleFeatureCardClick(index) {
    console.log(`Feature card ${index} clicked`);
    // TODO: Add modal or navigation functionality
  }

  // Scroll Indicator Animation
  initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      // Add smooth scrolling behavior
      scrollIndicator.addEventListener('click', () => {
        document.querySelector('#features')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      });
    }
  }
}

// Initialize the application
const app = new OneIDApp();

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = OneIDApp;
}