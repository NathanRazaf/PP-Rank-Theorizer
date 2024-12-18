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
    },
  },
  plugins: [],
}