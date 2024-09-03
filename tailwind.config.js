/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        Bright: '#2a2a2a',
        MainDark: '#000',
        Middle: "#191919",
        White: '#FFFFFF',
        TextDark: "#B3B3B3",
        TextGray: "#A7A7A7"
      },
      gridTemplateColumns: {
        'auto-fill': 'repeat(auto-fill, minmax(200px, 1fr))',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

