// CAROUSEL.JS - Карусель карточек
// Загружается только если есть элементы карусели

(function() {
    'use strict';
    
    let currentSlide = 0;
    let track = null;
    let items = null;
    let itemsPerView = 3;
    let totalSlides = 0;
    let cardWidth = 0;
    let gapWidth = 20;
    
    function initCarousel() {
        // Находим элементы
        track = document.querySelector('.carousel-track');
        items = document.querySelectorAll('.carousel-item');
        
        if (!track || items.length === 0) {
            console.log('Carousel: элементы не найдены');
            return;
        }
        
        console.log(`Carousel: найдено ${items.length} элементов`);
        
        // Рассчитываем размеры
        calculateCardDimensions();
        
        // Удаляем onclick атрибуты
        removeOnclickAttributes();
        
        // Устанавливаем начальное положение
        updateCarousel();
        
        // Добавляем обработчики событий
        setupEventListeners();
        
        // Обновляем кнопки
        updateButtonStates();
        
        console.log('Carousel: инициализирована');
    }
    
    function calculateCardDimensions() {
        const container = document.querySelector('.carousel-container');
        if (!container) return;
        
        const containerWidth = container.offsetWidth;
        cardWidth = (containerWidth - (gapWidth * (itemsPerView - 1))) / itemsPerView;
        
        // Устанавливаем размеры карточек
        items.forEach(item => {
            item.style.width = cardWidth + 'px';
            item.style.flex = '0 0 ' + cardWidth + 'px';
        });
        
        totalSlides = items.length;
    }
    
    function removeOnclickAttributes() {
        items.forEach(item => {
            if (item.hasAttribute('onclick')) {
                item.removeAttribute('onclick');
            }
        });
    }
    
    function setupEventListeners() {
        // Кнопки навигации
        const prevBtn = document.querySelector('.carousel-btn-prev');
        const nextBtn = document.querySelector('.carousel-btn-next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => navigateCarousel(-1), { passive: true });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => navigateCarousel(1), { passive: true });
        }
        
        // Клик на карточку
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                console.log(`Carousel: клик на карточку ${index}`);
                // Здесь можно добавить логику для клика на карточку
            }, { passive: true });
        });
        
        // Touch события для мобильных
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });
        
        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        }, { passive: true });
        
        track.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            const diff = startX - currentX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    navigateCarousel(1);
                } else {
                    navigateCarousel(-1);
                }
            }
            
            isDragging = false;
        }, { passive: true });
        
        // Resize
        window.addEventListener('resize', () => {
            calculateCardDimensions();
            updateCarousel();
        }, { passive: true });
    }
    
    function navigateCarousel(direction) {
        currentSlide += direction;
        
        // Бесконечный цикл
        if (currentSlide < 0) {
            currentSlide = totalSlides - itemsPerView;
        } else if (currentSlide > totalSlides - itemsPerView) {
            currentSlide = 0;
        }
        
        updateCarousel();
        updateButtonStates();
    }
    
    function updateCarousel() {
        const offset = -(currentSlide * (cardWidth + gapWidth));
        track.style.transform = `translateX(${offset}px)`;
        
        // Обновляем активный класс
        items.forEach((item, index) => {
            item.classList.remove('active');
            if (index >= currentSlide && index < currentSlide + itemsPerView) {
                item.classList.add('active');
            }
        });
    }
    
    function updateButtonStates() {
        const prevBtn = document.querySelector('.carousel-btn-prev');
        const nextBtn = document.querySelector('.carousel-btn-next');
        
        if (prevBtn && nextBtn) {
            // Всегда показываем кнопки для бесконечного цикла
            prevBtn.classList.remove('hidden');
            nextBtn.classList.remove('hidden');
        }
    }
    
    // Инициализация модуля
    function init() {
        // Проверяем наличие карусели
        if (document.querySelector('.carousel-track')) {
            loadWhenIdle(initCarousel, 150);
        }
    }
    
    // Отложенная инициализация
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
