// Unified Scroll Performance Optimizer
class UnifiedScrollHandler {
    constructor() {
        this.ticking = false;
        this.cachedElements = {};
        this.init();
    }

    init() {
        // Cache DOM elements once
        this.cacheElements();
        
        // Single scroll listener
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
        
        // Initial update
        this.updateAll();
    }

    cacheElements() {
        this.cachedElements = {
            telegramBtn: document.querySelector('.telegram-float-btn'),
            cards: document.querySelectorAll('.card'),
            sections: document.querySelectorAll('section[id]'),
            navLinks: document.querySelectorAll('.nav__link'),
            scrollElements: document.querySelectorAll('[data-scroll]')
        };
    }

    handleScroll() {
        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                this.updateAll();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    updateAll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollProgress = documentHeight > windowHeight ? scrollTop / (documentHeight - windowHeight) : 0;

        // Update telegram button
        this.updateTelegramButton(scrollTop, windowHeight, documentHeight, scrollProgress);
        
        // Update parallax cards
        this.updateParallaxCards(scrollTop);
        
        // Update active navigation
        this.updateActiveNavigation(scrollTop);
        
        // Update scroll elements
        this.updateScrollElements(scrollTop, windowHeight);
    }

    updateTelegramButton(scrollTop, windowHeight, documentHeight, scrollProgress) {
        const button = this.cachedElements.telegramBtn;
        if (!button) return;

        const buttonHeight = button.offsetHeight;
        const availableHeight = documentHeight - buttonHeight;
        const currentPosition = scrollProgress * availableHeight;
        
        button.style.top = `${currentPosition}px`;
        
        const scale = 1 + (scrollProgress * 0.1);
        button.style.transform = `translateX(0) scale(${scale})`;
        
        const opacity = 0.8 + (scrollProgress * 0.2);
        button.style.opacity = opacity;
    }

    updateParallaxCards(scrolled) {
        const cards = this.cachedElements.cards;
        if (!cards.length) return;

        cards.forEach((card, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            card.style.transform = `translateY(${yPos}px)`;
        });
    }

    updateActiveNavigation(scrollTop) {
        const sections = this.cachedElements.sections;
        const navLinks = this.cachedElements.navLinks;
        
        if (!sections.length || !navLinks.length) return;

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollTop >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    updateScrollElements(scrollTop, windowHeight) {
        const scrollElements = this.cachedElements.scrollElements;
        if (!scrollElements.length) return;

        scrollElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < windowHeight && rect.bottom > 0) {
                el.classList.add('in-view');
            } else {
                el.classList.remove('in-view');
            }
        });
    }
}

// Replace all individual scroll handlers with unified one
document.addEventListener('DOMContentLoaded', () => {
    window.unifiedScrollHandler = new UnifiedScrollHandler();
});
