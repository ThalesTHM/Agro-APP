/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        navyblue: '#03045e',
        lighterblue: '#caf0f8',
        lightblue: '#ade8f4'
      }
    },
  },
  plugins: [],
}

