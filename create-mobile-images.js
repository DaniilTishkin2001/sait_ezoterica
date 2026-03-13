// Скрипт для создания оптимизированных мобильных изображений
// Это нужно запустить локально для генерации мобильных версий

const fs = require('fs');
const path = require('path');

// Мобильные размеры для каждого изображения
const mobileSizes = {
    '5296603349773916432.webp': { width: 386, height: 386 },  // Hero image
    '5296603349773916843.webp': { width: 370, height: 370 },  // Spiritual transformation
    '5296603349773916438.webp': { width: 386, height: 386 },  // Energy connection
    '5296603349773916837.webp': { width: 370, height: 371 },  // Financial abundance
    '5296603349773916415.webp': { width: 386, height: 386 },  // Intuitive development
    '5298855149587602076.webp': { width: 370, height: 370 },  // Release blocks
    '5296603349773916465.webp': { width: 308, height: 224 },  // Tree of Sephiroth
    '5296603349773916730.webp': { width: 308, height: 308 },  // Chakra
    '5296603349773916758.webp': { width: 308, height: 231 },  // Assembly point
    '5359580824602349141.webp': { width: 308, height: 375 },  // Energy cocoon
    '5296603349773916868.webp': { width: 308, height: 407 },  // 4 castes
    '5296603349773916388.webp': { width: 60, height: 60 }     // Logo
};

console.log('Для создания мобильных изображений используйте:');
console.log('1. ImageMagick или Sharp для ресайза');
console.log('2. WebP конвертер с качеством 80%');
console.log('3. Создайте папку img/mobile/');

// Пример команд для ImageMagick:
const commands = Object.entries(mobileSizes).map(([file, size]) => {
    return `magick img/${file} -resize ${size.width}x${size.height} -quality 80 img/mobile/${file.replace('.webp', '-mobile.webp')}`;
});

console.log('\nПримеры команд:');
commands.slice(0, 3).forEach(cmd => console.log(cmd));
console.log('... и так далее для всех изображений');
