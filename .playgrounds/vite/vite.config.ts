import vue from '@vitejs/plugin-vue'
import imagesClsOptimizer from 'unplugin-images-cls-optimizer/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), imagesClsOptimizer()],
})
