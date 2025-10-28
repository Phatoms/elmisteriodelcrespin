/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mystery: {
          darker: '#0a0a0a',
          dark: '#1a1a1a',
          medium: '#2a2a2a',
        },
        amber: {
          light: '#d4a574',
          DEFAULT: '#c4915c',
          dark: '#8b6f47',
        },
        sepia: {
          light: '#f4e4c1',
          DEFAULT: '#dcc59a',
          dark: '#b89968',
        },
        crimson: {
          DEFAULT: '#8b0000',
          dark: '#5c0000',
        },
        parchment: '#f5ead6',
      },
      fontFamily: {
        mystery: ['"Special Elite"', 'monospace'],
        elegant: ['"Cinzel"', 'serif'],
        body: ['"Lato"', 'sans-serif'],
      },
      boxShadow: {
        'mystery': '0 4px 20px rgba(139, 0, 0, 0.3)',
        'polaroid': '0 10px 30px rgba(0, 0, 0, 0.5)',
        'glow': '0 0 20px rgba(212, 165, 116, 0.6)',
      },
      animation: {
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        'fade-in': 'fadeIn 0.6s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 165, 116, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(212, 165, 116, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
