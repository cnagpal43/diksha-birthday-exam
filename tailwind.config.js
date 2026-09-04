/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cbt: {
          navy: '#0f2744',
          header: '#1e3a5f',
          accent: '#2563eb',
          bg: '#f1f5f9',
          border: '#cbd5e1',
          answered: '#22c55e',       // Green
          notAnswered: '#ef4444',    // Red
          review: '#8b5cf6',         // Purple
          reviewAnswered: '#7c3aed', // Purple with green dot
          notVisited: '#94a3b8',     // Grey
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        serif: ['Georgia', 'Cambria', 'serif'],
      }
    },
  },
  plugins: [],
}


