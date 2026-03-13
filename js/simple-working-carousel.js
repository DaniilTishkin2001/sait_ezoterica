// ИСПРАВЛЕННАЯ АДАПТИВНАЯ КАРУСЕЛЬ
(function() {
    let currentIndex = 0;
    let track;
    let items;
    let itemsPerView = 3;
    
    function getItemsPerView() {
        const width = window.innerWidth;
        if (width < 768) return 1;      // Mobile: < 768px
        if (width < 1024) return 2;     // Tablet: 768px - 1023px
        return 3;                       // Desktop: >= 1024px
    }
    
    function getMaxIndex() {
        return Math.max(0, items.length - itemsPerView);
    }
    
    function start() {
        track = document.querySelector('.carousel-track');
        items = document.querySelectorAll('.carousel-item');
        
        if (!track || !items.length) return;
        
        // Инициализируем количество элементов
        itemsPerView = getItemsPerView();
        
        // Кнопки
        const prev = document.querySelector('.carousel-btn-prev');
        const next = document.querySelector('.carousel-btn-next');
        
        // Удаляем onclick если есть
        if (prev) prev.removeAttribute('onclick');
        if (next) next.removeAttribute('onclick');
        
        // Назначаем клики
        if (prev) prev.onclick = () => movePrev();
        if (next) next.onclick = () => moveNext();
        
        // Показываем кнопки
        if (prev) prev.style.display = 'flex';
        if (next) next.style.display = 'flex';
        
        // Обработка изменения размера окна
        window.addEventListener('resize', () => {
            const oldItemsPerView = itemsPerView;
            itemsPerView = getItemsPerView();
            
            // Корректируем текущий индекс если изменилось количество элементов
            if (oldItemsPerView !== itemsPerView) {
                currentIndex = Math.min(currentIndex, getMaxIndex());
                update();
            }
        });
        
        update();
    }
    
    function movePrev() {
        if (currentIndex > 0) {
            currentIndex--;
            update();
        }
    }
    
    function moveNext() {
        const maxIndex = getMaxIndex();
        if (currentIndex < maxIndex) {
            currentIndex++;
            update();
        }
    }
    
    function update() {
        if (!track) return;
        
        // Ограничиваем индекс
        const maxIndex = getMaxIndex();
        currentIndex = Math.min(currentIndex, maxIndex);
        
        // Рассчитываем смещение в процентах
        const offsetPercentage = (currentIndex * 100) / itemsPerView;
        
        // Применяем трансформацию с плавным переходом
        track.style.transform = `translateX(-${offsetPercentage}%)`;
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        // Обновляем состояние кнопок
        updateButtonStates();
    }
    
    function updateButtonStates() {
        const prev = document.querySelector('.carousel-btn-prev');
        const next = document.querySelector('.carousel-btn-next');
        const maxIndex = getMaxIndex();
        
        // Блокируем/разблокируем кнопки
        if (prev) prev.style.opacity = currentIndex === 0 ? '0.3' : '1';
        if (next) next.style.opacity = currentIndex >= maxIndex ? '0.3' : '1';
        
        if (prev) prev.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        if (next) next.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
    }
    
    // Запускаем
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();
