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
    chunkSizeWarningLimit: 200, 
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        critical: resolve(__dirname, 'css/critical.css')
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
          if (id.includes('virtual-carousel') || id.includes('image-optimizer')) {
            return 'carousel-critical'
          }
          if (id.includes('scroll-performance')) {
            return 'scroll'
          }
          if (id.includes('app')) {
            return 'app'
          }
          if (id.includes('node_modules')) {
            if (id.includes('aos')) return 'aos'
            if (id.includes('vanilla-tilt')) return 'tilt'
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
        passes: 4, 
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
        typeofs: true,
        side_effects: false,
        inline: 2,
        keep_infinity: true,
        reduce_funcs: true,
        sequences: true,
        module: true,
        toplevel: true,
        global_defs: {
          DEBUG: false,
          VERSION: '"production"'
        }
      },
      mangle: {
        safari10: true,
        properties: {
          regex: /^_/
        },
        toplevel: true,
        reserved: []
      },
      format: {
        comments: true,
        ecma: 2015,
        preamble: '/* Optimized for performance */'
      }
    },
    reportCompressedSize: true,
    chunkSizeWarningLimit: 150
  },
  server: {
    port: 3000,
    open: true,
    cors: true,
    host: true,
    hmr: {
      overlay: false
    },
    headers: {
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff'
    }
  },
  preview: {
    port: 4173,
    open: true,
    host: true,
    headers: {
      'Cache-Control': 'public, max-age=31536000',
      'X-Content-Type-Options': 'nosniff'
    }
  },
  optimizeDeps: {
    include: ['aos', 'vanilla-tilt'],
    exclude: ['final-carousel', 'simple-carousel', 'optimized-carousel']
  },
  css: {
    devSourcemap: false,
    preprocessorOptions: {},
    modules: false,
    postcss: {
      plugins: []
    },
    lightningcss: {
      targets: {
        browsers: ['> 0.5%', 'last 2 versions', 'not dead']
      }
    }
  },
  assetsInclude: ['**/*.webp', '**/*.avif'],
  experimental: {
    renderBuiltUrl: (filename, { hostType }) => {
      if (hostType === 'js') {
        return { js: `new URL(${filename}, import.meta.url).href` }
      } else {
        return { relative: true }
      }
    }
  },
  define: {
    __VUE_OPTIONS_API__: false,
    __VUE_PROD_DEVTOOLS__: false
  }
})