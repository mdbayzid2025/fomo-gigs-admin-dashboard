import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    host: "10.10.7.52",
    port: 3020,
    // host: "76.13.210.102",
    // port: 5005,
    allowedHosts: ["https://rimaiziza-dashboard.vercel.app", "dashboard.gogreenmatrix.my", "https://api.gogreenmatrix.my"]
  },
})
