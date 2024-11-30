import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Dirección de tu backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Opcional: elimina "/api" si el backend no lo usa
      },
    },
  },
});
