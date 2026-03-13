// Main Application Module - Ultra Optimized
class AmadeyaApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupTelegramButton();
        this.setupAOS();
        this.setupVanillaTilt();
        this.setupPerformanceOptimizations();
    }

    setupTelegramButton() {
        const button = document.querySelector('.telegram-float-btn');
        if (!button) return;

        // Show button with animation after page load
        setTimeout(() => {
            button.classList.add('visible');
            button.style.opacity = '1';
            button.style.transform = 'scale(1)';
        }, 1000);
    }

    setupAOS() {
        // Initialize AOS with performance settings
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true, // Only animate once for better performance
                offset: 100,
                disable: 'mobile' // Disable on mobile for better performance
            });
        }
    }

    setupVanillaTilt() {
        // Initialize Vanilla Tilt only on desktop
        if (window.innerWidth > 1024 && typeof VanillaTilt !== 'undefined') {
            const elements = document.querySelectorAll('[data-tilt]');
            elements.forEach(element => {
                new VanillaTilt(element, {
                    max: 15,
                    speed: 400,
                    glare: true,
                    'max-glare': 0.3
                });
            });
        }
    }

    setupPerformanceOptimizations() {
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Setup service worker
        this.setupServiceWorker();
        
        // Optimize images
        this.optimizeImages();
    }

    preloadCriticalResources() {
        // Preload critical images
        const criticalImages = [
            'img/5296603349773916388.jpg',
            'img/5296603349773916432.jpg'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .catch(() => {
                        // Silent fail for SW
                    });
            });
        }
    }

    optimizeImages() {
        // Add loading="lazy" to non-critical images
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            if (!img.closest('.carousel-item')) {
                img.loading = 'lazy';
            }
        });
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new AmadeyaApp());
} else {
    new AmadeyaApp();
}
