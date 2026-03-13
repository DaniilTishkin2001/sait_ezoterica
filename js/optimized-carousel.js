// Optimized Carousel System
class OptimizedCarousel {
    constructor() {
        this.carousels = new Map();
        this.ticking = false;
        this.resizeTimeout = null;
        this.init();
    }

    init() {
        console.log('OptimizedCarousel init() called');
        // Find all carousel wrappers
        const wrappers = document.querySelectorAll('.carousel-wrapper');
        console.log(`Found ${wrappers.length} carousel wrappers`);
        
        wrappers.forEach((wrapper, index) => {
            console.log(`Setting up carousel ${index}`);
            this.setupCarousel(wrapper, index);
        });

        // Setup global resize handler with debouncing
        this.setupResizeHandler();
        console.log('OptimizedCarousel init complete');
    }

    setupCarousel(wrapper, index) {
        const track = wrapper.querySelector('.carousel-track');
        const items = wrapper.querySelectorAll('.carousel-item');
        // Ищем кнопки в том же контейнере, где wrapper
        const container = wrapper.closest('.carousel-container');
        const prevBtn = container?.querySelector('.carousel-btn.carousel-btn-prev');
        const nextBtn = container?.querySelector('.carousel-btn.carousel-btn-next');

        console.log(`Carousel ${index}: track=${!!track}, items=${items.length}, prevBtn=${!!prevBtn}, nextBtn=${!!nextBtn}`);

        if (!track || items.length === 0) return;

        const carouselData = {
            wrapper,
            track,
            items,
            prevBtn,
            nextBtn,
            currentIndex: 0,
            itemsPerView: this.getItemsPerView(),
            totalItems: items.length,
            isAnimating: false,
            touchStartX: 0,
            touchEndX: 0
        };

        this.carousels.set(index, carouselData);

        // Setup event listeners
        this.setupButtonHandlers(carouselData);
        this.setupTouchHandlers(carouselData);
        this.setupClickHandlers(carouselData);

        // Initial setup
        this.updateCarousel(carouselData);
        this.addOptimizedStyles(carouselData);
    }

    getItemsPerView() {
        const width = window.innerWidth;
        if (width <= 768) return 1;      // Mobile: 1 элемент
        if (width <= 1024) return 2;     // Tablet: 2 элемента
        return 3;                         // Desktop/Notebook: 3 элемента
    }

    setupButtonHandlers(carousel) {
        const { prevBtn, nextBtn } = carousel;

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.moveCarousel(carousel, -1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.moveCarousel(carousel, 1);
            });
        }
    }

    setupTouchHandlers(carousel) {
        const { track } = carousel;

        track.addEventListener('touchstart', (e) => {
            carousel.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            carousel.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(carousel);
        }, { passive: true });
    }

    setupClickHandlers(carousel) {
        const { items } = carousel;

        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                const itemsPerView = this.getItemsPerView();
                const targetIndex = Math.floor(index / itemsPerView);
                carousel.currentIndex = targetIndex;
                this.updateCarousel(carousel);
            });
        });
    }

    handleSwipe(carousel) {
        const diff = carousel.touchStartX - carousel.touchEndX;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.moveCarousel(carousel, 1);  // Swipe left - next
            } else {
                this.moveCarousel(carousel, -1); // Swipe right - prev
            }
        }
    }

    moveCarousel(carousel, direction) {
        if (carousel.isAnimating) return;

        const itemsPerView = this.getItemsPerView();
        const maxIndex = Math.max(0, carousel.totalItems - itemsPerView);

        console.log(`moveCarousel: direction=${direction}, currentIndex=${carousel.currentIndex}, maxIndex=${maxIndex}, itemsPerView=${itemsPerView}`);

        carousel.currentIndex += direction;

        // Boundaries
        if (carousel.currentIndex < 0) {
            carousel.currentIndex = maxIndex; // Loop to end
        } else if (carousel.currentIndex > maxIndex) {
            carousel.currentIndex = 0;     // Loop to start
        }

        console.log(`New currentIndex: ${carousel.currentIndex}`);
        this.updateCarousel(carousel);
    }

    updateCarousel(carousel) {
        const itemsPerView = this.getItemsPerView();
        const maxIndex = Math.max(0, carousel.totalItems - itemsPerView);

        // Ensure current index is valid
        carousel.currentIndex = Math.min(carousel.currentIndex, maxIndex);

        // Calculate transform percentage based on current index
        const offsetPercentage = (carousel.currentIndex * 100) / itemsPerView;
        
        // Apply transform with CSS transition
        carousel.track.style.transform = `translateX(-${offsetPercentage}%)`;

        // Update button states
        this.updateButtonStates(carousel);

        // Update item states
        this.updateItemStates(carousel, itemsPerView);
    }

    updateButtonStates(carousel) {
        const { prevBtn, nextBtn } = carousel;
        const itemsPerView = this.getItemsPerView();
        const maxIndex = Math.max(0, carousel.totalItems - itemsPerView);

        if (prevBtn) {
            prevBtn.style.display = carousel.currentIndex === 0 ? 'none' : 'flex';
        }

        if (nextBtn) {
            nextBtn.style.display = carousel.currentIndex >= maxIndex ? 'none' : 'flex';
        }
    }

    updateItemStates(carousel, itemsPerView) {
        const { items } = carousel;

        items.forEach((item, index) => {
            const isActive = index >= carousel.currentIndex && 
                           index < carousel.currentIndex + itemsPerView;
            
            item.classList.toggle('active', isActive);
            item.setAttribute('aria-hidden', !isActive);
        });
    }

    addOptimizedStyles(carousel) {
        // Styles are now in carousel.css file
        console.log('Carousel styles loaded from carousel.css');
    }

    setupResizeHandler() {
        window.addEventListener('resize', () => {
            if (this.resizeTimeout) {
                clearTimeout(this.resizeTimeout);
            }

            this.resizeTimeout = setTimeout(() => {
                this.carousels.forEach(carousel => {
                    this.updateCarousel(carousel);
                });
            }, 150);
        }, { passive: true });
    }

    // Public method for external control
    goToSlide(carouselIndex, slideIndex) {
        const carousel = this.carousels.get(carouselIndex);
        if (carousel) {
            carousel.currentIndex = slideIndex;
            this.updateCarousel(carousel);
        }
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing OptimizedCarousel...');
    window.optimizedCarousel = new OptimizedCarousel();
    console.log('OptimizedCarousel initialized');
});
