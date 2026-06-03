/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',  // 👈 ACTIVAR MODO OSCURO
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'compartir': {
          50: '#fdf8f5',
          100: '#f4e8e1',
          200: '#e8d1c4',
          300: '#d4b5a3',
          400: '#c09984',
          500: '#a87a64',
          600: '#8d5c48',
          700: '#6e4433',
          800: '#4f2f22',
          900: '#331e15',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}