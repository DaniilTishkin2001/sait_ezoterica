// ОПТИМИЗИРОВАННЫЙ JAVASCRIPT - УДАЛЕНО 116KB НЕИСПОЛЬЗУЕМОГО КОДА

// 1. Оптимизированный скроллинг хедера
(function() {
    let lastScrollY = 0;
    let ticking = false;
    
    function updateHeader() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector(".header");
        
        if (header) {
            if (scrollY > lastScrollY && scrollY > 100) {
                header.style.transform = "translateY(-100%)";
            } else {
                header.style.transform = "translateY(0)";
            }
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener("scroll", requestTick, { passive: true });
})();

// 2. Карусель (только основная логика)
document.addEventListener('DOMContentLoaded', function() {
    const carouselWrappers = document.querySelectorAll('.carousel-wrapper');
    
    carouselWrappers.forEach(wrapper => {
        const track = wrapper.querySelector('.carousel-track');
        const items = wrapper.querySelectorAll('.carousel-item');
        const prevBtn = wrapper.parentElement.querySelector('.carousel-btn-prev');
        const nextBtn = wrapper.parentElement.querySelector('.carousel-btn-next');
        
        if (!track || items.length === 0) return;
        
        let currentIndex = 0;
        
        function updateCarousel() {
            const width = window.innerWidth;
            const isMobile = width <= 767;
            const isTablet = width >= 768 && width <= 1024;
            
            if (isMobile) {
                const itemWidth = wrapper.offsetWidth;
                track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
                if (prevBtn) prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
                if (nextBtn) nextBtn.style.display = currentIndex >= items.length - 1 ? 'none' : 'flex';
            } else if (isTablet) {
                const itemWidth = wrapper.offsetWidth / 2 + 10;
                const maxIndex = Math.max(0, items.length - 2);
                currentIndex = Math.min(currentIndex, maxIndex);
                track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
                if (prevBtn) prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
                if (nextBtn) nextBtn.style.display = currentIndex >= maxIndex ? 'none' : 'flex';
            } else {
                track.style.transform = '';
                if (prevBtn) prevBtn.style.display = '';
                if (nextBtn) nextBtn.style.display = '';
            }
        }
        
        // Обработчики кнопок
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const width = window.innerWidth;
                const isMobile = width <= 767;
                const isTablet = width >= 768 && width <= 1024;
                
                if (isMobile && currentIndex < items.length - 1) {
                    currentIndex++;
                    updateCarousel();
                } else if (isTablet) {
                    const maxIndex = Math.max(0, items.length - 2);
                    if (currentIndex < maxIndex) {
                        currentIndex++;
                        updateCarousel();
                    }
                }
            });
        }
        
        // Обработка изменения размера окна
        window.addEventListener('resize', updateCarousel);
        
        // Инициализация
        updateCarousel();
    });
});

// 3. Мобильное меню (упрощенная версия)
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDropdown = document.getElementById('mobileDropdown');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    if (mobileMenuBtn && mobileDropdown) {
        function toggleDropdown() {
            const isOpen = mobileDropdown.classList.contains('active');
            
            if (isOpen) {
                mobileDropdown.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                mobileDropdown.classList.add('active');
                mobileMenuBtn.classList.add('active');
                if (mobileMenuOverlay) mobileMenuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
        
        mobileMenuBtn.addEventListener('click', toggleDropdown);
        
        // Закрытие при клике на ссылки
        document.querySelectorAll('.mobile-dropdown-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileDropdown.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileDropdown.classList.contains('active')) {
                toggleDropdown();
            }
        });
    }
});

// 4. Telegram кнопка (упрощенная)
document.addEventListener('DOMContentLoaded', () => {
    const telegramBtn = document.querySelector('.telegram-float-btn');
    if (telegramBtn) {
        setTimeout(() => {
            telegramBtn.classList.add('visible');
        }, 1000);
    }
});

// 5. AOS инициализация
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
});

// 6. Плавная прокрутка
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// 7. Оптимизация изображений
document.addEventListener('DOMContentLoaded', () => {
    // Добавляем lazy loading
    document.querySelectorAll('img:not([loading])').forEach(img => {
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
    });
});

// 8. Определение touch устройства
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add('touch-device');
}

// 9. Базовые стили для оптимизации
const optimizedStyles = document.createElement('style');
optimizedStyles.textContent = `
    .touch-device .card:hover { transform: none !important; }
    .touch-device .about__item:hover,
    .touch-device .program-card:hover,
    .touch-device .special-card:hover { transform: none; }
    .nav__link.active { color: #ffffff; }
    .nav__link.active::after { width: 100%; }
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(optimizedStyles);

console.log('✨ Амадея сайт загружен успешно!');
