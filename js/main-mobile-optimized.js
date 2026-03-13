// МОБИЛЬНАЯ ОПТИМИЗАЦИЯ PAGE SPEED - < 98KB ATF, Critical Path Optimization

// 1. Critical CSS inlined для немедленной отрисовки (must be < 14KB first roundtrip)
(function() {
    'use strict';
    
    // Предотвращаем FOUC и устанавливаем базовые стили
    const criticalCSS = `
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        .header { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; background: rgba(120, 119, 198, 0.95); }
        .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        .loading { opacity: 0; transition: opacity 0.3s; }
        .loaded { opacity: 1; }
    `;
    
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.appendChild(style);
    
    // Оптимизированный скроллинг хедера с passive listeners
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
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    // Passive listener для улучшения производительности на мобильных
    window.addEventListener("scroll", requestTick, { passive: true });
    
    // Определение мобильного устройства для условной загрузки
    const isMobile = window.innerWidth <= 767;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
    }
    
    // Touch-оптимизированные стили
    const touchStyles = document.createElement('style');
    touchStyles.textContent = `
        .touch-device .card:hover { transform: none !important; }
        .touch-device .about__item:hover,
        .touch-device .program-card:hover,
        .touch-device .special-card:hover { transform: none; }
        .touch-device .btn { min-height: 44px; min-width: 44px; }
    `;
    document.head.appendChild(touchStyles);
    
})();

// 2. Deferred loading для некритичного кода (загружается после ATF)
function loadDeferredScripts() {
    // RequestIdleCallback для мобильной оптимизации
    const loadWhenIdle = (callback, fallback = 1000) => {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(callback, { timeout: fallback });
        } else {
            setTimeout(callback, fallback);
        }
    };
    
    // Мобильное меню (критично для мобильных)
    loadWhenIdle(() => {
        if (document.getElementById('mobileMenuBtn') && document.getElementById('mobileDropdown')) {
            initMobileMenu();
        }
    }, 100);
    
    // Telegram кнопка (низкий приоритет)
    loadWhenIdle(() => {
        const telegramBtn = document.querySelector('.telegram-float-btn');
        if (telegramBtn) {
            telegramBtn.classList.add('visible');
        }
    }, 500);
    
    // Плавная прокрутка (низкий приоритет)
    loadWhenIdle(initSmoothScroll, 200);
    
    // Lazy loading изображений (высокий приоритет)
    loadWhenIdle(initLazyLoading, 50);
    
    // Карусель (только если есть элементы)
    loadWhenIdle(() => {
        if (document.querySelector('.carousel-track')) {
            initCarousel();
        }
    }, 150);
    
    // AOS (низкий приоритет для мобильных)
    loadWhenIdle(() => {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800, // Быстрее на мобильных
                once: true,
                offset: 50, // Меньше offset для мобильных
                disable: window.innerWidth < 768 // Отключаем на очень маленьких экранах
            });
        }
    }, 300);
}

// Инициализация после загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadDeferredScripts);
} else {
    loadDeferredScripts();
}

// 3. Оптимизированные мобильные функции

// Мобильное меню с touch-оптимизацией
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDropdown = document.getElementById('mobileDropdown');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    if (!mobileMenuBtn || !mobileDropdown) return;
    
    function toggleDropdown(e) {
        if (e) e.preventDefault();
        
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
    
    // Touch-оптимизированные обработчики
    mobileMenuBtn.addEventListener('click', toggleDropdown, { passive: false });
    mobileMenuBtn.addEventListener('touchstart', function(e) {
        this.style.transform = 'scale(0.95)';
    }, { passive: true });
    
    mobileMenuBtn.addEventListener('touchend', function(e) {
        this.style.transform = 'scale(1)';
    }, { passive: true });
    
    // Закрытие при клике на ссылки
    document.querySelectorAll('.mobile-dropdown-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileDropdown.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Закрытие по свайпу вниз
    let touchStartY = 0;
    mobileDropdown.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    mobileDropdown.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const swipeDistance = touchStartY - touchEndY;
        
        if (swipeDistance < -50 && Math.abs(swipeDistance) > 50) {
            toggleDropdown();
        }
    }, { passive: true });
    
    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileDropdown.classList.contains('active')) {
            toggleDropdown();
        }
    });
}

