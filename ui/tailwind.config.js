const defaultTheme = require('tailwindcss/defaultTheme')
const { colors } = defaultTheme

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
            'pre': {
              overflowX: 'auto',
              maxWidth: 'calc(100vw - 1rem)'
            },
            code: {
              color: colors.blue[500],
              backgroundColor: colors.blue[50],
              fontWeight: 'normal',
              borderRadius: '.25rem',
              padding: '.25em .5rem',
            },
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },

            maxWidth: '65ch',
            color: 'inherit',
            a: {
              'color': 'inherit',
              'fontWeight': '500',
              'textDecoration': 'underline',
              '&:hover': {
                opacity: .8,
                color: colors.gray[600],
              },
            },
            b: { color: 'inherit' },
            strong: { color: 'inherit' },
            em: { color: 'inherit' },
            h1: { color: 'inherit' },
            h2: { color: 'inherit' },
            h3: { color: 'inherit' },
            h4: { color: 'inherit' },
          }
        }
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
