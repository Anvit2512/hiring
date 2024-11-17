/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      animation: {
        wave: 'wave 1.5s ease-in-out infinite',
        colorCycle: 'colorCycle 3s linear infinite',
      },
      keyframes: {
        wave: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0)' },
        },
        colorCycle: {
          '0%': { color: '#FF6347' }, // Tomato color
          '25%': { color: '#1E90FF' }, // Dodger Blue
          '50%': { color: '#32CD32' }, // Lime Green
          '75%': { color: '#FFD700' }, // Gold
          '100%': { color: '#FF6347' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('tw-elements-react/dist/plugin.cjs'),
  ],
}
