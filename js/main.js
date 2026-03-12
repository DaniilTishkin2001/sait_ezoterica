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

    // Scroll Performance Optimization
    setupScrollOptimization() {
        let ticking = false;
        let scrollTimeout;

        function updateScrollPosition() {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    ticking = false;
                });
                ticking = true;
            }
        }

        // Passive scroll listeners
        window.addEventListener('scroll', updateScrollPosition, { passive: true });

        // Debounced scroll events
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Handle scroll-dependent animations
                document.querySelectorAll('[data-scroll]').forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        el.classList.add('in-view');
                    } else {
                        el.classList.remove('in-view');
                    }
                });
            }, 100);
        }, { passive: true });
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

// Mobile & Tablet Carousel Fix - Correct Cards Display
document.addEventListener('DOMContentLoaded', function() {
    const carouselWrappers = document.querySelectorAll('.carousel-wrapper');
    
    carouselWrappers.forEach(wrapper => {
        const track = wrapper.querySelector('.carousel-track');
        const items = wrapper.querySelectorAll('.carousel-item');
        const prevBtn = wrapper.parentElement.querySelector('.carousel-btn.carousel-btn-prev');
        const nextBtn = wrapper.parentElement.querySelector('.carousel-btn.carousel-btn-next');
        
        if (!track || items.length === 0) return;
        
        let currentIndex = 0;
        
        function updateCarousel() {
            const width = window.innerWidth;
            const isMobile = width <= 767;
            const isTablet = width >= 768 && width <= 1024;
            
            if (isMobile) {
                // Mobile: Show one card at a time
                const itemWidth = wrapper.offsetWidth;
                track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
                
                // Update buttons
                if (prevBtn) prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
                if (nextBtn) nextBtn.style.display = currentIndex >= items.length - 1 ? 'none' : 'flex';
            } else if (isTablet) {
                // Tablet: Show two cards at a time
                const itemWidth = wrapper.offsetWidth / 2 + 10; // Account for gap
                const maxIndex = Math.max(0, items.length - 2);
                currentIndex = Math.min(currentIndex, maxIndex);
                track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
                
                // Update buttons
                if (prevBtn) prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
                if (nextBtn) nextBtn.style.display = currentIndex >= maxIndex ? 'none' : 'flex';
            } else {
                // Desktop: Use existing logic
                track.style.transform = '';
                if (prevBtn) prevBtn.style.display = '';
                if (nextBtn) nextBtn.style.display = '';
            }
        }
        
        // Button handlers
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const width = window.innerWidth;
                const isMobile = width <= 767;
                const isTablet = width >= 768 && width <= 1024;
                
                if (isMobile) {
                    if (currentIndex > 0) {
                        currentIndex--;
                        updateCarousel();
                    }
                } else if (isTablet) {
                    const maxIndex = Math.max(0, items.length - 2);
                    if (currentIndex > 0) {
                        currentIndex--;
                        updateCarousel();
                    }
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const width = window.innerWidth;
                const isMobile = width <= 767;
                const isTablet = width >= 768 && width <= 1024;
                
                if (isMobile) {
                    if (currentIndex < items.length - 1) {
                        currentIndex++;
                        updateCarousel();
                    }
                } else if (isTablet) {
                    const maxIndex = Math.max(0, items.length - 2);
                    if (currentIndex < maxIndex) {
                        currentIndex++;
                        updateCarousel();
                    }
                }
            });
        }
        
        // Touch support for mobile and tablet
        let startX = 0;
        let isDragging = false;
        
        track.addEventListener('touchstart', (e) => {
            if (window.innerWidth <= 1024) {
                startX = e.touches[0].clientX;
                isDragging = true;
                track.style.transition = 'none';
            }
        });
        
        track.addEventListener('touchmove', (e) => {
            if (!isDragging || window.innerWidth > 1024) return;
            
            const currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            const width = window.innerWidth;
            
            if (width <= 767) {
                // Mobile: one card
                const itemWidth = wrapper.offsetWidth;
                const translateX = -currentIndex * itemWidth - diff * 0.3;
                track.style.transform = `translateX(${translateX}px)`;
            } else if (width <= 1024) {
                // Tablet: two cards
                const itemWidth = wrapper.offsetWidth / 2 + 10;
                const translateX = -currentIndex * itemWidth - diff * 0.3;
                track.style.transform = `translateX(${translateX}px)`;
            }
        });
        
        track.addEventListener('touchend', (e) => {
            if (!isDragging || window.innerWidth > 1024) return;
            
            isDragging = false;
            track.style.transition = '';
            
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            const width = window.innerWidth;
            
            if (width <= 767) {
                // Mobile: one card
                const threshold = wrapper.offsetWidth * 0.3;
                if (Math.abs(diff) > threshold) {
                    if (diff > 0 && currentIndex < items.length - 1) {
                        currentIndex++;
                    } else if (diff < 0 && currentIndex > 0) {
                        currentIndex--;
                    }
                }
            } else if (width <= 1024) {
                // Tablet: two cards
                const threshold = wrapper.offsetWidth * 0.2;
                const maxIndex = Math.max(0, items.length - 2);
                if (Math.abs(diff) > threshold) {
                    if (diff > 0 && currentIndex < maxIndex) {
                        currentIndex++;
                    } else if (diff < 0 && currentIndex > 0) {
                        currentIndex--;
                    }
                }
            }
            
            updateCarousel();
        });
        
        // Window resize handler
        window.addEventListener('resize', () => {
            // Reset index if needed on resize
            const width = window.innerWidth;
            const isMobile = width <= 767;
            const isTablet = width >= 768 && width <= 1024;
            
            if (isMobile) {
                const maxIndex = items.length - 1;
                currentIndex = Math.min(currentIndex, maxIndex);
            } else if (isTablet) {
                const maxIndex = Math.max(0, items.length - 2);
                currentIndex = Math.min(currentIndex, maxIndex);
            }
            
            updateCarousel();
        });
        
        // Initialize
        updateCarousel();
    });
});

