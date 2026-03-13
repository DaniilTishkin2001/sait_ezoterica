// ОПТИМИЗИРОВАННЫЙ JAVASCRIPT С DEFERRED LOADING ДЛЯ PAGE SPEED
// Применены рекомендации PageSpeed Insights

// 1. Критически важный код (загружается немедленно)
(function() {
    'use strict';
    
    // Оптимизированный скроллинг хедера
    let lastScrollY = 0;
    let ticking = false;
    
    function updateHeader() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector(".header");
        
        if (header) {
            if (scrollY > lastScrollY && scrollY > 100) {
                header.style.transform = "translateY(-100%)";
            } else {
                header.style.transform = "translateY(0)";
            }
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener("scroll", requestTick, { passive: true });
    
    // Определение touch устройства
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.body.classList.add('touch-device');
    }
    
    // Базовые стили для touch устройств
    const touchStyles = document.createElement('style');
    touchStyles.textContent = `
        .touch-device .card:hover { transform: none !important; }
        .touch-device .about__item:hover,
        .touch-device .program-card:hover,
        .touch-device .special-card:hover { transform: none; }
    `;
    document.head.appendChild(touchStyles);
    
})();

// 2. Deferred loading для некритичного кода
function loadDeferredScripts() {
    // Мобильное меню
    if (document.getElementById('mobileMenuBtn') && document.getElementById('mobileDropdown')) {
        initMobileMenu();
    }
    
    // Telegram кнопка
    const telegramBtn = document.querySelector('.telegram-float-btn');
    if (telegramBtn) {
        setTimeout(() => {
            telegramBtn.classList.add('visible');
        }, 1000);
    }
    
    // Плавная прокрутка
    initSmoothScroll();
    
    // Lazy loading для изображений
    initLazyLoading();
    
    // Карусель (только если есть элементы)
    if (document.querySelector('.carousel-track')) {
        initCarousel();
    }
}

// Инициализация после загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadDeferredScripts);
} else {
    loadDeferredScripts();
}

// 3. Модульные функции (tree shaking ready)

// Мобильное меню
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDropdown = document.getElementById('mobileDropdown');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    if (!mobileMenuBtn || !mobileDropdown) return;
    
    function toggleDropdown() {
        const isOpen = mobileDropdown.classList.contains('active');
        
        if (isOpen) {
            mobileDropdown.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            mobileDropdown.classList.add('active');
            mobileMenuBtn.classList.add('active');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    mobileMenuBtn.addEventListener('click', toggleDropdown);
    
    // Закрытие при клике на ссылки
    document.querySelectorAll('.mobile-dropdown-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileDropdown.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileDropdown.classList.contains('active')) {
            toggleDropdown();
        }
    });
}

// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const section = document.getElementById(targetId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Lazy loading изображений
function initLazyLoading() {
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
    });
}

// Оптимизированная карусель
function initCarousel() {
    const carouselWrappers = document.querySelectorAll('.carousel-wrapper');
    
    carouselWrappers.forEach(wrapper => {
        const track = wrapper.querySelector('.carousel-track');
        const items = wrapper.querySelectorAll('.carousel-item');
        const prevBtn = wrapper.parentElement.querySelector('.carousel-btn-prev');
        const nextBtn = wrapper.parentElement.querySelector('.carousel-btn-next');
        
        if (!track || items.length === 0) return;
        
        let currentIndex = 0;
        
        function updateCarousel() {
            const width = window.innerWidth;
            const isMobile = width <= 767;
            const isTablet = width >= 768 && width <= 1024;
            
            if (isMobile) {
                const itemWidth = wrapper.offsetWidth;
                track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
                if (prevBtn) prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
                if (nextBtn) nextBtn.style.display = currentIndex >= items.length - 1 ? 'none' : 'flex';
            } else if (isTablet) {
                const itemWidth = wrapper.offsetWidth / 2 + 10;
                const maxIndex = Math.max(0, items.length - 2);
                currentIndex = Math.min(currentIndex, maxIndex);
                track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
                if (prevBtn) prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
                if (nextBtn) nextBtn.style.display = currentIndex >= maxIndex ? 'none' : 'flex';
            } else {
                track.style.transform = '';
                if (prevBtn) prevBtn.style.display = '';
                if (nextBtn) nextBtn.style.display = '';
            }
        }
        
        // Обработчики кнопок с делегированием событий
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            }, { passive: true });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const width = window.innerWidth;
                const isMobile = width <= 767;
                const isTablet = width >= 768 && width <= 1024;
                
                if (isMobile && currentIndex < items.length - 1) {
                    currentIndex++;
                    updateCarousel();
                } else if (isTablet) {
                    const maxIndex = Math.max(0, items.length - 2);
                    if (currentIndex < maxIndex) {
                        currentIndex++;
                        updateCarousel();
                    }
                }
            }, { passive: true });
        }
        
        // Оптимизированный resize handler с debounce
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateCarousel, 150);
        }, { passive: true });
        
        // Инициализация
        updateCarousel();
    });
}

// AOS инициализация (только если библиотека загружена)
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
}

// Инициализация AOS после загрузки
if (typeof AOS !== 'undefined') {
    initAOS();
} else {
    // Ждем загрузки AOS
    setTimeout(() => {
        if (typeof AOS !== 'undefined') {
            initAOS();
        }
    }, 1000);
}

console.log('✨ Амадея сайт загружен с оптимизацией PageSpeed!');
