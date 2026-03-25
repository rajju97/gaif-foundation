/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';
export default {
  daisyui: {
    themes: [{
      light: {
        primary: '#000000',
        'primary-content': '#ffffff',
        secondary: '#0057c0',
        'secondary-content': '#ffffff',
        accent: '#795548',
        neutral: '#1a1c1c',
        'base-100': '#f9f9f9',
        'base-200': '#f3f3f3',
        'base-300': '#eeeeee',
        'base-content': '#1a1c1c',
        info: '#0057c0',
        success: '#36D399',
        warning: '#FBBD23',
        error: '#F87272',
      },
      dark: {
        primary: '#ffffff',
        'primary-content': '#000000',
        secondary: '#006ff0',
        'secondary-content': '#ffffff',
        accent: '#A1887F',
        neutral: '#e0e0e0',
        'base-100': '#1a1d23',
        'base-200': '#22262f',
        'base-300': '#2d3139',
        'base-content': '#e5e7eb',
        info: '#3ABFF8',
        success: '#36D399',
        warning: '#FBBD23',
        error: '#F87272',
      }
    }],
    darkTheme: 'dark',
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: '#f9f9f9',
        'surface-low': '#f3f3f3',
        'surface-container': '#eeeeee',
        'surface-lowest': '#ffffff',
        'surface-high': '#e8e8e8',
        'surface-highest': '#e2e2e2',
        'primary-container': '#1b1b1b',
        'secondary-accent': '#0057c0',
        'secondary-container': '#006ff0',
        'on-surface': '#1a1c1c',
        'on-surface-variant': '#4c4546',
        'on-primary': '#ffffff',
        'outline-variant': '#cfc4c5',
        soil: '#795548',
        'soil-dark': '#5D4037',
        sand: '#A1887F',
        cream: '#FAF9F6',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: {
        'display': '-0.02em',
        'label': '0.05em',
      },
      fontSize: {
        'headline-lg': ['2rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],
        'body-md': ['0.875rem', { lineHeight: '1.25rem' }],
      },
      borderRadius: {
        'ds': '0.375rem',
        'ds-sm': '0.25rem',
      },
      boxShadow: {
        'ambient': '0 4px 32px rgba(26, 28, 28, 0.04)',
        'ambient-lg': '0 8px 64px rgba(26, 28, 28, 0.06)',
        'card': '0 2px 32px rgba(26, 28, 28, 0.04)',
        'card-hover': '0 4px 48px rgba(26, 28, 28, 0.06)',
        'glass': '0 8px 32px rgba(26, 28, 28, 0.08)',
      },
      spacing: {
        'section': '5rem',
        'section-lg': '6rem',
      },
    },
  },
  plugins: [daisyui],
}
