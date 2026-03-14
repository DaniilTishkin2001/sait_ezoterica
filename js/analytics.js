// ANALYTICS.JS - Аналитика и метрики
// Загружается последним, низкий приоритет

(function() {
    'use strict';
    
    function initAnalytics() {
        // Google Analytics (если есть GA_MEASUREMENT_ID)
        if (typeof gtag !== 'undefined') {
            console.log('Analytics: Google Analytics уже загружен');
        }
        
        // Яндекс Метрика (если есть ym)
        if (typeof ym !== 'undefined') {
            console.log('Analytics: Яндекс Метрика уже загружена');
        }
        
        // Performance monitoring
        if ('PerformanceObserver' in window) {
            const perfObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'largest-contentful-paint') {
                        console.log('LCP:', entry.startTime);
                        // Отправляем в аналитику
                        if (typeof gtag !== 'undefined') {
                            gtag('event', 'LCP', {
                                'event_category': 'Web Vitals',
                                'value': Math.round(entry.startTime)
                            });
                        }
                    }
                    if (entry.entryType === 'layout-shift') {
                        console.log('CLS:', entry.value);
                        if (typeof gtag !== 'undefined') {
                            gtag('event', 'CLS', {
                                'event_category': 'Web Vitals',
                                'value': Math.round(entry.value * 1000)
                            });
                        }
                    }
                });
            });
            
            perfObserver.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift'] });
        }
        
        console.log('Analytics: метрики производительности инициализированы');
    }
    
    function initUserBehaviorTracking() {
        // Отслеживание кликов по важным элементам
        const importantElements = [
            '.btn',
            '.telegram-float-btn',
            '.process__link',
            '.carousel-item'
        ];
        
        importantElements.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.addEventListener('click', () => {
                    const eventName = selector.replace('.', '') + '_click';
                    console.log('Analytics:', eventName);
                    
                    // Отправляем в аналитику
                    if (typeof gtag !== 'undefined') {
                        gtag('event', eventName, {
                            'event_category': 'User Interaction'
                        });
                    }
                }, { passive: true });
            });
        });
        
        // Отслеживание прокрутки
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                
                // Отправляем milestones: 25%, 50%, 75%, 100%
                if ([25, 50, 75, 100].includes(scrollPercent)) {
                    console.log('Analytics: scroll_' + scrollPercent + '%');
                    
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'scroll_' + scrollPercent, {
                            'event_category': 'Scroll Depth'
                        });
                    }
                }
            }
        }, { passive: true });
        
        console.log('Analytics: отслеживание поведения пользователя инициализировано');
    }
    
    // Инициализация модуля
    function init() {
        // Аналитика - низкий приоритет
        loadWhenIdle(initAnalytics, 1000);
        
        // Отслеживание поведения - средний приоритет
        loadWhenIdle(initUserBehaviorTracking, 500);
    }
    
    // Отложенная инициализация
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
