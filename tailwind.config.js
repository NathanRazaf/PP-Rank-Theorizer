/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        default: 'var(--font-default)',
        content: 'var(--font-content)',
        'default-vi': 'var(--font-default-vi)',
        'default-zh': 'var(--font-default-zh)',
        'default-th': 'var(--font-default-th)',
        'default-zh-tw': 'var(--font-default-zh-tw)',
      },
      colors: {
        'osu-small-text': 'var(--osu-small-text)',
        'osu-bg-1': 'var(--osu-bg-1)',
        'osu-bg-2': 'var(--osu-bg-2)',
        'osu-bg-3': 'var(--osu-bg-3)',
        'score-main-bg': 'var(--score-main-bg)',
        'score-bg': 'var(--score-bg)',
      }
    },
  },
  plugins: [],
}