import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/api/v1' : 'https://harsh-project-3.onrender.com',
    }
  },
  plugins: [react()],
})
