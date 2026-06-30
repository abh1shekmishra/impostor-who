/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic tokens mapped to CSS variables (themeable: dark/light).
        canvas: 'rgb(var(--c-canvas) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--c-surface-2) / <alpha-value>)',
        elevated: 'rgb(var(--c-elevated) / <alpha-value>)',
        border: 'rgb(var(--c-border) / <alpha-value>)',
        'border-strong': 'rgb(var(--c-border-strong) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        'ink-2': 'rgb(var(--c-ink-2) / <alpha-value>)',
        'ink-3': 'rgb(var(--c-ink-3) / <alpha-value>)',
        brand: 'rgb(var(--c-brand) / <alpha-value>)',
        'brand-2': 'rgb(var(--c-brand-2) / <alpha-value>)',
        'brand-ink': 'rgb(var(--c-brand-ink) / <alpha-value>)',
        danger: 'rgb(var(--c-danger) / <alpha-value>)',
        success: 'rgb(var(--c-success) / <alpha-value>)',
        warning: 'rgb(var(--c-warning) / <alpha-value>)',
      },
      fontFamily: {
        sans: [
          'Space Grotesk',
          'InterVariable',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        display: [
          'Anton',
          'Space Grotesk',
          'InterVariable',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'Space Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.12)',
        card: '0 1px 0 rgba(255,255,255,0.04) inset, 0 12px 40px -12px rgba(0,0,0,0.45)',
        float: '0 24px 60px -20px rgba(0,0,0,0.55)',
        glow: '0 0 0 1px rgb(var(--c-brand) / 0.32), 0 14px 46px -14px rgb(var(--c-brand) / 0.62)',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        safe: 'env(safe-area-inset-bottom)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
        'spring-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        shimmer: 'shimmer 1.6s infinite',
        'pulse-ring': 'pulse-ring 1.4s cubic-bezier(0.22, 1, 0.36, 1) infinite',
      },
    },
  },
  plugins: [],
};