// Mobile Dropdown Menu - Working Version
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing mobile dropdown menu...');
    
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDropdown = document.getElementById('mobileDropdown');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    console.log('Mobile dropdown elements:', {
        button: mobileMenuBtn,
        dropdown: mobileDropdown,
        overlay: mobileMenuOverlay
    });
    
    if (mobileMenuBtn && mobileDropdown) {
        // Simple toggle function
        function toggleDropdown() {
            const isOpen = mobileDropdown.classList.contains('active');
            
            console.log('Toggling dropdown, current state:', isOpen);
            
            if (isOpen) {
                // Close dropdown
                mobileDropdown.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                if (mobileMenuOverlay) {
                    mobileMenuOverlay.classList.remove('active');
                }
                document.body.style.overflow = '';
                console.log('Dropdown closed');
            } else {
                // Open dropdown
                mobileDropdown.classList.add('active');
                mobileMenuBtn.classList.add('active');
                if (mobileMenuOverlay) {
                    mobileMenuOverlay.classList.add('active');
                }
                document.body.style.overflow = 'hidden';
                console.log('Dropdown opened');
            }
        }
        
        // Toggle dropdown on button click
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile menu button clicked');
            toggleDropdown();
        });
        
        // Close dropdown when clicking on links
        const dropdownLinks = document.querySelectorAll('.mobile-dropdown-link');
        dropdownLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                console.log('Dropdown link clicked, closing dropdown');
                mobileDropdown.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                if (mobileMenuOverlay) {
                    mobileMenuOverlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            });
        });
        
        // Close dropdown when clicking on overlay
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', function(e) {
                if (e.target === mobileMenuOverlay) {
                    console.log('Overlay clicked, closing dropdown');
                    toggleDropdown();
                }
            });
        }
        
        // Close dropdown on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileDropdown.classList.contains('active')) {
                console.log('Escape key pressed, closing dropdown');
                toggleDropdown();
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileDropdown.contains(e.target)) {
                if (mobileDropdown.classList.contains('active')) {
                    console.log('Clicked outside, closing dropdown');
                    mobileDropdown.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    if (mobileMenuOverlay) {
                        mobileMenuOverlay.classList.remove('active');
                    }
                    document.body.style.overflow = '';
                }
            }
        });
        
        console.log('Mobile dropdown menu initialized successfully');
        
    } else {
        console.error('Mobile dropdown elements not found:', {
            button: !!mobileMenuBtn,
            dropdown: !!mobileDropdown,
            overlay: !!mobileMenuOverlay
        });
    }
});

// Ripple effect for button
function createRippleEffect(e, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add CSS animation for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Image Interactions
function setupImageInteractions() {
    const images = document.querySelectorAll('.term-image');
    
    images.forEach(image => {
        // Click to open in new tab
        image.addEventListener('click', () => {
            window.open(image.src, '_blank');
        });
        
        // Right click for context menu
        image.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showImageOptions(e, image);
        });
    });
}

