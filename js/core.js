// CORE.JS - Критичный функционал для немедленной загрузки
// Загружается всегда, не блокирует рендеринг

(function() {
    'use strict';
    
    // Critical CSS inlined для немедленной отрисовки
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
    
    // Passive listener для улучшения производительности
    window.addEventListener("scroll", requestTick, { passive: true });
    
    // Определение мобильного устройства
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
    
    // RequestIdleCallback utility
    window.loadWhenIdle = (callback, fallback = 1000) => {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(callback, { timeout: fallback });
        } else {
            setTimeout(callback, fallback);
        }
    };
    
    console.log('Core: критичный функционал загружен');
})();
