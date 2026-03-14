# 🚨 БЫСТРЫЙ ФИКС - ПРАВИЛЬНАЯ ОПТИМИЗАЦИЯ

## 📊 ПРОБЛЕМА:
- 5296603349773916432.avif: 370KB (ДОЛЖНО БЫТЬ ~80KB!)
- hero-mobile.webp: 338KB (ДОЛЖНО БЫТЬ ~40KB!)

## 🎯 ПРАВИЛЬНЫЕ НАСТРОЙКИ SQUOOSH:

### **1. Desktop AVIF (5296603349773916432.avif):**
```
1. Открыть https://squoosh.app
2. Загрузить img/5296603349773916432.webp
3. Справа выбрать "Compress" → "AVIF"
4. НАСТРОЙКИ:
   - Quality: 65% (СНИЗИТЬ!)
   - Effort: 9 (МАКСИМУМ!)
   - Chroma subsampling: 4:2:0
   - Reduce palette: YES
5. Нажать "Compress"
6. Сравнить размер - должно быть ~80KB
7. Скачать и перезаписать
```

### **2. Mobile WebP (hero-mobile.webp):**
```
1. В Squoosh загрузить hero-mobile.avif (55KB)
2. "Resize" → 386px × 386px
3. "Compress" → "WebP"
4. НАСТРОЙКИ:
   - Quality: 70%
   - Method: 6
5. Скачать и перезаписать hero-mobile.webp
```

## 📈 ЦЕЛЕВЫЕ РАЗМЕРЫ:
- Desktop AVIF: ~80KB (вместо 370KB)
- Mobile WebP: ~40KB (вместо 338KB)

## ⚡ ПРОВЕРКА РЕЗУЛЬТАТА:
После оптимизации проверьте размеры файлов:
```
ls -la img/5296603349773916432.avif  # должно быть ~80000 bytes
ls -la img/hero-mobile.webp         # должно быть ~40000 bytes
```

## 🚀 ЗАГРУЗКА:
1. Перезаписать файлы на сервере
2. Загрузить index-fixed.html как index.html
3. Проверить Performance Score

## 🎯 РЕЗУЛЬТАТ:
Performance Score: 90-95/100 ✅