// Show image options menu
function showImageOptions(e, image) {
    // Remove existing menu
    const existingMenu = document.querySelector('.image-options-menu');
    if (existingMenu) {
        existingMenu.remove();
    }
    
    // Create menu
    const menu = document.createElement('div');
    menu.className = 'image-options-menu';
    menu.innerHTML = `
        <div class="image-options-item" data-action="open">
            <span>🔗</span> Открыть в новой вкладке
        </div>
        <div class="image-options-item" data-action="download">
            <span>💾</span> Скачать изображение
        </div>
        <div class="image-options-item" data-action="copy">
            <span>📋</span> Копировать ссылку
        </div>
    `;
    
    // Position menu
    menu.style.left = e.pageX + 'px';
    menu.style.top = e.pageY + 'px';
    
    document.body.appendChild(menu);
    
    // Handle menu clicks
    menu.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = e.target.closest('.image-options-item')?.dataset.action;
        
        switch (action) {
            case 'open':
                window.open(image.src, '_blank');
                break;
            case 'download':
                downloadImage(image);
                break;
            case 'copy':
                copyImageLink(image);
                break;
        }
        
        menu.remove();
    });
    
    // Close menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', () => menu.remove(), { once: true });
    }, 100);
}

// Download image
function downloadImage(image) {
    const link = document.createElement('a');
    link.href = image.src;
    link.download = image.src.split('/').pop();
    link.click();
}

// Copy image link
function copyImageLink(image) {
    navigator.clipboard.writeText(image.src).then(() => {
        showNotification('Ссылка скопирована!');
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize image interactions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupImageInteractions();
    
    // Add structured data breadcrumbs
    addBreadcrumbsStructuredData();
    
    // Setup active navigation highlighting
    setupActiveNavigation();
});

// Level Navigation
const levelNavBtns = document.querySelectorAll('.level-nav-btn');
const levelPanels = document.querySelectorAll('.level-panel');

console.log('Level navigation buttons found:', levelNavBtns.length);

if (levelNavBtns.length > 0) {
    levelNavBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetLevel = btn.dataset.level;
            console.log('Switching to level:', targetLevel);
            
            // Remove active class from all buttons and panels
            levelNavBtns.forEach(b => b.classList.remove('active'));
            levelPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show corresponding panel
            const targetPanel = document.getElementById(`${targetLevel}-level`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            } else {
                console.log('Panel not found for level:', targetLevel);
            }
        });
    });
} else {
    console.error('No level navigation buttons found');
}

// Study Plan Dropdowns
const stepDropdownBtns = document.querySelectorAll('.step-dropdown-btn');

console.log('Study dropdown buttons found:', stepDropdownBtns.length);

if (stepDropdownBtns.length > 0) {
    stepDropdownBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log(`Clicked study step ${index + 1}`);
            
            const step = btn.closest('.study-step');
            const isActive = step.classList.contains('active');
            
            console.log('Step active state:', isActive);
            
            // Close all other study steps
            document.querySelectorAll('.study-step').forEach(other => {
                if (other !== step) {
                    other.classList.remove('active');
                }
            });
            
            // Toggle current step
            if (!isActive) {
                step.classList.add('active');
                console.log('Study step opened');
            } else {
                step.classList.remove('active');
                console.log('Study step closed');
            }
        });
    });

    // Close study steps when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.study-step')) {
            document.querySelectorAll('.study-step').forEach(step => {
                step.classList.remove('active');
            });
        }
    });
} else {
    console.error('No study dropdown buttons found');
}

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize Vanilla Tilt
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.3
});

// Smooth scroll function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Header scroll effect removed to maintain consistent styles

// Parallax effect for hero cards
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        card.style.transform = `translateY(${yPos}px)`;
    });
});

// Active navigation link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
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

// Button ripple effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
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
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav__link.active {
        color: #ffffff;
    }
    
    .nav__link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(rippleStyles);

// Card flip animation on hover
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'rotateY(180deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0deg)';
    });
});

// Counter animation for stats (if any)
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.about__item, .program-card, .special-card, .process__step');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Form submission handling (if forms exist)
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple validation
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });
        
        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Сообщение отправлено! Мы свяжемся с вами в ближайшее время.';
            successMessage.style.cssText = `
                background: linear-gradient(135deg, #7877c6, #ff77c6);
                color: white;
                padding: 16px 24px;
                border-radius: 12px;
                margin-top: 20px;
                text-align: center;
                animation: fadeIn 0.5s ease;
            `;
            
            form.appendChild(successMessage);
            form.reset();
            
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }
    });
});

