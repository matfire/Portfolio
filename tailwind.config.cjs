const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
        'md': '768px',
        // => @media (min-width: 768px) { ... }
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
        '2xl': '1536px' // => @media (min-width: 1536px) { ... }

      },
      fontFamily: {
        sans: ["Altinn-Din", ...defaultTheme.fontFamily.sans],
      },
      
      backgroundColor: {
        primary: {
          lighter: '#dbe6e7',
          "DEFAULT": '#F2F6FC',
          darker: '#374053'
        },
      }
    },
  },
  plugins: [require("@tailwindcss/forms"), require('tailwind-scrollbar'),
  ],
};
