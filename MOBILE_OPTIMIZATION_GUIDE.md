# 📱 MOBILE OPTIMIZATION GUIDE
## Mobile Performance Score > 90

### 📊 Current Mobile Issues
- **Mobile Performance:** ~35/100
- **Touch interactions:** Не оптимизированы
- **Mobile images:** Слишком большие
- **Mobile JavaScript:** Тяжелый

---

## 🎯 МОБИЛЬНАЯ ОПТИМИЗАЦИЯ

### Шаг 1: Оптимизировать изображения для мобильных
```html
<!-- Добавьте responsive изображения: -->
<picture>
  <!-- Mobile: 386px, AVIF -->
  <source media="(max-width: 768px)" 
          srcset="img/hero-mobile.avif 386w,
                  img/hero-mobile.webp 386w,
                  img/hero-mobile.jpg 386w"
          type="image/avif">
  
  <!-- Desktop: 600px -->
  <source srcset="img/5296603349773916432.avif 600w,
                  img/5296603349773916432.webp 600w,
                  img/5296603349773916432.jpg 600w"
          type="image/avif">
  
  <img src="img/5296603349773916432.webp"
       alt="Amadeya Hero"
       width="600" height="600"
       loading="eager"
       decoding="async"
       fetchpriority="high">
</picture>
```

### Шаг 2: Оптимизировать мобильный JavaScript
```javascript
// Условная загрузка для мобильных:
const isMobile = window.innerWidth <= 768;

if (!isMobile) {
  // Загружать только на десктопе
  loadVanillaTilt();
  loadAOS();
}

// Оптимизированные touch события:
document.addEventListener('touchstart', handleTouch, { passive: true });
document.addEventListener('touchmove', handleTouchMove, { passive: true });
```

### Шаг 3: Мобильная карусель
```css
/* Оптимизация карусели для мобильных */
@media (max-width: 768px) {
  .carousel-wrapper {
    max-width: 320px;
    margin: 0 auto;
    overflow: hidden;
  }
  
  .carousel-item {
    flex: 0 0 320px !important;
    max-width: 320px;
  }
  
  .carousel-track {
    justify-content: center;
    gap: 10px;
  }
  
  .carousel-btn {
    width: 44px;
    height: 44px;
  }
}
```

### Шаг 4: Touch-friendly интерфейс
```css
/* Минимальные размеры для touch: */
.btn, .nav__link, .mobile-menu-btn {
  min-height: 44px;
  min-width: 44px;
  padding: 12px;
}

/* Увеличенные touch targets: */
.carousel-btn {
  width: 50px;
  height: 50px;
}

.mobile-menu-btn {
  font-size: 24px;
  padding: 10px;
}
```

---

## 📈 ОЖИДАЕМЫЕ РЕЗУЛЬТАТЫ

### До оптимизации:
- **Mobile Performance:** ~35/100
- **Mobile LCP:** ~8s
- **Touch response:** Медленный
- **Mobile images:** Не оптимизированы

### После оптимизации:
- **Mobile Performance:** ~75/100
- **Mobile LCP:** ~2.5s
- **Touch response:** Мгновенный
- **Mobile images:** Оптимизированы

---

## 🎯 КОНКРЕТНЫЕ ДЕЙСТВИЯ

### 1. Создайте мобильные версии изображений:
```bash
# hero-mobile.avif - 386px ширина, качество 75%
# hero-mobile.webp - 386px ширина, качество 80%
# Все остальные изображения также создать в мобильных версиях
```

### 2. Обновите HTML с picture элементами:
```html
<!-- Замените все img на responsive picture -->
<picture>
  <source media="(max-width: 768px)" srcset="img/mobile-version.avif">
  <source srcset="img/desktop-version.avif">
  <img src="img/fallback.webp">
</picture>
```

### 3. Оптимизируйте JavaScript для мобильных:
```javascript
// В performance-optimized.js:
const isMobile = window.innerWidth <= 768;

// Загружать тяжелые библиотеки только на десктопе
if (!isMobile) {
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.0/vanilla-tilt.min.js');
  loadScript('https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js');
}

// Оптимизировать мобильные события
if (isMobile) {
  // Touch оптимизации
  document.addEventListener('touchstart', function(e) {
    // Предотвратить default только если нужно
  }, { passive: true });
}
```

### 4. Добавьте мобильные CSS оптимизации:
```css
/* В style.css добавьте: */
@media (max-width: 768px) {
  /* Уменьшить анимации на мобильных */
  * {
    animation-duration: 0.1s !important;
    transition-duration: 0.1s !important;
  }
  
  /* Оптимизировать шрифты */
  body {
    font-size: 16px;
    line-height: 1.4;
  }
  
  /* Увеличить touch targets */
  .btn, .nav__link {
    min-height: 44px;
    min-width: 44px;
    padding: 12px 16px;
  }
}
```

---

## 🎯 МОБИЛЬНЫЕ ТЕСТЫ

### Проверьте в Chrome DevTools:
1. **F12 → Toggle device toolbar**
2. **Выберите мобильное устройство**
3. **Network → Slow 3G**
4. **Lighthouse → Mobile**

### Ключевые метрики для мобильных:
- **LCP < 2.5s**
- **FID < 100ms**
- **CLS < 0.1**
- **Performance Score > 90**

---

## 🎯 РЕЗУЛЬТАТ

После мобильной оптимизации:
- **Mobile Performance:** 35 → 75/100
- **Mobile LCP:** 8s → 2.5s
- **Touch Experience:** Значительно лучше
- **Overall Score:** +15-20 пунктов
