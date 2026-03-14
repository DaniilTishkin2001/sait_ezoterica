# 🚨 СРОЧНАЯ ОПТИМИЗАЦИЯ AVIF

## 📊 ПРОБЛЕМА:
- ✅ hero-mobile.avif: 55KB (ОТЛИЧНО!)
- ❌ 5296603349773916432.avif: 370KB (СЛИШКОМ БОЛЬШОЙ!)
- ❌ hero-mobile.webp: 338KB (СЛИШКОМ БОЛЬШОЙ!)

## 🎯 НУЖНО СДЕЛАТЬ:

### **1. Оптимизировать desktop AVIF:**
```
1. Открыть https://squoosh.app
2. Загрузить img/5296603349773916432.webp
3. Выбрать формат AVIF
4. Настройки:
   - Quality: 70% (уменьшить с 75%)
   - Effort: 6 (увеличить)
   - Chroma subsampling: 4:2:0 (уменьшить цветность)
5. Сохранить как: img/5296603349773916432.avif (перезаписать)
```

### **2. Оптимизировать mobile WebP:**
```
1. В Squoosh с hero-mobile.avif
2. Resize: 386px x 386px
3. Формат WebP
4. Quality: 75%
5. Сохранить как: img/hero-mobile.webp (перезаписать)
```

## 📈 ЦЕЛЕВЫЕ РАЗМЕРЫ:
- 5296603349773916432.avif: ~80KB (вместо 370KB)
- hero-mobile.webp: ~40KB (вместо 338KB)

## 🚀 ПОСЛЕ ОПТИМИЗАЦИИ:
1. Загрузить файлы на сервер
2. Загрузить index-fixed.html как index.html
3. Проверить Performance Score

## 🎯 ОЖИДАЕМЫЙ РЕЗУЛЬТАТ:
- Performance Score: 90-95/100
- LCP: ~1.8s
- TBT: ~120ms
