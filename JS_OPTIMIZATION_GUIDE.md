# ⚡ JAVASCRIPT OPTIMIZATION GUIDE
## TBT < 150ms Target

### 📊 Current Status
- **TBT:** 1010ms (слишком высокий!)
- **Target:** < 150ms
- **Проблема:** JavaScript блокирует главный поток

---

## 🎯 ОПТИМИЗАЦИЯ JAVASCRIPT

### Шаг 1: Удалить неиспользуемый JavaScript
```html
<!-- Удалите из index.html ненужные скрипты: -->
<!-- ❌ Удалить если не используется: -->
<script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.0/vanilla-tilt.min.js"></script>

<!-- ✅ Оставить только необходимые: -->
<script src="js/performance-optimized.js" defer></script>
```

### Шаг 2: Оптимизировать загрузку аналитики
```html
<!-- ❌ Плохо - блокирует рендеринг -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-DR16JPE3BX"></script>

<!-- ✅ Хорошо - отложенная загрузка -->
<script>
  // Загрузить аналитику после page load
  window.addEventListener('load', function() {
    setTimeout(function() {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-DR16JPE3BX';
      document.head.appendChild(script);
    }, 2000); // 2 секунды задержки
  });
</script>
```

### Шаг 3: Оптимизировать event listeners
```javascript
// В performance-optimized.js добавьте passive listeners:

// ❌ Плохо - блокирует скролл
document.addEventListener('scroll', handleScroll);

// ✅ Хорошо - не блокирует скролл
document.addEventListener('scroll', handleScroll, { passive: true });

// ❌ Плохо - блокирует touch
document.addEventListener('touchstart', handleTouch);

// ✅ Хорошо - не блокирует touch
document.addEventListener('touchstart', handleTouch, { passive: true });
```

### Шаг 4: Разделить JavaScript на части
```javascript
// Создайте отдельные файлы:

// core.js - только критичный функционал
// analytics.js - аналитика (загружается позже)
// interactive.js - интерактивные элементы (загружается по мере необходимости)
```

---

## 📈 ОЖИДАЕМЫЕ РЕЗУЛЬТАТЫ

### До оптимизации:
- **TBT:** 1010ms
- **JavaScript blocking:** ~800ms
- **Time to Interactive:** ~9s

### После оптимизации:
- **TBT:** ~120ms (-88% улучшение)
- **JavaScript blocking:** ~50ms
- **Time to Interactive:** ~3s

---

## 🎯 КОНКРЕТНЫЕ ДЕЙСТВИЯ

### 1. Обновите index.html:
```html
<!-- Замените все скрипты на оптимизированные версии -->
<script src="js/core.js" defer></script>
<script src="js/analytics.js" defer></script>
```

### 2. Создайте core.js:
```javascript
// Только критичный функционал для первого рендера
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu, basic interactions
  // Без тяжелых библиотек
});
```

### 3. Отложите аналитику:
```javascript
// Загружать только после полной загрузки страницы
window.addEventListener('load', function() {
  // Загрузка Yandex Metrika и Google Analytics
});
```

### 4. Оптимизируйте event listeners:
```javascript
// Добавьте { passive: true } ко всем scroll/touch событиям
```

---

## 🔧 ДЕТАЛЬНЫЕ ИЗМЕНЕНИЯ

### Замените в index.html:
```html
<!-- ❌ Удалить эти строки: -->
<script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.0/vanilla-tilt.min.js"></script>
<script src="https://mc.yandex.ru/metrika/tag.js" async></script>

<!-- ✅ Добавить эти строки: -->
<script src="js/core.js" defer></script>
<script>
  // Отложенная загрузка аналитики
  window.addEventListener('load', function() {
    setTimeout(function() {
      // Yandex Metrika
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      
      // Google Analytics
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-DR16JPE3BX';
      document.head.appendChild(script);
    }, 2000);
  });
</script>
```

---

## 🎯 РЕЗУЛЬТАТ

После всех оптимизаций JavaScript:
- **TBT:** 1010ms → ~120ms
- **Performance Score:** +20-25 пунктов
- **User Experience:** Мгновенный отклик
- **Mobile Performance:** Значительно лучше
