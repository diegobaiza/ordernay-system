/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // purge: [],
  darkMode: true,
  theme: {
    extend: {
      colors: {
        darkBlue: {
          dark: "#3a3f64",
        },
        green: {
          palid: "#bed1d1",
          dark: "#284243",
          forest: "#245d60",
        },
        orange: {
          sunset: "#d59c7e",
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
