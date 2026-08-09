import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from "path" 

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // CMC Pro API does not allow browser CORS — proxy in dev.
    proxy: {
      "/cmc-api": {
        target: "https://pro-api.coinmarketcap.com",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/cmc-api/, ""),
      },
    },
  },
})
