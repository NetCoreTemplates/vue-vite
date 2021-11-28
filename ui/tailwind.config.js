const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit', // in preview: https://tailwindcss.com/docs/just-in-time-mode
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      "./src/**/*.{vue,md}",
      "./public/**/*.html",
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: { // https://github.com/tailwindlabs/tailwindcss-typography
        DEFAULT: {
          css: {
            code: {
              color: defaultTheme.colors.blue[500],
              backgroundColor: defaultTheme.colors.blue[50],
              fontWeight: 'normal',
              borderRadius: '.25rem',
              padding: '.25em .5rem',
            },
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            }
          }
        }
      },      
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
