// РАБОЧАЯ КАРУСЕЛЬ - МАКСИМАЛЬНО ПРОСТО
(function() {
    'use strict';
    
    let currentSlide = 0;
    let track = null;
    let items = null;
    let itemsPerView = 3;
    
    function init() {
        // Находим элементы
        track = document.querySelector('.carousel-track');
        items = document.querySelectorAll('.carousel-item');
        
        if (!track || items.length === 0) {
            console.log('Carousel: элементы не найдены');
            return;
        }
        
        console.log(`Carousel: найдено ${items.length} элементов`);
        
        // Определяем количество элементов на экране
        updateItemsPerView();
        
        // Назначаем обработчики на кнопки
        const prevBtn = document.querySelector('.carousel-btn-prev');
        const nextBtn = document.querySelector('.carousel-btn-next');
        
        if (prevBtn) {
            prevBtn.onclick = function(e) {
                e.preventDefault();
                movePrev();
            };
        }
        
        if (nextBtn) {
            nextBtn.onclick = function(e) {
                e.preventDefault();
                moveNext();
            };
        }
        
        // Первоначальное обновление
        updateCarousel();
        
        // Обработка изменения размера окна
        window.addEventListener('resize', function() {
            updateItemsPerView();
            updateCarousel();
        });
    }
    
    function updateItemsPerView() {
        const width = window.innerWidth;
        if (width <= 768) {
            itemsPerView = 1;
        } else if (width <= 1024) {
            itemsPerView = 2;
        } else {
            itemsPerView = 3;
        }
    }
    
    function movePrev() {
        const maxSlide = Math.max(0, items.length - itemsPerView);
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = maxSlide;
        }
        updateCarousel();
    }
    
    function moveNext() {
        const maxSlide = Math.max(0, items.length - itemsPerView);
        currentSlide++;
        if (currentSlide > maxSlide) {
            currentSlide = 0;
        }
        updateCarousel();
    }
    
    function updateCarousel() {
        if (!track) return;
        
        const maxSlide = Math.max(0, items.length - itemsPerView);
        currentSlide = Math.min(currentSlide, maxSlide);
        
        // Рассчитываем смещение
        const slideWidth = 100 / itemsPerView;
        const offset = currentSlide * slideWidth;
        
        // Применяем трансформацию
        track.style.transform = `translateX(-${offset}%)`;
        
        // Обновляем видимость кнопок
        const prevBtn = document.querySelector('.carousel-btn-prev');
        const nextBtn = document.querySelector('.carousel-btn-next');
        
        if (prevBtn) {
            prevBtn.style.display = currentSlide === 0 ? 'none' : 'flex';
        }
        if (nextBtn) {
            nextBtn.style.display = currentSlide >= maxSlide ? 'none' : 'flex';
        }
        
        console.log(`Carousel: слайд ${currentSlide}/${maxSlide}, элементов на экране: ${itemsPerView}`);
    }
    
    // Инициализация при загрузке DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
