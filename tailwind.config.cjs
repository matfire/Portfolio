const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Altinn-Din", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          lighter: '#dbe6e7',
          "DEFAULT": '#F2F6FC',
          darker: '#374053'
        },
      },
      backgroundColor: {
        primary: {
          lighter: '#dfe5ef',
          "DEFAULT": '#F2F6FC',
          darker: '#374053'
        },
      },
      textColor: {
        primary: {
          lighter: '#dfe5ef',
          "DEFAULT": '#F2F6FC',
          darker: '#374053'
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require('tailwind-scrollbar'),
  ],
};
