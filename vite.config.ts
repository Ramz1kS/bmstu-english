import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/ please...
export default defineConfig({
  plugins: [react()],
  base: '/bmstu-english/',
})
