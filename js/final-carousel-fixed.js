// ИСПРАВЛЕННАЯ КАРУСЕЛЬ - 3 КАРТОЧКИ НА ЭКРАНЕ, БЕСКОНЕЧНЫЙ ЦИКЛ, КЛИКИ НА ВСЕ КАРТОЧКИ
(function() {
    'use strict';
    
    let currentSlide = 0;
    let track = null;
    let items = null;
    let itemsPerView = 3; // Всегда 3 карточки на десктопе
    let totalSlides = 0;
    let cardWidth = 0;
    let gapWidth = 20; // Промежуток между карточками
    
    function init() {
        // Находим элементы
        track = document.querySelector('.carousel-track');
        items = document.querySelectorAll('.carousel-item');
        
        if (!track || items.length === 0) {
            console.log('Carousel: элементы не найдены');
            return;
        }
        
        console.log(`Carousel: найдено ${items.length} элементов`);
        
        // Рассчитываем реальные размеры карточек
        calculateCardDimensions();
        
        // Удаляем onclick атрибуты если есть
        removeOnclickAttributes();
        
        // Назначаем обработчики на кнопки
        setupButtonHandlers();
        
        // Назначаем обработчики на карточки
        setupCardHandlers();
        
        // Первоначальное обновление
        updateCarousel();
        
        // Обработка изменения размера окна
        window.addEventListener('resize', function() {
            calculateCardDimensions();
            updateCarousel();
        });
    }
    
    function calculateCardDimensions() {
        if (!track || items.length === 0) return;
        
        // Получаем реальную ширину контейнера
        const containerWidth = track.parentElement.offsetWidth;
        const totalGapWidth = gapWidth * (itemsPerView - 1);
        cardWidth = (containerWidth - totalGapWidth) / itemsPerView;
        
        console.log(`Контейнер: ${containerWidth}px, Ширина карточки: ${cardWidth}px, Промежуток: ${gapWidth}px`);
    }
    
    function removeOnclickAttributes() {
        const prevBtn = document.querySelector('.carousel-btn-prev');
        const nextBtn = document.querySelector('.carousel-btn-next');
        
        if (prevBtn && prevBtn.hasAttribute('onclick')) {
            prevBtn.removeAttribute('onclick');
        }
        if (nextBtn && nextBtn.hasAttribute('onclick')) {
            nextBtn.removeAttribute('onclick');
        }
    }
    
    function setupButtonHandlers() {
        const prevBtn = document.querySelector('.carousel-btn-prev');
        const nextBtn = document.querySelector('.carousel-btn-next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                movePrev();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                moveNext();
            });
        }
    }
    
    function setupCardHandlers() {
        items.forEach((item, index) => {
            // Делаем все карточки кликабельными
            item.style.cursor = 'pointer';
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Рассчитываем на какой слайд перейти
                const targetSlide = Math.min(index, totalSlides);
                if (targetSlide !== currentSlide) {
                    currentSlide = targetSlide;
                    updateCarousel();
                }
            });
        });
    }
    
    function movePrev() {
        if (totalSlides === 0) return;
        
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = totalSlides; // Цикл к последнему
        }
        
        updateCarousel();
    }
    
    function moveNext() {
        if (totalSlides === 0) return;
        
        currentSlide++;
        if (currentSlide > totalSlides) {
            currentSlide = 0; // Цикл к первому
        }
        
        updateCarousel();
    }
    
    function updateCarousel() {
        if (!track) return;
        
        // Рассчитываем общее количество слайдов
        totalSlides = items.length - itemsPerView;
        if (totalSlides < 0) totalSlides = 0;
        
        // Ограничиваем текущий слайд
        currentSlide = Math.min(currentSlide, totalSlides);
        
        // Рассчитываем точное смещение в пикселях
        const offset = currentSlide * (cardWidth + gapWidth);
        
        // Применяем трансформацию
        track.style.transform = `translateX(-${offset}px)`;
        
        // Обновляем активные состояния
        updateActiveStates();
        
        console.log(`Carousel: слайд ${currentSlide}/${totalSlides}, смещение: ${offset}px`);
    }
    
    function updateActiveStates() {
        items.forEach((item, index) => {
            // Удаляем активный класс со всех карточек
            item.classList.remove('carousel-item-active');
            
            // Добавляем класс видимым карточкам
            const isVisible = index >= currentSlide && index < currentSlide + itemsPerView;
            if (isVisible) {
                item.classList.add('carousel-item-visible');
            } else {
                item.classList.remove('carousel-item-visible');
            }
        });
    }
    
    // Инициализация при загрузке DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Делаем доступным глобально
    window.finalCarousel = {
        movePrev: movePrev,
        moveNext: moveNext,
        currentSlide: function() { return currentSlide; },
        totalSlides: function() { return totalSlides; }
    };
})();
