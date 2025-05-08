import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server : {
    open : true,
    port : 3000,
    proxy : {
      '/api' : {
        target : 'http://localhost:9090',
        changeOrigin : true,
        secure : false
      },

      '/images' : {
        target : 'http://localhost:9090',
        changeOrigin : true,
        secure : false
      },
    },
  },
  plugins : [react()],
})