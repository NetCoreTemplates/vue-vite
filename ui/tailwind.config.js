module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      "./components/**/*.vue",
      "./views/**/*.vue",
      "./pages/**/*.md",
      "./public/**/*.html",
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
