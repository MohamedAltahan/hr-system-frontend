/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      rotate: {
        // '16': '20deg',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'], // Adding Cairo font to the theme
      },
      fontWeight: {
        200: 100,
        400: 400,
        700: 700,
        1000: 1000, // Define the font weights you'd like to use
      },
    },
  },
  plugins: [],
}