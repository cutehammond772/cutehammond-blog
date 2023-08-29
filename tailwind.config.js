/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],

  theme: {
    screens: {
      tablet: "768px",
      desktop: "1024px",
    },
    extend: {
      colors: {
        primary: {
          50: "#f4f7fb",
          100: "#e9edf5",
          200: "#cedae9",
          300: "#a3bbd6",
          400: "#7196bf",
          500: "#4f79a8",
          600: "#3c608d",
          700: "#324d72",
          800: "#2c4360",
          900: "#27374d",
          950: "#1b2536",
        },
        emphasize: {
          50: "#fffaeb",
          100: "#fff1c6",
          200: "#ffe088",
          300: "#ffc436",
          400: "#ffb420",
          500: "#f99107",
          600: "#dd6a02",
          700: "#b74906",
          800: "#94370c",
          900: "#7a2f0d",
          950: "#461602",
        },
      },
    },
  },

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
