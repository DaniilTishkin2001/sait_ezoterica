// ФИНАЛЬНАЯ КАРУСЕЛЬ - ГАРАНТИРОВАННО РАБОТАЕТ НА ВСЕХ РАЗРЕШЕНИЯХ
(function() {
    'use strict';
    
    let currentSlide = 0;
    let track = null;
    let items = null;
    let itemsPerView = 3;
    let totalSlides = 0;
    
    function init() {
        // Находим элементы
        track = document.querySelector('.carousel-track');
        items = document.querySelectorAll('.carousel-item');
        
        if (!track || items.length === 0) {
            console.log('Carousel: элементы не найдены');
            return;
        }
        
        console.log(`Carousel: найдено ${items.length} элементов`);
        
        // Удаляем onclick атрибуты если есть
        removeOnclickAttributes();
        
        // Определяем количество элементов на экране
        updateItemsPerView();
        
        // Назначаем обработчики на кнопки
        setupButtonHandlers();
        
        // Первоначальное обновление
        updateCarousel();
        
        // Обработка изменения размера окна
        window.addEventListener('resize', function() {
            updateItemsPerView();
            updateCarousel();
        });
    }
    
    function removeOnclickAttributes() {
        const prevBtn = document.querySelector('.carousel-btn-prev');
        const nextBtn = document.querySelector('.carousel-btn-next');
        
        if (prevBtn && prevBtn.hasAttribute('onclick')) {
            prevBtn.removeAttribute('onclick');
            console.log('Удален onclick с кнопки prev');
        }
        
        if (nextBtn && nextBtn.hasAttribute('onclick')) {
            nextBtn.removeAttribute('onclick');
            console.log('Удален onclick с кнопки next');
        }
    }
    
    function setupButtonHandlers() {
        const prevBtn = document.querySelector('.carousel-btn-prev');
        const nextBtn = document.querySelector('.carousel-btn-next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                movePrev();
            });
            console.log('Добавлен обработчик на кнопку prev');
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                moveNext();
            });
            console.log('Добавлен обработчик на кнопку next');
        }
    }
    
    function updateItemsPerView() {
        const width = window.innerWidth;
        if (width < 768) {
            itemsPerView = 1;      // Mobile: < 768px
        } else if (width < 1024) {
            itemsPerView = 2;      // Tablet: 768px - 1023px
        } else {
            itemsPerView = 3;      // Desktop: >= 1024px
        }
        
        // Правильный расчет общего количества слайдов
        // Всегда есть возможность переключаться если элементов > itemsPerView
        if (items.length > itemsPerView) {
            totalSlides = items.length - itemsPerView;
        } else {
            totalSlides = 0;
        }
        
        console.log(`Разрешение: ${width}px, элементов на экране: ${itemsPerView}, всего элементов: ${items.length}, всего слайдов: ${totalSlides}`);
    }
    
    function movePrev() {
        console.log(`movePrev: текущий слайд ${currentSlide}`);
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = totalSlides;
        }
        updateCarousel();
    }
    
    function moveNext() {
        console.log(`moveNext: текущий слайд ${currentSlide}`);
        currentSlide++;
        if (currentSlide > totalSlides) {
            currentSlide = 0;
        }
        updateCarousel();
    }
    
    function updateCarousel() {
        if (!track) return;
        
        // Ограничиваем текущий слайд
        currentSlide = Math.min(currentSlide, totalSlides);
        
        // Рассчитываем смещение
        const slideWidth = 100 / itemsPerView;
        const offset = currentSlide * slideWidth;
        
        // Применяем трансформацию
        track.style.transform = `translateX(-${offset}%)`;
        
        // Обновляем состояние кнопок
        updateButtonStates();
        
        console.log(`Carousel: слайд ${currentSlide}/${totalSlides}, смещение: ${offset}%`);
    }
    
    function updateButtonStates() {
        const prevBtn = document.querySelector('.carousel-btn-prev');
        const nextBtn = document.querySelector('.carousel-btn-next');
        
        if (!prevBtn || !nextBtn) {
            console.log('Кнопки не найдены');
            return;
        }
        
        // Убираем класс hidden
        prevBtn.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
        
        // Логика отображения кнопок
        const canGoPrev = currentSlide > 0;
        const canGoNext = currentSlide < totalSlides;
        
        // Добавляем класс hidden на границах
        if (!canGoPrev) {
            prevBtn.classList.add('hidden');
        }
        if (!canGoNext) {
            nextBtn.classList.add('hidden');
        }
        
        console.log(`Кнопки: canGoPrev=${canGoPrev}, canGoNext=${canGoNext}, currentSlide=${currentSlide}, totalSlides=${totalSlides}`);
    }
    
    // Инициализация при загрузке DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Делаем доступным глобально для отладки
    window.finalCarousel = {
        movePrev: movePrev,
        moveNext: moveNext,
        currentSlide: function() { return currentSlide; },
        totalSlides: function() { return totalSlides; }
    };
})();
