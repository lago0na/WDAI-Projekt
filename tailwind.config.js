/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'neo': '8px 8px 0px 0px rgba(0,0,0,1)', // Wasz charakterystyczny twardy cień
      },
      borderWidth: {
        '4': '4px',
      }
    },
  },
  plugins: [],
}