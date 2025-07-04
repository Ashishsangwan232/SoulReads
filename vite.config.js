// frontend/vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL, // ✅ Loaded correctly via loadEnv
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, '') // optional
        }
      }
    }
  });
}
