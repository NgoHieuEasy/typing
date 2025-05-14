import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], // add that here and don't forget the import!
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
