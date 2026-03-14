# 🖼️ ОБНОВЛЕНИЕ HERO ИЗОБРАЖЕНИЯ В HTML

## 📍 ГДЕ НАЙТИ HERO ИЗОБРАЖЕНИЕ:

### **В index.html найдите секцию hero (примерно строки 300-400):**
```html
<section class="hero">
    <div class="hero__content">
        <h1 class="hero__title">Амадея</h1>
        <p class="hero__subtitle">Ваш проводник в мир эзотерики</p>
        <!-- ВОТ ЗДЕСЬ НАХОДИТСЯ ИЗОБРАЖЕНИЕ -->
    </div>
</section>
```

### **Ищите img тег с hero изображением:**
```html
<img src="img/5296603349773916432.webp" 
     alt="Amadeya Hero" 
     class="hero__image">
```

---

## 🔄 ЗАМЕНИТЕ НА RESPONSIVE PICTURE:

### **Найдите и замените текущее img на:**
```html
<picture>
  <!-- Mobile: 386px width, AVIF优先 -->
  <source media="(max-width: 768px)" 
          srcset="img/hero-mobile.avif 386w,
                  img/hero-mobile.webp 386w"
          type="image/avif">
  
  <!-- Desktop: 600px width, AVIF优先 -->
  <source srcset="img/5296603349773916432.avif 600w,
                  img/5296603349773916432.webp 600w"
          type="image/avif">
  
  <!-- Fallback для старых браузеров -->
  <img src="img/5296603349773916432.webp"
       alt="Amadeya — эзотерический портал"
       width="600" 
       height="600"
       loading="eager"
       decoding="async"
       fetchpriority="high"
       class="hero__image">
</picture>
```

---

## 🎯 КЛЮЧЕВЫЕ АТРИБУТЫ:

### **width и height:**
```html
width="600" height="600"  <!-- Предотвращает CLS -->
```

### **loading="eager":**
```html
loading="eager"  <!-- Hero изображение грузится немедленно -->
```

### **fetchpriority="high":**
```html
fetchpriority="high"  <!-- Высший приоритет загрузки -->
```

### **decoding="async":**
```html
decoding="async"  <!-- Асинхронная декодировка -->
```

---

## 📱 МОБИЛЬНАЯ ОПТИМИЗАЦИЯ:

### **Media query для мобильных:**
```css
@media (max-width: 768px) {
  .hero__image {
    width: 386px;
    height: 386px;
    object-fit: cover;
  }
}
```

---

## ✅ ПРОВЕРКА РЕЗУЛЬТАТА:

### **После обновления проверьте:**
1. **Откройте сайт на десктопе** - должен загрузиться AVIF
2. **Откройте на мобильном** - должен загрузиться hero-mobile.avif
3. **F12 → Network** - проверьте размеры файлов
4. **Lighthouse аудит** - LCP должен улучшиться

### **Ожидаемые размеры:**
- Desktop AVIF: ~80KB (было 340KB)
- Mobile AVIF: ~25KB
- WebP fallback: ~120KB

---

## 🚀 РЕЗУЛЬТАТ:

### **После оптимизации:**
- **LCP:** 6.2s → ~2.0s
- **Performance Score:** +15-20 пунктов
- **User Experience:** Значительно быстрее загрузка

**Hero изображение больше не будет бутылочным горлышком!** 🎯
