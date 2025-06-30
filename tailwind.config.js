import flowbiteReact from "flowbite-react/plugin/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ".flowbite-react\\class-list.json"
  ],
  theme: {
    extend: {
      colors: {
      clientPrimary: "#2563eb",
      clientSecondary: "#334155",
      clientTertiary: "#47586e",
            
      clientAccent: "#fbbf24",
      clientBackground: "#fff",
      clientText: "#fff",
    }},
  },
  plugins: [flowbiteReact],
}