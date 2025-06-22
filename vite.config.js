// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // Requests to /api will be proxied
        target: import.meta.env.VITE_API_URL, // Your backend server
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '') // If your backend routes don't start with /api
      }
    }
  }
})
