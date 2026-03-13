// Ultimate Performance Optimizer
class UltimatePerformanceOptimizer {
    constructor() {
        this.cachedElements = new Map();
        this.ticking = false;
        this.mouseThrottled = false;
        this.isLowEnd = this.detectLowEndDevice();
        this.init();
    }

    init() {
        // Cache all elements once
        this.cacheAllElements();
        
        // Setup optimized handlers
        this.setupOptimizedMouseParallax();
        this.setupOptimizedCardInteractions();
        this.disableHeavyFeatures();
        this.optimizeImages();
        this.setupVirtualScrolling();
    }

    cacheAllElements() {
        // Cache frequently used elements
        this.cachedElements.set('cards', document.querySelectorAll('.card'));
        this.cachedElements.set('buttons', document.querySelectorAll('.btn'));
        this.cachedElements.set('navLinks', document.querySelectorAll('.nav__link'));
        this.cachedElements.set('tiltElements', document.querySelectorAll("[data-tilt]"));
        this.cachedElements.set('animatedElements', document.querySelectorAll('.about__item, .program-card, .special-card, .process__step'));
    }

    detectLowEndDevice() {
        const navigator = window.navigator;
        const hardwareConcurrency = navigator.hardwareConcurrency || 4;
        const deviceMemory = navigator.deviceMemory || 4;
        const connection = navigator.connection;
        
        return hardwareConcurrency <= 2 || 
               deviceMemory <= 2 || 
               connection?.effectiveType === 'slow-2g' ||
               connection?.effectiveType === '2g';
    }

    setupOptimizedMouseParallax() {
        if (this.isLowEnd) return; // Disable on low-end devices

        let lastX = 0, lastY = 0;
        const cards = this.cachedElements.get('cards');
        
        // Throttled mousemove with requestAnimationFrame
        document.addEventListener('mousemove', (e) => {
            if (this.mouseThrottled) return;
            this.mouseThrottled = true;
            
            requestAnimationFrame(() => {
                const deltaX = e.clientX - lastX;
                const deltaY = e.clientY - lastY;
                
                // Only update if mouse moved significantly
                if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
                    const mouseX = e.clientX / window.innerWidth;
                    const mouseY = e.clientY / window.innerHeight;
                    
                    // Use CSS variables for better performance
                    document.documentElement.style.setProperty('--mouse-x', mouseX);
                    document.documentElement.style.setProperty('--mouse-y', mouseY);
                    
                    lastX = e.clientX;
                    lastY = e.clientY;
                }
                
                this.mouseThrottled = false;
            });
        }, { passive: true });

        // CSS-based parallax instead of JavaScript
        this.addParallaxStyles();
    }

    addParallaxStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .card {
                transition: transform 0.1s ease-out;
                will-change: transform;
            }
            
            @media (hover: hover) {
                .card:hover {
                    transform: translate(
                        calc(var(--mouse-x, 0.5) * 20px - 10px),
                        calc(var(--mouse-y, 0.5) * 20px - 10px)
                    );
                }
            }
            
            .low-end-device .card {
                transform: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    setupOptimizedCardInteractions() {
        // Remove heavy Vanilla Tilt
        const tiltElements = this.cachedElements.get('tiltElements');
        if (tiltElements.length > 0 && window.VanillaTilt) {
            tiltElements.forEach(el => el.vanillaTilt?.destroy?.());
        }

        // Optimized card hover using CSS
        this.addOptimizedCardStyles();
    }

    addOptimizedCardStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .card {
                transform-style: preserve-3d;
                transition: transform 0.3s ease;
                will-change: transform;
            }
            
            .card:hover {
                transform: perspective(1000px) rotateY(5deg) scale(1.02);
            }
            
            .card:active {
                transform: perspective(1000px) rotateY(2deg) scale(0.98);
            }
            
            .low-end-device .card {
                transform: none !important;
                transition: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    disableHeavyFeatures() {
        if (this.isLowEnd) {
            document.body.classList.add('low-end-device');
            
            // Disable all animations
            const style = document.createElement('style');
            style.textContent = `
                * {
                    animation-duration: 0.01ms !important;
                    transition-duration: 0.01ms !important;
                }
                
                .card:hover {
                    transform: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    optimizeImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading="lazy" if not present
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Add decoding="async"
            if (!img.hasAttribute('decoding')) {
                img.setAttribute('decoding', 'async');
            }
            
            // Add error handling
            img.addEventListener('error', () => {
                img.style.display = 'none';
            });
        });
    }

    setupVirtualScrolling() {
        // Implement intersection observer for lazy loading of heavy components
        const heavyComponents = document.querySelectorAll('.special-card, .program-card');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('loaded');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '50px',
                threshold: 0.1
            });

            heavyComponents.forEach(el => observer.observe(el));
        }
    }

    // Optimized ripple effect using CSS
    setupOptimizedRipple() {
        const style = document.createElement('style');
        style.textContent = `
            .btn {
                position: relative;
                overflow: hidden;
            }
            
            .btn::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: translate(-50%, -50%);
                transition: width 0.3s, height 0.3s;
                pointer-events: none;
            }
            
            .btn:active::before {
                width: 200px;
                height: 200px;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize ultimate optimizer
document.addEventListener('DOMContentLoaded', () => {
    window.ultimateOptimizer = new UltimatePerformanceOptimizer();
});
