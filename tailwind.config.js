/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';
export default {
  daisyui: {
    themes: [{
      light: {
        primary: '#388E3C',
        secondary: '#FB641B',
        accent: '#795548',
        neutral: '#374151',
        'base-100': '#F1F3F6',
        'base-200': '#FFFFFF',
        'base-300': '#E0E5EB',
        'base-content': '#212121',
        info: '#3ABFF8',
        success: '#36D399',
        warning: '#FBBD23',
        error: '#F87272',
      },
      dark: {
        primary: '#4CAF50',
        secondary: '#FB641B',
        accent: '#A1887F',
        neutral: '#374151',
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
        primary: '#388E3C',
        'green-dark': '#2E7D32',
        'green-mid': '#4CAF50',
        'flip-orange': '#FB641B',
        soil: '#795548',
        'soil-dark': '#5D4037',
        sand: '#A1887F',
        cream: '#FAF9F6',
        darkGreen: '#2E7D32',
      },
      boxShadow: {
        card: '0 1px 4px 0 rgba(0,0,0,0.12)',
        'card-hover': '0 4px 16px 0 rgba(0,0,0,0.18)',
      }
    },
  },
  plugins: [daisyui],
}
