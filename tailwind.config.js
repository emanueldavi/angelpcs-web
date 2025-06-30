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
      primary: "#2563eb",
      secondary: "#334155",
      tertiary: "#47586e",
            
      accent: "#fbbf24",
      background: "#fff",
      text: "#fff",
    }},
  },
  plugins: [flowbiteReact],
}