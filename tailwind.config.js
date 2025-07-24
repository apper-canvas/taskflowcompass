/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5B67F5',
          light: '#8B92FF',
          dark: '#4A55E6'
        },
        accent: '#FF6B6B',
        surface: '#FFFFFF',
        background: '#F7F9FC',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3'
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'task-complete': 'fadeAndStrike 300ms ease-out forwards',
        'bounce-in': 'bounceIn 400ms ease-out',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
      },
      keyframes: {
        fadeAndStrike: {
          '0%': { opacity: '1', textDecoration: 'none' },
          '100%': { opacity: '0.6', textDecoration: 'line-through' }
        },
        bounceIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '70%': { transform: 'scale(1.8)', opacity: '0' },
          '100%': { transform: 'scale(1.8)', opacity: '0' }
        }
      }
    },
  },
  plugins: [],
}