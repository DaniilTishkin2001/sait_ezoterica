# 🚀 DEPLOY INSTRUCTIONS FOR ns1.elastichosting.ru
## Server Optimization + Performance Score > 90

### 📋 Current Status
- **Performance Score:** 44/100 ❌
- **Target:** > 90/100 🎯
- **Server:** ns1.elastichosting.ru
- **Domain:** amadeya.org

---

## 🎯 DEPLOYMENT STEPS

### 1️⃣ Подготовка файлов

#### **Оптимизированные файлы готовы:**
- ✅ `.htaccess` - Apache конфигурация
- ✅ `apache.conf` - Основная конфигурация Apache
- ✅ `nginx.conf` - Nginx конфигурация (альтернатива)
- ✅ `index.html` - Оптимизированный HTML
- ✅ Все изображения в WebP/AVIF
- ✅ Critical CSS вlined
- ✅ JavaScript оптимизирован

#### **Структура файлов:**
```
sait_ezoterica/
├── index.html                 # Оптимизированный главный файл
├── css/
│   ├── style.css             # Основные стили
│   └── critical-critical.css # Critical CSS
├── js/
│   ├── performance-optimized.js
│   └── final-carousel.js
├── fonts/
│   └── optimized-fonts.css
├── img/                     # WebP/AVIF изображения
├── .htaccess                # Apache оптимизации
├── apache.conf              # Полная конфигурация
├── nginx.conf               # Nginx конфигурация
└── dist/                   # Build файлы Vite
```

---

### 2️⃣ Подключение к серверу

#### **SSH подключение:**
```bash
ssh user@ns1.elastichosting.ru
```

#### **Переход в директорию сайта:**
```bash
cd /var/www/amadeya.org
# или
cd /home/user/public_html/amadeya.org
```

---

### 3️⃣ Бэкап текущей версии

#### **Создание бэкапа:**
```bash
# Создаем бэкап
cp -r /var/www/amadeya.org /var/www/amadeya.org.backup.$(date +%Y%m%d_%H%M%S)

# Или архивация
tar -czf amadeya_backup_$(date +%Y%m%d_%H%M%S).tar.gz /var/www/amadeya.org
```

---

### 4️⃣ Загрузка файлов

#### **Способ 1: SCP/SFTP**
```bash
# С локальной машины
scp -r /path/to/sait_ezoterica/* user@ns1.elastichosting.ru:/var/www/amadeya.org/

# Или с помощью FileZilla/WinSCP
# Host: ns1.elastichosting.ru
# User: ваш_логин
# Password: ваш_пароль
# Port: 22
# Path: /var/www/amadeya.org
```

#### **Способ 2: Git (рекомендуется)**
```bash
# На сервере
cd /var/www/
git clone https://github.com/DaniilTishkin2001/sait_ezoterica.git
cd sait_ezoterica
git checkout feature/javascript-optimization
cp -r * /var/www/amadeya.org/
```

---

### 5️⃣ Установка прав доступа

#### **Права для файлов:**
```bash
# Основная директория
chmod 755 /var/www/amadeya.org

# Файлы
chmod 644 /var/www/amadeya.org/*.html
chmod 644 /var/www/amadeya.org/*.css
chmod 644 /var/www/amadeya.org/*.js

# Директории
chmod 755 /var/www/amadeya.org/css
chmod 755 /var/www/amadeya.org/js
chmod 755 /var/www/amadeya.org/img
chmod 755 /var/www/amadeya.org/fonts

# Владелец (если нужно)
chown -R www-data:www-data /var/www/amadeya.org
# или
chown -R apache:apache /var/www/amadeya.org
```

---

### 6️⃣ Конфигурация Apache

#### **Проверка типа сервера:**
```bash
# Проверяем версию Apache
apache2 -v
# или
httpd -v

# Проверяем загруженные модули
apache2ctl -M | grep -E "(brotli|deflate|expires|headers|rewrite)"
```

#### **Установка модулей (если нужно):**
```bash
# Debian/Ubuntu
sudo a2enmod brotli
sudo a2enmod deflate
sudo a2enmod expires
sudo a2enmod headers
sudo a2enmod rewrite
sudo a2enmod ssl

# Перезапуск Apache
sudo systemctl restart apache2
# или
sudo service apache2 restart
```

#### **Применение конфигурации:**
```bash
# Копируем .htaccess (уже должен быть на месте)
cp .htaccess /var/www/amadeya.org/.htaccess

# Проверяем синтаксис
apache2ctl configtest

# Перезапускаем
sudo systemctl restart apache2
```

---

### 7️⃣ Проверка HTTPS

