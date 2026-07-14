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
    },
    build: {
      rollupOptions: {
        output: {
          // Split vendor code by how often it tends to change, so returning
          // visitors can reuse cached chunks instead of re-downloading
          // everything after any app-code deploy. `firebase` is intentionally
          // its own chunk since it's now dynamically imported (only logged-in
          // users trigger it) rather than bundled into the eager app code.
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-firebase': ['firebase/app', 'firebase/messaging'],
            'vendor-motion': ['framer-motion', 'gsap', 'aos'],
            'vendor-editor': ['slate', 'slate-history', 'slate-react'],
          },
        },
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/test/setup.js',
    },
  });
}
