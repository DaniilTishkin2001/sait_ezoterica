// Performance-optimized JavaScript with code splitting
// Target: TBT < 150ms, Performance Score > 90

class PerformanceOptimizer {
    constructor() {
        this.isMobile = window.innerWidth < 768;
        this.isTouch = 'ontouchstart' in window;
        this.loadedModules = new Set();
        this.init();
    }

    init() {
        // Critical path - runs immediately
        this.setupCriticalFeatures();
        
        // Non-critical - deferred with requestIdleCallback
        this.scheduleNonCritical();
        
        // Analytics - lowest priority
        this.scheduleAnalytics();
    }

    setupCriticalFeatures() {
        // Essential navigation functionality
        this.setupMobileMenu();
        this.setupSmoothScroll();
        
        // Prevent layout shifts
        this.preventCLS();
        
        // Mark page as loaded
        requestAnimationFrame(() => {
            document.body.classList.add('loaded');
        });
    }

    scheduleNonCritical() {
        const loadWhenIdle = (callback, priority = 1) => {
            if ('requestIdleCallback' in window) {
                requestIdleCallback(callback, { timeout: 2000 * priority });
            } else {
                setTimeout(callback, 100 * priority);
            }
        };

        // High priority: Carousel (user interaction)
        loadWhenIdle(() => this.loadModule('carousel', this.initCarousel), 1);
        
        // Medium priority: Animations
        loadWhenIdle(() => this.loadModule('animations', this.initAnimations), 2);
        
        // Low priority: Image effects
        loadWhenIdle(() => this.loadModule('effects', this.initEffects), 3);
    }

    scheduleAnalytics() {
        // Load analytics after 3 seconds
        setTimeout(() => {
            this.loadModule('analytics', this.initAnalytics);
        }, 3000);
    }

    async loadModule(name, initFn) {
        if (this.loadedModules.has(name)) return;
        
        try {
            switch(name) {
                case 'carousel':
                    await this.loadScript('/js/final-carousel.js', 'module');
                    break;
                case 'animations':
                    await this.loadScript('https://unpkg.com/aos@2.3.1/dist/aos.js');
                    break;
                case 'effects':
                    if (!this.isMobile) {
                        await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.0/vanilla-tilt.min.js');
                    }
                    break;
                case 'analytics':
                    this.initAnalytics();
                    // Performance Optimized JavaScript - FINAL VERSION
// Target: TBT < 150ms, Performance Score > 90

// Immediately add loaded class for visual
document.body.classList.add('loaded');

// Performance monitoring
if ('PerformanceObserver' in window) {
    new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.startTime);
            }
            if (entry.entryType === 'layout-shift') {
                console.log('CLS:', entry.value);
            }
        });
    }).observe({ entryTypes: ['largest-contentful-paint', 'layout-shift'] });
}

// Mobile menu with passive listeners
document.addEventListener('DOMContentLoaded', function() {
    // Prevent CLS - reserve space for images
    document.querySelectorAll('img[width][height]').forEach(img => {
        img.style.aspectRatio = img.width + '/' + img.height;
    });
    
    // Mobile menu
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const dropdown = document.querySelector('.mobile-dropdown');
    
    if (menuBtn && dropdown) {
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', dropdown.classList.contains('active'));
        }, { passive: true });
    }
    
    // Smooth scroll with passive listener
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }, { passive: true });
    });
});

// Lazy loading for images (native support check)
if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported
    console.log('Native lazy loading supported');
} else {
    // Fallback for older browsers
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Optimized scroll events with throttling
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll-based animations here
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}, { passive: true });

// Touch optimization for mobile
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', () => {}, { passive: true });
    document.addEventListener('touchmove', () => {}, { passive: true });
}

// Preload critical resources
function preloadCriticalResources() {
    const criticalResources = [
        { href: 'img/5296603349773916432.webp', as: 'image' },
        { href: 'css/style.css', as: 'style' }
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        document.head.appendChild(link);
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadCriticalResources);
} else {
    preloadCriticalResources();
}
                    break;
            }
            
            if (initFn) initFn();
            this.loadedModules.add(name);
        } catch (error) {
            console.warn(`Failed to load ${name}:`, error);
        }
    }

    loadScript(src, type = 'text/javascript') {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.type = type;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    setupMobileMenu() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const dropdown = document.querySelector('.mobile-dropdown');
        
        if (!menuBtn || !dropdown) return;

        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', 
                dropdown.classList.contains('active'));
        }, { passive: true });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, { passive: true });
        });
    }

    preventCLS() {
        // Reserve space for images to prevent layout shifts
        document.querySelectorAll('img[width][height]').forEach(img => {
            img.style.aspectRatio = `${img.width} / ${img.height}`;
        });
    }

    initCarousel() {
        // Carousel initialization - minimal code
        console.log('Carousel loaded');
    }

    initAnimations() {
        // AOS initialization with mobile optimizations
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: this.isMobile ? 600 : 800,
                once: true,
                offset: this.isMobile ? 30 : 100,
                disable: this.isMobile && window.innerWidth < 480
            });
        }
    }

    initEffects() {
        // Vanilla Tilt for desktop only
        if (typeof VanillaTilt !== 'undefined') {
            document.querySelectorAll('.special-card').forEach(card => {
                VanillaTilt.init(card, {
                    max: 10,
                    speed: 400,
                    glare: true,
                    'max-glare': 0.3
                });
            });
        }
    }

    initAnalytics() {
        // Lazy load analytics
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: document.title,
                page_location: window.location.href
            });
        }
        
        // Yandex Metrica
        if (typeof ym !== 'undefined') {
            ym(YANDEX_METRIC_ID, 'init', {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true
            });
        }
    }
}

// Initialize with performance monitoring
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.startTime);
            }
            if (entry.entryType === 'layout-shift') {
                console.log('CLS:', entry.value);
            }
        });
    });
    
    perfObserver.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift'] });
}

// Initialize performance optimizer
new PerformanceOptimizer();
