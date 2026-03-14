// MENU.JS - Мобильное меню и навигация
// Загружается только если есть элементы меню

(function() {
    'use strict';
    
    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileDropdown = document.getElementById('mobileDropdown');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        
        if (!mobileMenuBtn || !mobileDropdown) {
            console.log('Menu: элементы меню не найдены');
            return;
        }
        
        function toggleDropdown(e) {
            if (e) e.preventDefault();
            
            const isOpen = mobileDropdown.classList.contains('active');
            
            if (isOpen) {
                mobileDropdown.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            } else {
                mobileDropdown.classList.add('active');
                mobileMenuBtn.classList.add('active');
                if (mobileMenuOverlay) mobileMenuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
            }
        }
        
        // Обработчики событий с passive listeners
        mobileMenuBtn.addEventListener('click', toggleDropdown, { passive: false });
        
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', toggleDropdown, { passive: false });
        }
        
        // Закрытие при клике вне меню
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileDropdown.contains(e.target)) {
                if (mobileDropdown.classList.contains('active')) {
                    toggleDropdown();
                }
            }
        }, { passive: true });
        
        // Закрытие при ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileDropdown.classList.contains('active')) {
                toggleDropdown();
            }
        }, { passive: true });
        
        console.log('Menu: мобильное меню инициализировано');
    }
    
    // Плавная прокрутка
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, { passive: false });
        });
        
        console.log('Menu: плавная прокрутка инициализирована');
    }
    
    // Telegram кнопка
    function initTelegramButton() {
        const telegramBtn = document.querySelector('.telegram-float-btn');
        if (telegramBtn) {
            setTimeout(() => {
                telegramBtn.classList.add('visible');
            }, 1000);
        }
        
        console.log('Menu: Telegram кнопка инициализирована');
    }
    
    // Инициализация модуля
    function init() {
        // Проверяем наличие элементов меню
        if (document.getElementById('mobileMenuBtn') || document.getElementById('mobileDropdown')) {
            loadWhenIdle(initMobileMenu, 100);
        }
        
        // Плавная прокрутка
        if (document.querySelectorAll('a[href^="#"]').length > 0) {
            loadWhenIdle(initSmoothScroll, 200);
        }
        
        // Telegram кнопка
        if (document.querySelector('.telegram-float-btn')) {
            loadWhenIdle(initTelegramButton, 500);
        }
    }
    
    // Отложенная инициализация
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
