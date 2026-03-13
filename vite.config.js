import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    target: 'es2015',
    chunkSizeWarningLimit: 500, 
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/.test(assetInfo.name)) {
            return `media/[name].[hash][extname]`
          }
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
            return `images/[name].[hash][extname]`
          }
          return `assets/[name].[hash][extname]`
        },
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js',
        compact: true,
        generatedCode: {
          constStatements: true
        },
        manualChunks: (id) => {
          if (id.includes('carousel') || id.includes('scroll')) {
            return 'carousel'
          }
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      },
      treeshake: 'smallest',
      external: []
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2,
        dead_code: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        if_return: true,
        join_vars: true,
        collapse_vars: true,
        reduce_vars: true,
        switches: true,
        typeofs: true
      },
      mangle: {
        safari10: true,
        properties: {
          regex: /^_/
        }
      },
      format: {
        comments: false
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    cors: true,
    host: true,
    hmr: {
      overlay: false
    }
  },
  preview: {
    port: 4173,
    open: true,
    host: true
  },
  optimizeDeps: {
    include: ['aos', 'vanilla-tilt'],
    exclude: []
  },
  css: {
    devSourcemap: false,
    preprocessorOptions: {},
    modules: false,
    postcss: {
      plugins: [
      ]
    }
  },
  assetsInclude: ['**/*.webp', '**/*.avif']
})