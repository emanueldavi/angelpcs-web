import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), flowbiteReact()],
  resolve: {
    alias: {
    "@": path.resolve(__dirname, "src"),
    "@/client": path.resolve(__dirname, "src/client"),
    "@/admin": path.resolve(__dirname, "src/admin"),

  },
},
})