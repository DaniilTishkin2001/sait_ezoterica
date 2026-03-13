// Ultra-Performance Lazy Loading Carousel with Virtual Slides
class PerformanceCarousel {
    constructor() {
        this.currentIndex = 0;
        this.track = null;
        this.items = null;
        this.itemsPerView = 3;
        this.loadedImages = new Set();
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            { 
                rootMargin: '100px', 
                threshold: 0.1 
            }
        );
        this.init();
    }

    getItemsPerView() {
        const width = window.innerWidth;
        if (width < 768) return 1;
        if (width < 1024) return 2;
        return 3;
    }

    getMaxIndex() {
        return Math.max(0, this.items.length - this.itemsPerView);
    }

    init() {
        this.track = document.querySelector('.carousel-track');
        this.items = document.querySelectorAll('.carousel-item');
        
        if (!this.track || !this.items.length) return;

        this.itemsPerView = this.getItemsPerView();
        this.setupButtons();
        this.setupVirtualLoading();
        this.setupResizeHandler();
        this.update();
    }

    setupButtons() {
        const prev = document.querySelector('.carousel-btn-prev');
        const next = document.querySelector('.carousel-btn-next');

        // Remove onclick attributes
        if (prev) prev.removeAttribute('onclick');
        if (next) next.removeAttribute('onclick');

        // Add optimized event listeners
        if (prev) {
            prev.onclick = () => this.movePrev();
            prev.style.display = 'flex';
        }
        if (next) {
            next.onclick = () => this.moveNext();
            next.style.display = 'flex';
        }
    }

    setupVirtualLoading() {
        // Load only visible items initially
        this.items.forEach((item, index) => {
            const image = item.querySelector('.special-card__image');
            if (!image) return;

            if (index < this.itemsPerView) {
                // Load immediately for visible items
                this.loadImage(image);
            } else {
                // Store for lazy loading
                const bgStyle = image.style.backgroundImage;
                image.setAttribute('data-bg', bgStyle);
                image.style.backgroundImage = 'none';
                image.classList.add('lazy-placeholder');
            }
        });
    }

    loadImage(image) {
        if (this.loadedImages.has(image)) return;

        const bgUrl = image.getAttribute('data-bg') || image.style.backgroundImage;
        if (!bgUrl) return;

        // Extract URL from background-image string
        const urlMatch = bgUrl.match(/url\(['"]?([^'"]+)['"]?\)/);
        if (!urlMatch) return;

        const url = urlMatch[1];
        
        // Create new image to preload
        const img = new Image();
        img.onload = () => {
            image.style.backgroundImage = bgUrl;
            image.classList.add('loaded');
            image.classList.remove('lazy-placeholder');
            this.loadedImages.add(image);
        };
        img.onerror = () => {
            // Fallback to original
            image.style.backgroundImage = bgUrl;
            image.classList.add('loaded');
            image.classList.remove('lazy-placeholder');
            this.loadedImages.add(image);
        };
        
        // Start loading
        img.src = url;
        
        // Observe for lazy loading
        this.observer.observe(image);
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.loadImage(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }

    movePrev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.update();
            this.loadVisibleImages();
        }
    }

    moveNext() {
        const maxIndex = this.getMaxIndex();
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
            this.update();
            this.loadVisibleImages();
        }
    }

    loadVisibleImages() {
        const startIndex = this.currentIndex * this.itemsPerView;
        const endIndex = Math.min(startIndex + this.itemsPerView, this.items.length);

        for (let i = startIndex; i < endIndex; i++) {
            const item = this.items[i];
            const image = item?.querySelector('.special-card__image');
            if (image && !this.loadedImages.has(image)) {
                this.loadImage(image);
            }
        }
    }

    setupResizeHandler() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const oldItemsPerView = this.itemsPerView;
                this.itemsPerView = this.getItemsPerView();
                
                if (oldItemsPerView !== this.itemsPerView) {
                    this.currentIndex = Math.min(this.currentIndex, this.getMaxIndex());
                    this.update();
                    this.loadVisibleImages();
                }
            }, 150);
        });
    }

    update() {
        if (!this.track) return;

        const maxIndex = this.getMaxIndex();
        this.currentIndex = Math.min(this.currentIndex, maxIndex);

        const offsetPercentage = (this.currentIndex * 100) / this.itemsPerView;
        
        // Use transform3d for GPU acceleration
        this.track.style.transform = `translate3d(-${offsetPercentage}%, 0, 0)`;
        this.track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        this.updateButtonStates();
    }

    updateButtonStates() {
        const prev = document.querySelector('.carousel-btn-prev');
        const next = document.querySelector('.carousel-btn-next');
        const maxIndex = this.getMaxIndex();

        if (prev) {
            const isDisabled = this.currentIndex === 0;
            prev.style.opacity = isDisabled ? '0.3' : '1';
            prev.style.pointerEvents = isDisabled ? 'none' : 'auto';
            prev.setAttribute('aria-disabled', isDisabled);
        }

        if (next) {
            const isDisabled = this.currentIndex >= maxIndex;
            next.style.opacity = isDisabled ? '0.3' : '1';
            next.style.pointerEvents = isDisabled ? 'none' : 'auto';
            next.setAttribute('aria-disabled', isDisabled);
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new PerformanceCarousel());
} else {
    new PerformanceCarousel();
}
