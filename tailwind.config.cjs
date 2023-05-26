const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Altinn-Din", ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [require("@tailwindcss/forms"), require('tailwind-scrollbar'),
  ],
};
