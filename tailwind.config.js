/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'k-green-dark':  '#1A5C3A',
        'k-green-mid':   '#2E9E60',
        'k-green-light': '#E1F5EE',
        'k-green-mint':  '#9FE1CB',
        'k-cream':       '#FDFBF7',
        'k-cream-card':  '#F8F4EE',
        'k-ink':         '#1C1C1A',
        'k-muted':       '#5C5C58',
        'k-border':      'rgba(28,28,26,0.12)',
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        serif:   ['EB Garamond', 'serif'],
        sans:    ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
