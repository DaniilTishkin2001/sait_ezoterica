// ПРОСТАЯ КАРУСЕЛЬ - РАБОТАЕТ ОТ 1024PX И ВЫШЕ
(function() {
    let currentSlide = 0;
    let track = null;
    let items = null;
    let itemsPerView = 3;
    
    function init() {
        track = document.querySelector('.carousel-track');
        items = document.querySelectorAll('.carousel-item');
        
        if (!track || items.length === 0) return;
        
        console.log('Карусель найдена:', items.length, 'элементов');
        
        // Определяем количество элементов
        updateItemsPerView();
        
        // Кнопки
        const prevBtn = document.querySelector('.carousel-btn-prev');
        const nextBtn = document.querySelector('.carousel-btn-next');
        
        // Удаляем onclick
        if (prevBtn) prevBtn.removeAttribute('onclick');
        if (nextBtn) nextBtn.removeAttribute('onclick');
        
        // Простые обработчики
        if (prevBtn) {
            prevBtn.onclick = function() {
                console.log('Prev нажат!');
                movePrev();
            };
        }
        
        if (nextBtn) {
            nextBtn.onclick = function() {
                console.log('Next нажат!');
                moveNext();
            };
        }
        
        // Показываем кнопки ПРИНУДИТЕЛЬНО на всех разрешениях от 1024px
        if (window.innerWidth >= 1024) {
            if (prevBtn) {
                prevBtn.style.display = 'flex';
                prevBtn.style.visibility = 'visible';
                prevBtn.style.opacity = '1';
                prevBtn.style.pointerEvents = 'auto';
                console.log('Prev кнопка показана');
            }
            if (nextBtn) {
                nextBtn.style.display = 'flex';
                nextBtn.style.visibility = 'visible';
                nextBtn.style.opacity = '1';
                nextBtn.style.pointerEvents = 'auto';
                console.log('Next кнопка показана');
            }
        } else {
            // Скрываем на меньших разрешениях
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
        }
        
        // Начальное положение
        moveCarousel();
        
        // Обработка изменения размера
        window.addEventListener('resize', function() {
            updateItemsPerView();
            
            // ПРИНУДИТЕЛЬНО показываем кнопки на >= 1024px
            if (window.innerWidth >= 1024) {
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
                console.log('Кнопки показаны при resize, экран:', window.innerWidth + 'px');
            } else {
                // Скрываем на меньших разрешениях
                if (prevBtn) prevBtn.style.display = 'none';
                if (nextBtn) nextBtn.style.display = 'none';
            }
            
            moveCarousel();
        });
    }
    
    function updateItemsPerView() {
        const width = window.innerWidth;
        if (width >= 1024 && width < 1200) {
            itemsPerView = 2; // Маленькие десктопы
        } else if (width >= 1200) {
            itemsPerView = 3; // Большие десктопы
        } else {
            itemsPerView = 3; // По умолчанию
        }
        console.log('Экран:', width + 'px, элементов:', itemsPerView);
    }
    
    function movePrev() {
        const maxSlide = Math.max(0, items.length - itemsPerView);
        currentSlide--;
        if (currentSlide < 0) currentSlide = maxSlide;
        console.log('movePrev: новый слайд', currentSlide);
        moveCarousel();
    }
    
    function moveNext() {
        const maxSlide = Math.max(0, items.length - itemsPerView);
        currentSlide++;
        if (currentSlide > maxSlide) currentSlide = 0;
        console.log('moveNext: новый слайд', currentSlide);
        moveCarousel();
    }
    
    function moveCarousel() {
        if (!track) return;
        
        const maxSlide = Math.max(0, items.length - itemsPerView);
        currentSlide = Math.min(currentSlide, maxSlide);
        
        // Рассчитываем смещение
        const offset = (currentSlide * 100) / itemsPerView;
        
        console.log('Двигаем на:', offset + '%');
        
        // Двигаем карточки
        track.style.transform = `translateX(-${offset}%)`;
        track.style.transition = 'transform 0.3s ease';
    }
    
    // Инициализация
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
