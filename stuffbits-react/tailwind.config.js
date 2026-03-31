/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0d1220',
          dark: '#0d1220',
          light: '#1a2757',
        },
        gold: {
          DEFAULT: '#d4af37',
          light: '#e8c547',
        },
        accent: {
          DEFAULT: '#0A66C2',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'monospace'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        // Fluid cap: fills narrow viewports, rem-based max on large screens (no fixed 1280px lock-in)
        container: 'min(100%, 80rem)',
      },
      backgroundImage: {
        'navy-gradient':
          'linear-gradient(270deg,rgb(9, 12, 41), rgb(26, 35, 126))',
        'hero-gradient':
          'linear-gradient(135deg, #0d1220 0%, #1a2757 50%, #1e3a5f 100%)',
        'hero-gradient-subtle':
          'linear-gradient(180deg, #0d1220 0%, #0d1220 40%, #1a2757 100%)',
      },
    },
  },
  plugins: [],
}
