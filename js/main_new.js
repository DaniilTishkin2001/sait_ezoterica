// Telegram Button Scroll Animation
class TelegramButtonScroller {
    constructor() {
        this.button = document.querySelector('.telegram-float-btn');
        this.init();
    }

    init() {
        if (!this.button) return;

        // Show button after initial load
        setTimeout(() => {
            this.button.classList.add('visible');
        }, 1000);

        // Setup scroll animation
        this.setupScrollAnimation();
    }

    setupScrollAnimation() {
        let ticking = false;

        const updateButtonPosition = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.updatePosition();
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Smooth scroll listener
        window.addEventListener('scroll', updateButtonPosition, { passive: true });

        // Initial position
        this.updatePosition();
    }

    updatePosition() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const buttonHeight = this.button.offsetHeight;
        
        // Calculate scroll progress (0 to 1)
        const scrollableHeight = documentHeight - windowHeight;
        const scrollProgress = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;
        
        // Calculate button position from very top to very bottom
        const availableHeight = documentHeight - buttonHeight;
        const currentPosition = scrollProgress * availableHeight;
        
        // Apply position with smooth transition
        this.button.style.top = `${currentPosition}px`;
        
        // Add subtle scale effect based on scroll
        const scale = 1 + (scrollProgress * 0.1);
        this.button.style.transform = `translateX(0) scale(${scale})`;
        
        // Change opacity slightly based on scroll
        const opacity = 0.8 + (scrollProgress * 0.2);
        this.button.style.opacity = opacity;
    }
}

// Initialize Telegram button scroller
document.addEventListener('DOMContentLoaded', () => {
    window.telegramButtonScroller = new TelegramButtonScroller();
});

// Unified Scroll Handler - see scroll-optimizer.js

// Performance Optimizations - Universal Speed System
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupIntersectionObserver();
        this.setupScrollOptimization();
        this.setupImageOptimization();
        this.setupResourceHints();
        this.setupCriticalResourceLoading();
        this.setupBackgroundImageOptimization();
    }

    // Lazy Loading for Images
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.add('loaded');
            });
        }
    }

    // Background Image Lazy Loading - Fixed
    setupBackgroundImageOptimization() {
        const elementsWithBg = document.querySelectorAll('[style*="background-image"]');
        
        // Make all background images visible immediately
        elementsWithBg.forEach(element => {
            element.classList.add('loaded');
        });
        
        if ('IntersectionObserver' in window) {
            const bgObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        element.classList.add('loaded');
                        observer.unobserve(element);
                    }
                });
            }, {
                rootMargin: '100px 0px',
                threshold: 0.1
            });

            elementsWithBg.forEach(el => bgObserver.observe(el));
        }
    }

    // Intersection Observer for Animations
    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const animatedElements = document.querySelectorAll('[data-aos]');
            
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('aos-animate');
                        animationObserver.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '0px 0px -50px 0px',
                threshold: 0.1
            });

            animatedElements.forEach(el => animationObserver.observe(el));
        }
    }

    // Image Optimization
    setupImageOptimization() {
        // Add loading="lazy" to all images that don't have it
        document.querySelectorAll('img:not([loading])').forEach(img => {
            img.setAttribute('loading', 'lazy');
        });

        // Add decoding="async" for better performance
        document.querySelectorAll('img:not([decoding])').forEach(img => {
            img.setAttribute('decoding', 'async');
        });

        // Optimize image loading
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('load', () => {
                img.classList.add('image-loaded');
            });

            img.addEventListener('error', () => {
                img.classList.add('image-error');
            });
        });
    }

    // Resource Hints for Performance
    setupResourceHints() {
        // Preload critical resources
        const criticalResources = [
            { href: 'img/5296603349773916388.jpg', as: 'image' },
            { href: 'img/5296603349773916432.jpg', as: 'image' },
            { href: 'css/style.css', as: 'style' }
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            if (resource.as === 'image') {
                link.setAttribute('importance', 'high');
            }
            document.head.appendChild(link);
        });

        // DNS prefetch for external domains
        const domains = [
            '//fonts.googleapis.com',
            '//fonts.gstatic.com',
            '//mc.yandex.ru'
        ];

        domains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = domain;
            document.head.appendChild(link);
        });
    }

    // Critical Resource Loading
    setupCriticalResourceLoading() {
        // Load critical CSS inline
        const criticalCSS = `
            body { font-family: 'Inter', sans-serif; }
            .header { position: fixed; top: 0; z-index: 1000; }
            .loading { display: none; }
        `;

        const style = document.createElement('style');
        style.textContent = criticalCSS;
        document.head.appendChild(style);

        // Remove loading indicator when page is ready
        window.addEventListener('load', () => {
            document.body.classList.add('page-loaded');
            this.setupProgressiveEnhancement();
        });
    }

    // Progressive Enhancement
    setupProgressiveEnhancement() {
        // Detect connection speed and adjust loading strategy
        if (navigator.connection) {
            const connection = navigator.connection;
            
            if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                // Reduce image quality for slow connections
                document.querySelectorAll('img').forEach(img => {
                    const src = img.src;
                    if (src.includes('.jpg')) {
                        img.src = src.replace('.jpg', '_low.jpg');
                    }
                });
            }
        }

        // Detect device capabilities
        const isLowEndDevice = this.detectLowEndDevice();
        if (isLowEndDevice) {
            document.body.classList.add('low-end-device');
            // Disable heavy animations
            document.querySelectorAll('*').forEach(el => {
                el.style.animationDuration = '0.01ms';
                el.style.transitionDuration = '0.01ms';
            });
        }
    }

    detectLowEndDevice() {
        // Simple heuristic for low-end device detection
        const navigator = window.navigator;
        const hardwareConcurrency = navigator.hardwareConcurrency || 4;
        const deviceMemory = navigator.deviceMemory || 4;
        
        return hardwareConcurrency <= 2 || deviceMemory <= 2 || navigator.connection?.effectiveType === 'slow-2g';
    }

    // Performance Monitoring
    setupPerformanceMonitoring() {
        if ('PerformanceObserver' in window) {
            // Monitor navigation timing
            const navObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'navigation') {
                        console.log('Page load time:', entry.loadEventEnd - entry.fetchStart);
                    }
                });
            });
            
            navObserver.observe({ entryTypes: ['navigation'] });
        }
    }
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', () => {
    window.performanceOptimizer = new PerformanceOptimizer();
});

// Carousel handled by OptimizedCarousel
