/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.jsx",
  ],
  theme: {
    extend: {
      screens:{
        'pet-l': '896px',
        'pet-m': '576px',
        'pet-s': '360px',
      },
      aspectRatio: {
        '200/140' : '200 / 140',
      },
      fontFamily: {
      'sans': ['SUIT Variable']
      },
      colors: {
        'primary': '#FFD966',
        'pet-orange': '#FF9703',
        'pet-black': '#161616',
        'pet-red': '#D15D48',
        'pet-green': '#567764',
        'pet-bg': '#FFFDF9',
        'gray-1': '#BBBBBB',
        'gray-2': '#7A7A7A',
      },
    },
  },
  plugins: [],
}