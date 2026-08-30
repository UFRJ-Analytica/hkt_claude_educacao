import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const railwayDomain = process.env.RAILWAY_PUBLIC_DOMAIN

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['.up.railway.app', ...(railwayDomain ? [railwayDomain] : [])],
    strictPort: true,
  },
})
