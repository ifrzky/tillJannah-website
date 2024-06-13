/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#FFD700',
        bluemain: '#FAF9F6',
      },
      primary: {
        DEFAULT: '#f9fafb',
      },
    },
  },
  plugins: [],
}

