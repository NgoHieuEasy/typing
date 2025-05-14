/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      ssm:"425px",
      sm: "640px",
      md: "768px",
      mdLg: "820px",
      lg: "1110px",
      xl: "1280px",
      "2xl": "1536px",

    },
    extend: {
      colors: {
        "main-light-color": "#202654",
        "main-dark-color": "#111114",
      },
      fontFamily: {
        gilroy: ["SVN-Gilroy", "sans-serif"],
      },
    },
  },
  plugins: [],
};
