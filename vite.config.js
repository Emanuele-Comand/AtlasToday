import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Espone le variabili d'ambiente al client
    "process.env": {},
  },
  // Configura le variabili d'ambiente
  envPrefix: "VITE_",
  // Carica automaticamente i file .env
  envDir: ".",
});
