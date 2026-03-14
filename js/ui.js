// UI.JS - UI элементы и интерактивность
// Загружается для улучшения UX

(function() {
    'use strict';
    
    function initLazyLoading() {
        // Native lazy loading с fallback
        const images = document.querySelectorAll('img:not([loading])');
        
        images.forEach(img => {
            img.setAttribute('loading', 'lazy');
            img.setAttribute('decoding', 'async');
            
            // Добавляем placeholder
            if (!img.src && img.dataset.src) {
                img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg==';
            }
        });
        
        console.log('UI: lazy loading инициализирован');
    }
    
    function initAOS() {
        // AOS (Animate On Scroll) - только если библиотека загружена
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                once: true,
                offset: 50,
                disable: window.innerWidth < 768
            });
            console.log('UI: AOS инициализирован');
        } else {
            console.log('UI: AOS библиотека не найдена');
        }
    }
    
    function initVanillaTilt() {
        // Vanilla Tilt - только для десктопа
        if (window.innerWidth > 1024 && typeof VanillaTilt !== 'undefined') {
            const tiltElements = document.querySelectorAll('[data-tilt]');
            VanillaTilt.init(tiltElements, {
                max: 15,
                speed: 400,
                glare: true,
                'max-glare': 0.5
            });
            console.log('UI: Vanilla Tilt инициализирован');
        }
    }
    
    function initMicroInteractions() {
        // Микро-взаимодействия для кнопок
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(btn => {
            // Ripple эффект
            btn.addEventListener('click', function(e) {
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
            }, { passive: true });
        });
        
        // Hover эффекты для карточек
        const cards = document.querySelectorAll('.about__item, .program-card, .special-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            }, { passive: true });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            }, { passive: true });
        });
        
        console.log('UI: микро-взаимодействия инициализированы');
    }
    
    function initFormValidation() {
        // Валидация форм (если есть)
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                        
                        // Показываем ошибку
                        const errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'Это поле обязательно для заполнения';
                        field.parentNode.appendChild(errorMsg);
                        
                        setTimeout(() => {
                            errorMsg.remove();
                            field.classList.remove('error');
                        }, 3000);
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                }
            }, { passive: false });
        });
        
        console.log('UI: валидация форм инициализирована');
    }
    
    // Инициализация модуля
    function init() {
        // Lazy loading - высокий приоритет
        loadWhenIdle(initLazyLoading, 50);
        
        // AOS - средний приоритет
        loadWhenIdle(initAOS, 300);
        
        // Vanilla Tilt - низкий приоритет
        loadWhenIdle(initVanillaTilt, 1000);
        
        // Микро-взаимодействия - средний приоритет
        loadWhenIdle(initMicroInteractions, 200);
        
        // Валидация форм - низкий приоритет
        loadWhenIdle(initFormValidation, 800);
    }
    
    // Отложенная инициализация
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
