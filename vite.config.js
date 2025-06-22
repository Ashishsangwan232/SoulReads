// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // Requests to /api will be proxied
        target: 'http://localhost:8080', // Your backend server
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '') // If your backend routes don't start with /api
      }
    }
  }
})
