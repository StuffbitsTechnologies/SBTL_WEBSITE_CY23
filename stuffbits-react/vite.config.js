import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('react-markdown') || id.includes('remark-gfm') || id.includes('prism-react-renderer')) {
            return 'markdown'
          }
          if (id.includes('@react-three/') || id.includes('/three/')) return 'three'
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('lucide-react')) return 'icons'
          if (id.includes('react-router-dom') || id.includes('/react-dom/') || id.includes('/react/')) {
            return 'react'
          }
          return undefined
        },
      },
    },
  },
})
