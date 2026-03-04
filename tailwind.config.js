/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#fdf8f0',
          100: '#f9eddb',
          200: '#f2d7b0',
          300: '#e9bb7d',
          400: '#df9a4a',
          500: '#d6802a',
          600: '#c56820',
          700: '#a4501d',
          800: '#84411f',
          900: '#6c371c',
          950: '#3a1b0c',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e3ebe3',
          200: '#c7d7c7',
          300: '#a1baa1',
          400: '#769976',
          500: '#587b58',
          600: '#446244',
          700: '#384f38',
          800: '#2f402f',
          900: '#283528',
          950: '#131c13',
        },
        terracotta: {
          50: '#fef4f0',
          100: '#fde5dc',
          200: '#fbc9b8',
          300: '#f8a387',
          400: '#f37450',
          500: '#ec5026',
          600: '#dd3a18',
          700: '#b82c14',
          800: '#932717',
          900: '#782418',
          950: '#410f09',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}