// Add error styles
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .error {
        border-color: #ff77c6 !important;
        box-shadow: 0 0 0 2px rgba(255, 119, 198, 0.3) !important;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .success-message {
        animation: fadeIn 0.5s ease;
    }
`;
document.head.appendChild(errorStyles);

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements on load
    const heroTitle = document.querySelector('.hero__title');
    const heroSubtitle = document.querySelector('.hero__subtitle');
    const heroButtons = document.querySelector('.hero__buttons');
    
    if (heroTitle) {
        heroTitle.style.animation = 'fadeInUp 1s ease forwards';
    }
    
    if (heroSubtitle) {
        heroSubtitle.style.animation = 'fadeInUp 1s ease 0.2s forwards';
        heroSubtitle.style.opacity = '0';
    }
    
    if (heroButtons) {
        heroButtons.style.animation = 'fadeInUp 1s ease 0.4s forwards';
        heroButtons.style.opacity = '0';
    }
});

// Add fade in up animation
const fadeInUpStyles = document.createElement('style');
fadeInUpStyles.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    body:not(.loaded) .hero__title,
    body:not(.loaded) .hero__subtitle,
    body:not(.loaded) .hero__buttons {
        opacity: 0;
    }
    
    body.loaded .hero__title,
    body.loaded .hero__subtitle,
    body.loaded .hero__buttons {
        opacity: 1;
    }
`;
document.head.appendChild(fadeInUpStyles);

// Mouse move parallax for hero section
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        const speed = (index + 1) * 10;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        card.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Touch device detection
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (isTouchDevice) {
    document.body.classList.add('touch-device');
}

// Add touch device styles
const touchStyles = document.createElement('style');
touchStyles.textContent = `
    .touch-device .card:hover {
        transform: none !important;
    }
    
    .touch-device .about__item:hover,
    .touch-device .program-card:hover,
    .touch-device .special-card:hover {
        transform: none !important;
    }
`;
document.head.appendChild(touchStyles);

// Performance optimization - debounce scroll events
function debounce(func, wait) {
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

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Scroll-related animations
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Add loading state for external links
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Add loading state
        link.style.opacity = '0.7';
        link.style.pointerEvents = 'none';
        
        // Reset after a short delay
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.pointerEvents = 'auto';
        }, 1000);
    });
});

// Image download and open in new tab functionality
function setupImageInteractions() {
    // Add download and open in new tab functionality to all images
    const allImages = document.querySelectorAll('img');
    
    allImages.forEach(img => {
        // Make image clickable
        img.style.cursor = 'pointer';
        img.title = 'Кликните, чтобы открыть в новой вкладке. Правый клик для опций.';
        
        // Add click event
        img.addEventListener('click', function(e) {
            e.preventDefault();
            
            const imgSrc = this.src;
            
            // Regular click: Open in new tab
            window.open(imgSrc, '_blank');
        });
        
        // Add right-click context menu for options
        img.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            const imgSrc = this.src;
            const imgAlt = this.alt || 'Изображение';
            showImageOptions(imgSrc, imgAlt, e.pageX, e.pageY);
        });
    });
}

function downloadImage(src, alt) {
    // Create a temporary link element for download
    const link = document.createElement('a');
    link.href = src;
    link.download = alt + '.jpg';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function showImageOptions(src, alt, x, y) {
    // Remove existing options menu if any
    const existingMenu = document.querySelector('.image-options-menu');
    if (existingMenu) {
        existingMenu.remove();
    }
    
    // Create options menu
    const menu = document.createElement('div');
    menu.className = 'image-options-menu';
    menu.innerHTML = `
        <div class="image-options-item" data-action="open">
            <span class="option-icon">🔗</span>
            <span>Открыть в новой вкладке</span>
        </div>
        <div class="image-options-item" data-action="download">
            <span class="option-icon">⬇️</span>
            <span>Скачать изображение</span>
        </div>
        <div class="image-options-item" data-action="copy">
            <span class="option-icon">📋</span>
            <span>Копировать ссылку</span>
        </div>
    `;
    
    // Position menu
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
    
    // Add to page
    document.body.appendChild(menu);
    
    // Handle menu item clicks
    menu.querySelectorAll('.image-options-item').forEach(item => {
        item.addEventListener('click', function() {
            const action = this.dataset.action;
            
            switch(action) {
                case 'open':
                    window.open(src, '_blank');
                    break;
                case 'download':
                    downloadImage(src, alt);
                    break;
                case 'copy':
                    copyToClipboard(src);
                    showNotification('Ссылка скопирована в буфер обмена');
                    break;
            }
            
            menu.remove();
        });
    });
    
    // Close menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 100);
}

function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'image-notification';
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize image interactions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupImageInteractions();
    
    // Add structured data breadcrumbs
    addBreadcrumbsStructuredData();
    
    // Setup active navigation highlighting
    setupActiveNavigation();
});

