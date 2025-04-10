import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/Front-Fisk-Informatica/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: false, // <== Usando o seu próprio arquivo no public
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icons/*.png'],
    }),
  ],
})
