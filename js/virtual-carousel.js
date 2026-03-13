// Virtual Carousel with Performance Optimization
class VirtualCarousel {
    constructor() {
        this.currentIndex = 0;
        this.track = null;
        this.items = null;
        this.itemsPerView = 3;
        this.loadedSlides = new Set();
        this.visibleRange = { start: 0, end: 0 };
        this.isAnimating = false;
        this.rafId = null;
        
        this.init();
    }

    init() {
        this.track = document.querySelector('.carousel-track');
        this.items = document.querySelectorAll('.carousel-item');
        
        if (!this.track || !this.items.length) return;

        this.itemsPerView = this.getItemsPerView();
        this.setupVirtualRendering();
        this.setupButtons();
        this.setupResizeHandler();
        this.update();
    }

    getItemsPerView() {
        const width = window.innerWidth;
        if (width < 768) return 1;
        if (width < 1024) return 2;
        return 3;
    }

    setupVirtualRendering() {
        // Only render visible slides initially
        this.visibleRange = {
            start: 0,
            end: Math.min(this.itemsPerView * 2, this.items.length) // Render buffer
        };
        
        this.renderVisibleSlides();
    }

    renderVisibleSlides() {
        const { start, end } = this.visibleRange;
        
        // Hide all slides first
        this.items.forEach((item, index) => {
            item.style.display = 'none';
            item.setAttribute('aria-hidden', 'true');
        });
        
        // Show only visible slides
        for (let i = start; i < end && i < this.items.length; i++) {
            const item = this.items[i];
            item.style.display = 'block';
            item.setAttribute('aria-hidden', 'false');
            
            // Load slide content if not loaded
            if (!this.loadedSlides.has(i)) {
                this.loadSlideContent(item, i);
                this.loadedSlides.add(i);
            }
        }
    }

    loadSlideContent(slideElement, index) {
        // Use requestAnimationFrame for smooth loading
        this.rafId = requestAnimationFrame(() => {
            // Load image if not already loaded
            const image = slideElement.querySelector('.special-card__image img');
            if (image && !image.complete) {
                image.loading = 'eager'; // Load visible slides eagerly
            }
            
            // Add to viewport for Intersection Observer
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            slideElement.classList.add('visible');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.1 }
            );
            
            observer.observe(slideElement);
        });
    }

    setupButtons() {
        const prev = document.querySelector('.carousel-btn-prev');
        const next = document.querySelector('.carousel-btn-next');

        if (prev) {
            prev.removeAttribute('onclick');
            prev.onclick = () => this.movePrev();
            prev.style.display = 'flex';
        }
        
        if (next) {
            next.removeAttribute('onclick');
            next.onclick = () => this.moveNext();
            next.style.display = 'flex';
        }
    }

    movePrev() {
        if (this.isAnimating || this.currentIndex === 0) return;
        
        this.isAnimating = true;
        this.currentIndex--;
        
        this.updateVisibleRange();
        this.renderVisibleSlides();
        this.update();
        
        // Reset animation flag after transition
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }

    moveNext() {
        const maxIndex = this.getMaxIndex();
        if (this.isAnimating || this.currentIndex >= maxIndex) return;
        
        this.isAnimating = true;
        this.currentIndex++;
        
        this.updateVisibleRange();
        this.renderVisibleSlides();
        this.update();
        
        // Reset animation flag after transition
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }

    updateVisibleRange() {
        const buffer = this.itemsPerView; // Buffer slides
        const newStart = Math.max(0, this.currentIndex - buffer);
        const newEnd = Math.min(
            this.items.length, 
            this.currentIndex + this.itemsPerView + buffer
        );
        
        this.visibleRange = { start: newStart, end: newEnd };
    }

    getMaxIndex() {
        return Math.max(0, this.items.length - this.itemsPerView);
    }

    update() {
        if (!this.track) return;

        const maxIndex = this.getMaxIndex();
        this.currentIndex = Math.min(this.currentIndex, maxIndex);

        // Use transform3d for GPU acceleration
        const offsetPercentage = (this.currentIndex * 100) / this.itemsPerView;
        
        // Cancel previous animation frame
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        
        this.rafId = requestAnimationFrame(() => {
            this.track.style.transform = `translate3d(-${offsetPercentage}%, 0, 0)`;
            this.track.style.transition = this.isAnimating 
                ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                : 'none';
            
            this.updateButtonStates();
        });
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

    setupResizeHandler() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const oldItemsPerView = this.itemsPerView;
                this.itemsPerView = this.getItemsPerView();
                
                if (oldItemsPerView !== this.itemsPerView) {
                    this.currentIndex = Math.min(this.currentIndex, this.getMaxIndex());
                    this.setupVirtualRendering();
                    this.update();
                }
            }, 150);
        });
    }

    destroy() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        this.loadedSlides.clear();
    }
}

// Initialize virtual carousel
let virtualCarousel;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        virtualCarousel = new VirtualCarousel();
    });
} else {
    virtualCarousel = new VirtualCarousel();
}