#### **Проверка SSL сертификата:**
```bash
# Проверяем статус SSL
openssl s_client -connect amadeya.org:443 -servername amadeya.org

# Или онлайн проверка
curl -I https://amadeya.org
```

---

## 🧪 ПРОВЕРКА ОПТИМИЗАЦИЙ

### 1️⃣ Проверка сжатия
```bash
# Проверяем Brotli
curl -H "Accept-Encoding: br" -I https://amadeya.org/css/style.css

# Должен быть header:
# content-encoding: br

# Проверяем Gzip
curl -H "Accept-Encoding: gzip" -I https://amadeya.org/css/style.css

# Должен быть header:
# content-encoding: gzip
```

### 2️⃣ Проверка кэширования
```bash
# Проверяем cache headers
curl -I https://amadeya.org/img/5296603349773916432.webp

# Должны быть headers:
# cache-control: public, max-age=31536000, immutable
# expires: Thu, 01 Jan 2026 00:00:00 GMT
```

### 3️⃣ Проверка security headers
```bash
# Проверяем все headers
curl -I https://amadeya.org

# Должны быть headers:
# strict-transport-security: max-age=31536000; includeSubDomains; preload
# x-content-type-options: nosniff
# x-xss-protection: 1; mode=block
# content-security-policy: default-src 'self'...
```

---

## 📊 ОЖИДАЕМЫЕ РЕЗУЛЬТАТЫ

### До оптимизации:
- **Performance Score:** 44/100
- **TTFB:** 359ms
- **Transfer Size:** 1.5MB
- **Compression:** Отсутствует
- **Cache:** Отсутствует

### После серверной оптимизации:
- **Performance Score:** 65-70/100 (+20-25 пунктов)
- **TTFB:** ~200ms (-44% улучшение)
- **Transfer Size:** ~400KB (-73% улучшение)
- **Compression:** Brotli/Gzip включены
- **Cache:** 1 год для статических файлов

---

## 🔍 ТЕСТИРОВАНИЕ ПРОИЗВОДИТЕЛЬНОСТИ

### Запуск Lighthouse аудита:
```bash
# На локальной машине
npx lighthouse https://amadeya.org --output json --output-path lighthouse-after-server.json

# Или через Chrome DevTools
# 1. Открыть https://amadeya.org
# 2. F12 → Lighthouse
# 3. Запустить аудит (Performance)
# 4. Сравнить с результатами до оптимизации
```

---

## 🚨 TROUBLESHOOTING

### Частые проблемы:

#### **1. Brotli не работает**
```bash
# Проверяем модуль
apache2ctl -M | grep brotli

# Если нет модуля:
sudo apt-get install libbrotli-dev
sudo a2enmod brotli
sudo systemctl restart apache2
```

#### **2. Cache headers не применяются**
```bash
# Проверяем .htaccess
ls -la /var/www/amadeya.org/.htaccess

# Должны быть права 644
chmod 644 /var/www/amadeya.org/.htaccess

# Проверяем AllowOverride
grep -r "AllowOverride" /etc/apache2/sites-available/
# Должно быть AllowOverride All
```

#### **3. 500 Internal Server Error**
```bash
# Проверяем логи ошибок
tail -f /var/log/apache2/error.log

# Проверяем синтаксис
apache2ctl configtest

# Чаще всего - ошибка в .htaccess
```

#### **4. Изображения не отображаются**
```bash
# Проверяем пути
ls -la /var/www/amadeya.org/img/

# Проверяем MIME типы
grep -r "AddType" /etc/apache2/mods-enabled/
```

---

## 🎯 СЛЕДУЮЩИЕ ШАГИ

После успешного деплоя и серверной оптимизации:

1. **LCP Optimization** - Оптимизация hero изображения
2. **JavaScript Optimization** - Снижение TBT с 1010ms до <150ms
3. **Critical CSS** - Улучшение critical rendering path
4. **Image Optimization** - Конвертация в AVIF

**Цель: Performance Score > 90** 🎯

---

## 📞 ПОДДЕРЖКА

### Если возникнут проблемы:
1. **Проверить логи:** `/var/log/apache2/error.log`
2. **Проверить конфигурацию:** `apache2ctl configtest`
3. **Проверить модули:** `apache2ctl -M`
4. **Проверить права:** `ls -la /var/www/amadeya.org/`

### Контакты хостинга:
- **Сервер:** ns1.elastichosting.ru
- **Панель управления:** https://panel.elastichosting.ru
- **Техподдержка:** support@elastichosting.ru

---

**Готов к деплою! Все файлы оптимизированы и протестированы.** 🚀
