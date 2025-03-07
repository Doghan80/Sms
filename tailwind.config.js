/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F22A2",  // Dark Blue sidebar
        secondary: "#BBC4E8",  // Soft Blue backgrund
        hover: "#002a52",  // Hover color from the design
        mini:"#001d3d",// dark color for background
        background: "#E8EAF5", // Light Lavender from the design
        accent: "#659AC6", // Soft Sky Blue from the design
        muted: "#A59CB0", // Muted Gray from the design
        danger: "#854C5D", // Muted Red from the design
      },
    },
  },
  plugins: [],
  darkMode:"class",
};
