// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.querySelector('.nav__menu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

console.log('Mobile menu button:', mobileMenuBtn);
console.log('Nav menu:', navMenu);
console.log('Menu overlay:', mobileMenuOverlay);

if (mobileMenuBtn && navMenu && mobileMenuOverlay) {
    mobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Mobile menu clicked');
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (mobileMenuOverlay.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking on links
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            console.log('Link clicked, closing menu');
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking on overlay
    mobileMenuOverlay.addEventListener('click', () => {
        console.log('Overlay clicked, closing menu');
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            console.log('Clicked outside, closing menu');
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
} else {
    console.error('Mobile menu elements not found');
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

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 15, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(10, 10, 15, 0.8)';
        header.style.boxShadow = 'none';
    }
});

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

console.log('🔮 Таро Мастер сайт загружен успешно!');