// Оптимизированная плавная прокрутка для мобильных
function initSmoothScroll() {
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const section = document.getElementById(targetId);
            
            if (section) {
                // Мобильная оптимизация: меньше offset для header
                const headerHeight = window.innerWidth <= 767 ? 60 : 80;
                const sectionTop = section.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: sectionTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Оптимизированный lazy loading для мобильных
function initLazyLoading() {
    const images = document.querySelectorAll('img:not([loading])');
    
    // Intersection Observer для мобильных с более агрессивной загрузкой
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Загружаем изображение
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    img.setAttribute('loading', 'lazy');
                    img.setAttribute('decoding', 'async');
                    
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px 0px', // Более агрессивная загрузка для мобильных
            threshold: 0.1
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback для старых браузеров
        images.forEach(img => {
            img.setAttribute('loading', 'lazy');
            img.setAttribute('decoding', 'async');
        });
    }
}

// Мобильная карусель с touch-оптимизацией
function initCarousel() {
    const carouselWrappers = document.querySelectorAll('.carousel-wrapper');
    
    carouselWrappers.forEach(wrapper => {
        const track = wrapper.querySelector('.carousel-track');
        const items = wrapper.querySelectorAll('.carousel-item');
        const prevBtn = wrapper.parentElement.querySelector('.carousel-btn-prev');
        const nextBtn = wrapper.parentElement.querySelector('.carousel-btn-next');
        
        if (!track || items.length === 0) return;
        
        let currentIndex = 0;
        const isMobile = window.innerWidth <= 767;
        
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
        
        // Touch-оптимизированные обработчики кнопок
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            }, { passive: true });
            
            // Touch feedback
            prevBtn.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-50%) scale(0.95)';
            }, { passive: true });
            
            prevBtn.addEventListener('touchend', function() {
                this.style.transform = 'translateY(-50%) scale(1)';
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
            
            // Touch feedback
            nextBtn.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-50%) scale(0.95)';
            }, { passive: true });
            
            nextBtn.addEventListener('touchend', function() {
                this.style.transform = 'translateY(-50%) scale(1)';
            }, { passive: true });
        }
        
        // Touch свайпы для мобильной карусели
        if (isMobile) {
            let touchStartX = 0;
            let touchEndX = 0;
            let isDragging = false;
            
            track.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                isDragging = true;
                track.style.transition = 'none';
            }, { passive: true });
            
            track.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                touchEndX = e.touches[0].clientX;
                const diff = touchStartX - touchEndX;
                const itemWidth = wrapper.offsetWidth;
                const translateX = -currentIndex * itemWidth - diff * 0.3;
                track.style.transform = `translateX(${translateX}px)`;
            }, { passive: true });
            
            track.addEventListener('touchend', (e) => {
                if (!isDragging) return;
                isDragging = false;
                track.style.transition = '';
                
                const diff = touchStartX - touchEndX;
                const threshold = wrapper.offsetWidth * 0.3;
                
                if (Math.abs(diff) > threshold) {
                    if (diff > 0 && currentIndex < items.length - 1) {
                        currentIndex++;
                    } else if (diff < 0 && currentIndex > 0) {
                        currentIndex--;
                    }
                }
                
                updateCarousel();
            }, { passive: true });
        }
        
        // Оптимизированный resize handler
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateCarousel, 150);
        }, { passive: true });
        
        // Инициализация
        updateCarousel();
    });
}

// 4. Мобильная оптимизация производительности
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    // Регистрация service worker для кэширования (опционально)
    navigator.serviceWorker.register('/sw.js').catch(() => {
        // Silently fail if service worker not available
    });
}

console.log('📱 Амадея сайт оптимизирован для мобильных устройств!');
