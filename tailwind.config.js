/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: '#101417',
        'surface-dim': '#101417',
        'surface-bright': '#36393e',
        'surface-container-lowest': '#0b0f12',
        'surface-container-low': '#181c20',
        'surface-container': '#1c2024',
        'surface-container-high': '#272a2e',
        'surface-container-highest': '#323539',
        'on-surface': '#e0e2e8',
        'on-surface-variant': '#b9cacb',
        'outline': '#849495',
        'outline-variant': '#3b494b',
        primary: '#dbfcff',
        'on-primary': '#00363a',
        'primary-container': '#00f0ff',
        'on-primary-container': '#006970',
        secondary: '#ffdb9d',
        'on-secondary': '#412d00',
        'secondary-container': '#feb700',
        'on-secondary-container': '#6b4b00',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
