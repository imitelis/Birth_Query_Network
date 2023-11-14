import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dotenv from 'dotenv';

let envFile;

if (process.env.NODE_ENV === 'development') {
  envFile = '.env.development';
}

if (process.env.NODE_ENV === 'production') {
  envFile = '.env.production';
}

const env = dotenv.config({
  path: envFile,
}).parsed;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://long-leaf-1490.fly.dev',
  server: {
    host: true,
    strictPort: true,
    port: 3000,
    hmr: {
      overlay: false,
    },
    proxy: {
      '/api': {
           target: 'https://localhost:8000',
           changeOrigin: true,
           secure: false,      
           ws: true,
       }
    }
  },
  define: {
    'import.meta.env.APP_API_URL': JSON.stringify(env.APP_API_URL)
  }
})
