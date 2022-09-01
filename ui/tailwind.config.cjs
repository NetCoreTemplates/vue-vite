const defaultTheme = require('tailwindcss/defaultTheme')
const { colors } = defaultTheme

module.exports = {
  content: [
    "./src/**/*.{vue,md}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      // https://github.com/tailwindlabs/tailwindcss-typography
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'pre': {
              overflowX: 'auto',
              maxWidth: 'calc(100vw - 1rem)'
            },
            code: {
              color: theme('colors.blue.500'),
              backgroundColor: theme('colors.blue.50'),
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
                color: theme('colors.gray.600'),
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
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
