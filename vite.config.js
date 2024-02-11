import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig(({ mode }) => {
  if (mode === "development") {
    return {
      plugins: [react()],
      server: {
        watch: {
          usePolling: true
        },
        proxy: {
          "/api": {
            target: "http://localhost:4000",
            changeOrigin: true,
            secure: false,
          },
        },
      },
    };
  } else {
    return {
      plugins: [react()],
      server: {
        watch: {
          usePolling: true
        }
      }
    };
  }
});
