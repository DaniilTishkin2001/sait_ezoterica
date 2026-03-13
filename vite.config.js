import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.', // Указываем корневую директорию
  base: '/', // Базовый путь для развертывания
  build: {
    outDir: 'dist', // Директория для сборки
    assetsDir: 'assets', // Директория для статических ресурсов
    sourcemap: true, // Генерация sourcemap
    minify: 'terser', // Используем terser для минификации
    target: 'es2015',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js'
      }
    }
  },
  server: {
    port: 3000, // Порт для разработки
    open: true, // Автоматически открывать браузер
    cors: true, // Включаем CORS
    host: true
  },
  preview: {
    port: 4173, // Порт для предпросмотра
    open: true,
    host: true
  }
})