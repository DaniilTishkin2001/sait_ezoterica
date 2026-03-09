# ИНСТРУКЦИЯ: Настройка Яндекс Метрики

## Шаг 1: Создание счетчика Яндекс Метрики
1. Перейдите на https://metrika.yandex.ru
2. Войдите через Яндекс ID
3. Нажмите "Добавить счетчик"
4. Заполните данные:
   - Имя счетчика: Амадея - Обучение Таро
   - Адрес сайта: https://amadeya-taro.ru
   - Часовой пояс: Ваш часовой пояс
   - Валюта: RUB

## Шаг 2: Получение ID счетчика
1. После создания вы получите ID вида: XXXXXXXX
2. Скопируйте этот ID

## Шаг 3: Замена ID в коде сайта
Откройте файл js/main.js и замените:
```javascript
ym(XXXXXXX, "init", {
```
на:
```javascript
ym(YOUR_REAL_ID, "init", {
```

## Шаг 4: Настройка целей (Важные цели для бизнеса)
1. В Яндекс Метрике → Цели → Добавить цель
2. Создайте JavaScript-события:

### Цель 1: "Нажатие на кнопку Начать"
- Тип: JavaScript-событие
- Идентификатор: cta_start_button
- Условие: `event === "cta_start"`

### Цель 2: "Просмотр программ"
- Тип: Просмотр страницы
- URL: содержит `/#programs`

### Цель 3: "Просмотр контактов"
- Тип: Просмотр страницы  
- URL: содержит `/#contact`

## Шаг 5: Добавление отслеживания событий
Добавьте в js/main.js:
```javascript
// Отслеживание кликов на CTA кнопки
document.querySelector('.btn--primary').addEventListener('click', function() {
    ym(YOUR_REAL_ID, 'reachGoal', 'cta_start_button');
});

// Отслеживание прокрутки до важных секций
const observerOptions = {
    threshold: 0.5
};

const sectionsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId === 'programs') {
                ym(YOUR_REAL_ID, 'reachGoal', 'view_programs');
            } else if (sectionId === 'contact') {
                ym(YOUR_REAL_ID, 'reachGoal', 'view_contact');
            }
        }
    });
}, observerOptions);

// Наблюдаем за секциями
document.querySelectorAll('#programs, #contact').forEach(section => {
    sectionsObserver.observe(section);
});
```

## Шаг 6: Настройка Вебвизора
1. В настройках счетчика → Вебвизор
2. Включите:
   - Анализ форм
   - Внешние ссылки
   - Прокрутка
   - Анализ кликов на ссылках
   - Запись действий посетителей

## Шаг 7: Проверка работы
1. Откройте сайт
2. Выполните тестовые действия
3. Через 15-30 минут проверьте отчеты в Метрике
