/** @type {import('tailwindcss').Config} */
// Colors come from CSS variables in src/index.css (:root), so the whole
// palette can be changed in one place.
const v = (name) => `rgb(var(--c-${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: v('ink'),
        surface: v('surface'),
        line: 'rgba(255,255,255,0.08)',
        accent: { DEFAULT: v('accent'), soft: v('accent-soft') },
        cream: v('text'),
        muted: v('muted'),
      },
      fontFamily: {
        en: ['Inter', 'system-ui', 'sans-serif'],
        ar: ['"IBM Plex Sans Arabic"', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '76rem' },
      boxShadow: {
        glow: '0 0 0 1px rgb(var(--c-accent) / 0.35), 0 10px 40px -10px rgb(var(--c-accent) / 0.45)',
      },
    },
  },
  plugins: [],
}
