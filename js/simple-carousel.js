// Simple Working Carousel
class SimpleCarousel {
    constructor() {
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.wrapper = document.querySelector('.carousel-wrapper');
        this.track = this.wrapper?.querySelector('.carousel-track');
        this.items = this.wrapper?.querySelectorAll('.carousel-item');
        this.prevBtn = document.querySelector('.carousel-btn-prev');
        this.nextBtn = document.querySelector('.carousel-btn-next');

        if (!this.wrapper || !this.track || this.items.length === 0) {
            console.log('Carousel elements not found');
            return;
        }

        console.log(`Found carousel with ${this.items.length} items`);
        this.setupButtons();
        this.updateCarousel();
    }

    setupButtons() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.movePrev());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.moveNext());
        }
    }

    getItemsPerView() {
        const width = window.innerWidth;
        if (width <= 768) return 1;      // Mobile
        if (width <= 1024) return 2;     // Tablet  
        return 3;                         // Desktop
    }

    movePrev() {
        const itemsPerView = this.getItemsPerView();
        const maxIndex = Math.max(0, this.items.length - itemsPerView);
        
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = maxIndex;
        }
        
        this.updateCarousel();
    }

    moveNext() {
        const itemsPerView = this.getItemsPerView();
        const maxIndex = Math.max(0, this.items.length - itemsPerView);
        
        this.currentIndex++;
        if (this.currentIndex > maxIndex) {
            this.currentIndex = 0;
        }
        
        this.updateCarousel();
    }

    updateCarousel() {
        const itemsPerView = this.getItemsPerView();
        const maxIndex = Math.max(0, this.items.length - itemsPerView);
        
        // Ограничиваем индекс
        this.currentIndex = Math.min(this.currentIndex, maxIndex);
        
        // Вычисляем смещение
        const offset = this.currentIndex * (100 / itemsPerView);
        
        // Применяем трансформацию
        this.track.style.transform = `translateX(-${offset}%)`;
        
        // Обновляем активные классы
        this.items.forEach((item, index) => {
            const isActive = index >= this.currentIndex && index < this.currentIndex + itemsPerView;
            item.classList.toggle('active', isActive);
        });
        
        // Обновляем кнопки
        this.updateButtons();
    }

    updateButtons() {
        const itemsPerView = this.getItemsPerView();
        const maxIndex = Math.max(0, this.items.length - itemsPerView);
        
        if (this.prevBtn) {
            this.prevBtn.style.display = this.currentIndex === 0 ? 'none' : 'flex';
        }
        if (this.nextBtn) {
            this.nextBtn.style.display = this.currentIndex >= maxIndex ? 'none' : 'flex';
        }
    }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing SimpleCarousel...');
    window.simpleCarousel = new SimpleCarousel();
    console.log('SimpleCarousel initialized');
});

// Обработка изменения размера окна
window.addEventListener('resize', () => {
    if (window.simpleCarousel) {
        window.simpleCarousel.updateCarousel();
    }
});
