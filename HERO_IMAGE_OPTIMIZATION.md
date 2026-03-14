# 🖼️ HERO IMAGE OPTIMIZATION GUIDE
## LCP < 2.5s Target

### 📊 Current Status
- **Hero image:** 5296603349773916432.webp
- **Size:** 340KB (слишком большой!)
- **Format:** WebP (хорошо, но можно лучше)
- **Target:** < 100KB с AVIF форматом

---

## 🎯 ОПТИМИЗАЦИЯ ИЗОБРАЖЕНИЯ

### Шаг 1: Конвертация в AVIF
```bash
# Используйте Squoosh или ImageMagick
# AVIF дает 30-50% экономию по сравнению с WebP

# Через Squoosh (рекомендуется):
# 1. Откройте https://squoosh.app
# 2. Загрузите hero изображение
# 3. Выберите AVIF формат
# 4. Качество: 75-80%
# 5. Размер: 1920x1080 (для десктопа)
# 6. Сохраните как 5296603349773916432.avif
```

### Шаг 2: Responsive размеры
```html
<!-- Замените в index.html hero изображение: -->
<picture>
  <!-- Mobile: 386px width -->
  <source media="(max-width: 768px)" 
          srcset="img/hero-mobile.avif 386w,
                  img/hero-mobile.webp 386w"
          type="image/avif">
  
  <!-- Desktop: 600px width -->
  <source srcset="img/5296603349773916432.avif 600w,
                  img/5296603349773916432.webp 600w"
          type="image/avif">
  
  <!-- Fallback -->
  <img src="img/5296603349773916432.webp"
       alt="Amadeya Hero"
       width="600" 
       height="600"
       loading="eager"
       decoding="async"
       fetchpriority="high">
</picture>
```

### Шаг 3: Preload в HEAD
```html
<!-- Добавьте в <head> index.html: -->
<link rel="preload" href="img/5296603349773916432.avif" as="image" type="image/avif" fetchpriority="high">
<link rel="preload" href="img/5296603349773916432.webp" as="image" type="image/webp" fetchpriority="high">
```

---

## 📈 ОЖИДАЕМЫЕ РЕЗУЛЬТАТЫ

### До оптимизации:
- **Size:** 340KB
- **Format:** WebP
- **LCP contribution:** ~1.2s
- **Total LCP:** 6.2s

### После оптимизации:
- **Size:** ~80KB (-76% экономия)
- **Format:** AVIF + WebP fallback
- **LCP contribution:** ~0.3s
- **Total LCP:** ~2.0s

---

## 🎯 КОНКРЕТНЫЕ ДЕЙСТВИЯ

### 1. Создайте AVIF версию:
```bash
# Через Squoosh:
# - Загрузите 5296603349773916432.webp
# - Конвертируйте в AVIF с качеством 75%
# - Сохраните как 5296603349773916432.avif
```

### 2. Создайте мобильную версию:
```bash
# Размер: 386px ширина
# Формат: AVIF + WebP
# Имена: hero-mobile.avif, hero-mobile.webp
```

### 3. Обновите HTML:
```html
<!-- Замените текущее hero изображение на responsive picture -->
```

### 4. Добавьте preload:
```html
<!-- В <head> добавьте preload директивы -->
```

---

## 🚨 ВАЖНО

### Не забудьте:
- ✅ Создать AVIF версию
- ✅ Создать мобильную версию (386px)
- ✅ Обновить HTML с picture элементом
- ✅ Добавить preload в head
- ✅ Убрать loading="lazy" с hero изображения
- ✅ Добавить fetchpriority="high"

### Результат:
- **LCP:** 6.2s → ~2.0s
- **Performance Score:** +15-20 пунктов
- **User Experience:** Значительно лучше