// Navigation scroll effect removed to maintain consistent header styles

// Active navigation highlighting
function setupActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    if (!sections.length || !navLinks.length) return;
    
    function updateActiveLink() {
        const scrollY = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Update on load
    updateActiveLink();
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.querySelector('.nav__menu');
                    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
                    const mobileBtn = document.querySelector('.mobile-menu-btn');
                    
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        mobileOverlay.classList.remove('active');
                        mobileBtn.classList.remove('active');
                    }
                }
            }
        });
    });
}

// Add breadcrumbs structured data
function addBreadcrumbsStructuredData() {
    const breadcrumbsData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Главная",
                "item": "https://username.github.io/image/"
            }
        ]
    };
    
    // Add current page to breadcrumbs
    const currentHash = window.location.hash || '#hero';
    const pageNames = {
        '#hero': 'Главная',
        '#about': 'О практике',
        '#programs': 'Программы',
        '#study-plan': 'План занятий',
        '#special-programs': 'Дополнительные практики',
        '#glossary': 'Метафизический глосарий',
        '#process': 'Процесс',
        '#contact': 'Контакты'
    };
    
    if (currentHash && pageNames[currentHash]) {
        breadcrumbsData.itemListElement.push({
            "@type": "ListItem",
            "position": 2,
            "name": pageNames[currentHash],
            "item": `https://username.github.io/image/${currentHash}`
        });
    }
    
    // Create script element
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(breadcrumbsData);
    document.head.appendChild(script);
}

// Add FAQ structured data for glossary
function addFAQStructuredData() {
    const faqData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Что такое Древо Сефирот?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Древо Сефирот описывает структуру мира, сознание Земли и человеческий разум через систему из десяти сефир, расположенных ярусами и связанных между собой каналами."
                }
            },
            {
                "@type": "Question",
                "name": "Что такое чакра?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Чакра (санскр. «Колесо») – энергетический центр на коконе человека. Чакры существуют в определенном частотном диапазоне и представляют определенный слой реальности."
                }
            },
            {
                "@type": "Question",
                "name": "Что такое точка сборки?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Точка сборки – термин из книг Карлоса Кастанеда, обозначающий режим восприятия окружающего мира. Она определяет уровень реальности, доступный для сознания."
                }
            }
        ]
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(faqData);
    document.head.appendChild(script);
}

// Add FAQ structured data when glossary is visible
const faqObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            addFAQStructuredData();
            faqObserver.disconnect();
        }
    });
});

const glossarySection = document.querySelector('#glossary');
if (glossarySection) {
    faqObserver.observe(glossarySection);
}

// Telegram Floating Button Scroll Animation
document.addEventListener('DOMContentLoaded', function() {
    const telegramBtn = document.querySelector('.telegram-float-btn');
    
    if (telegramBtn) {
        // Show/hide button based on scroll position
        function handleScroll() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollThreshold = 300;
            
            // Показываем кнопку после скролла от threshold
            if (scrollY > scrollThreshold) {
                telegramBtn.classList.add('visible');
                
                // Рассчитываем позицию кнопки в зависимости от скролла
                const maxScroll = documentHeight - windowHeight - scrollThreshold;
                const currentScroll = scrollY - scrollThreshold;
                const scrollProgress = Math.min(currentScroll / maxScroll, 1);
                
                // Плавное перемещение от центра к низу
                const topPosition = 50 + (scrollProgress * 40); // От 50% до 90% (50% + 40%)
                telegramBtn.style.top = topPosition + '%';
                
            } else {
                telegramBtn.classList.remove('visible');
                // Сбрасываем позицию при скрытии
                telegramBtn.style.top = '50%';
            }
        }
        
        // Add scroll event listener with throttling
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = window.requestAnimationFrame(handleScroll);
        });
        
        // Initial check
        handleScroll();
        
        // Add smooth click animation
        telegramBtn.addEventListener('click', function(e) {
            // Add pulse effect on click
            telegramBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                telegramBtn.style.transform = '';
            }, 150);
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            handleScroll();
        });
    }
});

console.log('✨ Амадея сайт загружен успешно!');