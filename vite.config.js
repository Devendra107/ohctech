import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
  
// })



export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Set this to true to allow access from the network
    port: 5173,  // Change this to the port you want to use
  }
});
