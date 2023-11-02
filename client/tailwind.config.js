/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '6/7': '90%',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
