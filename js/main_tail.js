
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
function downloadImage(src, alt) {
    const link = document.createElement('a');
    link.href = src;
    link.download = alt;
    link.click();
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

// Vanilla Tilt disabled for performance

// Smooth scroll function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Parallax and navigation handled by UnifiedScrollHandler

// Button ripple handled by UltimatePerformanceOptimizer

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

// Card interactions handled by UltimatePerformanceOptimizer

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

// Mouse parallax handled by UltimatePerformanceOptimizer

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
`;
document.head.appendChild(touchStyles);

// Debounced scroll handled by UnifiedScrollHandler

// Add loading state for external links
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Add loading state
        e.preventDefault();
        const linkUrl = link.href;
        const linkText = link.textContent;
        const linkTarget = link.target;
        link.style.pointerEvents = 'none';
        
        // Reset after a short delay
        setTimeout(() => {
            link.style.opacity = '1';
            link.style.pointerEvents = 'auto';
        }, 2000);
    });
});





function copyImageLink(image) {
    // Copy image link to clipboard
    const link = image.src;
    navigator.clipboard.writeText(link);
    console.log('✨ Амадея сайт загружен успешно!');
}
