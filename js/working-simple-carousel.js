// ПРОСТАЯ РАБОЧАЯ КАРУСЕЛЬ - БЕЗ ХРЕНЕВЫХ ПРОВЕРОК
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
        
        // Назначаем простые обработчики - ГАРАНТИРОВАННО РАБОТАЮТ
        if (prevBtn) {
            prevBtn.onclick = function() {
                console.log('Prev кнопка нажата!');
                currentSlide--;
                if (currentSlide < 0) {
                    // Циклический возврат к концу
                    currentSlide = Math.max(0, items.length - itemsPerView);
                }
                updateCarousel();
            };
        }
        
        if (nextBtn) {
            nextBtn.onclick = function() {
                console.log('Next кнопка нажата!');
                currentSlide++;
                const maxSlide = Math.max(0, items.length - itemsPerView);
                if (currentSlide > maxSlide) {
                    // Циклический возврат к началу
                    currentSlide = 0;
                }
                updateCarousel();
            };
        }
        
        // Первоначальное обновление
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
    }
    
    function updateCarousel() {
        if (!track) return;
        
        // Ограничиваем слайд
        const maxSlide = Math.max(0, items.length - itemsPerView);
        currentSlide = Math.min(currentSlide, maxSlide);
        
        // ПРАВИЛЬНЫЙ РАСЧЕТ СМЕЩЕНИЯ
        const itemWidth = 100 / itemsPerView;
        const offset = currentSlide * itemWidth;
        
        console.log(`Расчет: itemsPerView=${itemsPerView}, itemWidth=${itemWidth}%, currentSlide=${currentSlide}, offset=${offset}%`);
        
        // Применяем трансформацию
        track.style.transform = `translateX(-${offset}%)`;
        
        // ДЕЛАЕМ КНОПКИ ВСЕГДА ВИДНЫМИ И РАБОЧИМИ!
        const prevBtn = document.querySelector('.carousel-btn-prev');
        const nextBtn = document.querySelector('.carousel-btn-next');
        
        // ГАРАНТИРОВАННО ПОКАЗЫВАЕМ КНОПКИ НА ВСЕХ ЭКРАНАХ
        if (prevBtn) {
            prevBtn.style.display = 'flex';
            prevBtn.style.visibility = 'visible';
            prevBtn.style.opacity = '1';
            prevBtn.style.pointerEvents = 'auto';
        }
        
        if (nextBtn) {
            nextBtn.style.display = 'flex';
            nextBtn.style.visibility = 'visible';
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
        }
        
        console.log(`Слайд: ${currentSlide}/${maxSlide}, смещение: ${offset}%, экран: ${window.innerWidth}px, кнопки видны!`);
    }
    
    // Инициализация
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
