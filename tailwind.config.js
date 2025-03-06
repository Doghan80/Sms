/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#003c71",
        secondary: "#f5f5f5",
        hover: "#002a52",
      },
    },
  },
  plugins: [],
  darkMode:"class",
};
