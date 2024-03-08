/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="Dark"]'],
  theme: {
    extend: {
      colors: {
        charcoal: {
          500: "#445158",
          700: "#2F3C43",
          900: "#262F36",
        },
        beige: {
          100: "#D1BFB5",
          300: "#BDABA1",
          500: "#A08E84",
        },
        text: {
          100: "#EEEEEE",
          300: "#303030",
          500: "#787878",
          700: "#303030",
          900: "#1F1F1F",
        },
      },
    },
  },
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
};
