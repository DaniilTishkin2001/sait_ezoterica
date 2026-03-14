// PurgeCSS Configuration - Удаление неиспользуемого CSS
const { globSync } = require('glob');

module.exports = {
  // Файлы для анализа
  content: [
    './dist/index.html',
    './index.html',
    './js/*.js'
  ],
  
  // CSS файлы для очистки
  css: [
    './css/style.css'
  ],
  
  // Настройки
  defaultExtractor: content => {
    // Извлекаем все классы из HTML и JS
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
    return broadMatches.concat(innerMatches);
  },
  
  // Сохраняем важные классы
  safelist: [
    // Критичные классы для JS
    'loaded',
    'active',
    'visible',
    'touch-device',
    
    // Состояния
    'hover',
    'focus',
    'active',
    'disabled',
    
    // Анимации
    'fade-up',
    'fade-down',
    'fade-left',
    'fade-right',
    
    // Media queries
    '@media',
    '@supports',
    
    // Псевдо-элементы
    '::before',
    '::after',
    ':first-child',
    ':last-child',
    ':nth-child',
    
    // Динамические классы
    /aos-*/,
    /carousel-*/,
    /mobile-*/,
    /nav-*/,
    
    // Bootstrap-like утилиты
    /d-*/,
    /text-*/,
    /bg-*/,
    /p-*/,
    /m-*/,
    /w-*/,
    /h-*/
  ],
  
  // Настройки производительности
  variables: true,
  keyframes: true,
  fontFace: true,
  
  // Вывод
  output: './css/style-purged.css',
  
  // Статистика
  rejected: true,
  rejectedCss: true
};
