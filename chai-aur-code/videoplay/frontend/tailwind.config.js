/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        "primary-color": "#0a0a0a",
        "secondary-color": "#0e0e0e",
        "tertiary-color": "#1d1d1d",
      },
      screens: {
        xxs: "320px",
        xs: "480px",
        "2xl": "1440px",
      },
    },
  },
  plugins: [],
};
