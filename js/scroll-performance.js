// High-Performance Scroll Optimizer with RAF
class PerformanceScroll {
    constructor() {
        this.isTicking = false;
        this.lastScrollY = 0;
        this.scrollDirection = 'down';
        this.headerHidden = false;
        this.lazyElements = new Set();
        this.init();
    }

    init() {
        this.setupHeaderScroll();
        this.setupLazyLoading();
        this.setupEventListeners();
    }

    setupHeaderScroll() {
        this.headerElement = document.querySelector('.header');
        if (!this.headerElement) return;
    }

    setupLazyLoading() {
        // Find all elements with lazy-load class or data-lazy attribute
        document.querySelectorAll('.lazy-load, [data-lazy]').forEach(element => {
            this.lazyElements.add(element);
        });
    }

    setupEventListeners() {
        // Passive scroll listener for better performance
        window.addEventListener('scroll', this.handleScroll.bind(this), { 
            passive: true,
            capture: false 
        });

        // Resize listener with debouncing
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.lastScrollY = 0; // Reset on resize
            }, 150);
        });
    }

    handleScroll() {
        if (!this.isTicking) {
            requestAnimationFrame(this.updateScroll.bind(this));
            this.isTicking = true;
        }
    }

    updateScroll() {
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        // Determine scroll direction
        this.scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
        
        // Handle header auto-hide
        this.updateHeader(currentScrollY);
        
        // Handle lazy loading
        this.updateLazyElements(currentScrollY);
        
        // Update last scroll position
        this.lastScrollY = currentScrollY;
        
        // Reset ticking flag
        this.isTicking = false;
    }

    updateHeader(scrollY) {
        if (!this.headerElement) return;

        const shouldHide = scrollY > 100 && this.scrollDirection === 'down';
        
        if (shouldHide !== this.headerHidden) {
            this.headerHidden = shouldHide;
            this.headerElement.style.transform = shouldHide 
                ? 'translateY(-100%)' 
                : 'translateY(0)';
            this.headerElement.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
    }

    updateLazyElements(scrollY) {
        const viewportHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollProgress = scrollY / (documentHeight - viewportHeight);
        
        // Only process lazy loading in middle of page to avoid excessive checks
        if (scrollProgress < 0.1 || scrollProgress > 0.9) return;

        this.lazyElements.forEach(element => {
            if (this.isElementInViewport(element, viewportHeight, scrollY)) {
                this.loadElement(element);
                this.lazyElements.delete(element);
            }
        });
    }

    isElementInViewport(element, viewportHeight, scrollY) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementBottom = elementTop + rect.height;
        
        // Load when element is within 200px of viewport
        return elementTop < scrollY + viewportHeight + 200 && 
               elementBottom > scrollY - 200;
    }

    loadElement(element) {
        // Handle different types of lazy elements
        if (element.tagName === 'IMG') {
            this.loadImage(element);
        } else if (element.style.backgroundImage) {
            this.loadBackgroundImage(element);
        } else if (element.dataset.src) {
            this.loadDataSrc(element);
        }

        // Add loaded class for animations
        element.classList.add('loaded');
        element.style.opacity = '1';
    }

    loadImage(img) {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        }
    }

    loadBackgroundImage(element) {
        if (element.dataset.bg) {
            element.style.backgroundImage = element.dataset.bg;
            element.removeAttribute('data-bg');
        }
    }

    loadDataSrc(element) {
        if (element.dataset.src) {
            element.src = element.dataset.src;
            element.removeAttribute('data-src');
        }
    }
}

// Initialize scroll optimizer
new PerformanceScroll();
