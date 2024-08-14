import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    assetsDir: 'assets', // Ensure assets are placed in the correct directory
  },
  publicDir: 'public', // Ensure this is set to the correct directory
  assetsInclude: ['**/*.PNG'], // Include .PNG files as assets
})
