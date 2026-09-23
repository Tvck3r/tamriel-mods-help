import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // Relative base so the build works from any GitHub Pages subpath
  // (user.github.io/<repo>/) without hardcoding the repo name.
  base: './',
  plugins: [react(), tailwindcss()],
})
