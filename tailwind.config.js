/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#021A24',
        accent: '#E9F1F3',
        orange: '#FF6800',
        blue: '#102F68',
        light_orange:"#FFE4B8",
        green: "#AEE680"
      },
      fontFamily:{
        montserrat: ['var(--font-montserrat)'],
        manrope: ['var(--font-manrope)'],
        mouser: ['var(--font-mouser)'],
      }
    },
  },
  plugins: [],
}