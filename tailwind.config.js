const { fontFamily } = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./page/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", ...fontFamily.sans],
      },
      colors: {
        spotify: {
          100: "#34db6f",
          200: "#4adf7f",
          300: "#61e38f",
          400: "#1ed760",
          500: "#1bc156",
          600: "#18ac4c",
          700: "#159643",
          800: "#128139",
          900: "#0f6b30",
        },
      },
    },
    screens: {
      sm: { max: "767px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { min: "768px", max: "1023px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: { min: "1024px", max: "1279px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: { min: "1280px", max: "1535px" },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      "2xl": { min: "1536px" },
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    plugin(({ addComponents }) => {
      addComponents({
        ".social-btn": {
          display: "flex",
          fontWeight: "bold",
          color: "#fff",
          fontSize: "1.125rem",
          lineHeight: "1.75rem",
        },
      });
    }),
  ],
};
