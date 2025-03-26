/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'teal-light': '#81D8D0',
        'teal-dark': '#0ABAB5',
      }
    },
  },
  plugins: [],
}

