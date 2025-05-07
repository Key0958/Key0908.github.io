/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f4f1fa',
          100: '#e9e2f5',
          200: '#d3c5eb',
          300: '#b79ddc',
          400: '#976fca',
          500: '#7c4dba',
          600: '#5E35B1', // Main primary color
          700: '#512da8',
          800: '#45288a',
          900: '#3c2571',
          950: '#231342',
        },
        secondary: {
          50: '#e6f6f5',
          100: '#c5ecea',
          200: '#93dcd8',
          300: '#5dc6c0',
          400: '#36b0a9',
          500: '#00897B', // Main secondary color
          600: '#047369',
          700: '#0a5f57',
          800: '#0e4c46',
          900: '#103f3a',
          950: '#02231f',
        },
        accent: {
          50: '#ebeefe',
          100: '#dbe0fd',
          200: '#bdc4fa',
          300: '#9aa4f7',
          400: '#7c85f3',
          500: '#5e63ee',
          600: '#3949AB', // Main accent color
          700: '#3b3bcd',
          800: '#2f31a6',
          900: '#2a3184',
          950: '#1a1b4b',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.primary.600'),
              '&:hover': {
                color: theme('colors.primary.700'),
              },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.200'),
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: theme('colors.primary.300'),
              },
            },
          },
        },
      }),
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};