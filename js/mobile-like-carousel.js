// КАРУСЕЛЬ КАК НА МОБИЛЬНЫХ - ПРОСТО И РАБОЧИЙ
(function() {
    'use strict';
    
    let currentSlide = 0;
    let track = null;
    let items = null;
    let itemsPerView = 3;
    
    function init() {
        track = document.querySelector('.carousel-track');
        items = document.querySelectorAll('.carousel-item');
        
        if (!track || items.length === 0) {
            console.log('Carousel: элементы не найдены');
            return;
        }
        
        console.log(`Carousel: найдено ${items.length} элементов`);
        
        // Удаляем onclick если есть
        const prevBtn = document.querySelector('.carousel-btn-prev');
        const nextBtn = document.querySelector('.carousel-btn-next');
        
        if (prevBtn) prevBtn.removeAttribute('onclick');
        if (nextBtn) nextBtn.removeAttribute('onclick');
        
        // Прямые обработчики КАК НА МОБИЛЬНЫХ
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Prev клик!');
                movePrev();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Next клик!');
                moveNext();
            });
        }
        
        // Первоначальное обновление
        updateItemsPerView();
        updateCarousel();
        
        // Обработка resize
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
        console.log(`Экран: ${width}px, элементов: ${itemsPerView}`);
    }
    
    function movePrev() {
        const maxSlide = Math.max(0, items.length - itemsPerView);
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = maxSlide; // Циклический возврат
        }
        console.log(`movePrev: новый слайд ${currentSlide}`);
        updateCarousel();
    }
    
    function moveNext() {
        const maxSlide = Math.max(0, items.length - itemsPerView);
        currentSlide++;
        if (currentSlide > maxSlide) {
            currentSlide = 0; // Циклический возврат
        }
        console.log(`moveNext: новый слайд ${currentSlide}`);
        updateCarousel();
    }
    
    function updateCarousel() {
        if (!track) return;
        
        const maxSlide = Math.max(0, items.length - itemsPerView);
        currentSlide = Math.min(currentSlide, maxSlide);
        
        // ПРОСТОЕ СМЕЩЕНИЕ КАК НА МОБИЛЬНЫХ
        const offset = currentSlide * (100 / itemsPerView);
        
        console.log(`updateCarousel: слайд=${currentSlide}, maxSlide=${maxSlide}, offset=${offset}%`);
        
        // Применяем трансформацию
        track.style.transform = `translateX(-${offset}%)`;
        
        // Кнопки всегда видны
        const prevBtn = document.querySelector('.carousel-btn-prev');
        const nextBtn = document.querySelector('.carousel-btn-next');
        
        if (prevBtn) prevBtn.style.display = 'flex';
        if (nextBtn) nextBtn.style.display = 'flex';
    }
    
    // Инициализация
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
