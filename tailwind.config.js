/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oguzFont: ['"Custom Font"', "sans-serif"],
        tiny5: ['"Tiny5"', "sans-serif"],
        redditMono: ['"Reddit Mono"', "monospace"],
        mooli: ['"Mooli"', "sans-serif"],
        poppins: ['"Poppins"', "sans-serif"],
        nunito: ['"Nunito"', "sans-serif"],
        exo: ['"Exo"', "sans-serif"],
        suse: ['"SUSE"', "sans-serif"],
      // Add more custom font families as needed
    },
    screens: {
      'custom-xs': { 'max': '430px' }, //370
      'custom-xm': { 'max': '450px' },
      'custom-sm': { 'max': '1000px' },
      'custom-m': { 'max': '1500px' },
    },

  },
  },
  plugins: [],
}
