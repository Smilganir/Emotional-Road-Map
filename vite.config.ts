import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project sites need base = /repo-name/ (set BASE_PATH in CI).
const base = process.env.BASE_PATH ?? '/'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base,
})
