/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "app-gray": "#f5f5f7",
        "darker-gray": "#e5e5e5",
        "app-heading": "#7a7a7c",
        "app-yellow": "#edbb00"
      }
    },
  },
  plugins: [],
}

