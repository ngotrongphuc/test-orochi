import plugin from 'tailwindcss/plugin'

import type { Config } from 'tailwindcss'

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '0.5rem',
        },
      },
      animation: {
        border: '2.5s linear rotating2 infinite, 0.64s linear x',
        up: '0.2s ease-out slide-up',
        down: '0.2s ease-out slide-down',
        pulse: '3s linear pulse infinite',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '100%': { transform: 'translateY(100px)', opacity: '0' },
        },
        pulse: {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      backgroundImage: {
        conic: `conic-gradient(
          from calc(var(--r2) - 80deg) at center,
          #FFFFFF 0%,
          #FD4A35 20%,
          #FFF 25%
        )`,
        'hero-radiant':
          'radial-gradient(115.78% 71.36% at 25.31% 0%, rgba(134, 193, 237, 0.3) 0%, rgba(134, 193, 237, 0.05) 100%);',
        border: 'linear-gradient(180deg, #86C1ED 0%, #FFFFFF 83.51%)',
        overlay:
          'linear-gradient(180deg, rgba(134, 193, 237, 0.6) 0%, #FFFFFF 88.71%);',
        'overlay-about':
          'linear-gradient(176.87deg, #F1F7FD 2.59%, rgba(241, 247, 253, 0.73) 43.7%, rgba(241, 247, 253, 0) 85.63%);',
      },
      borderRadius: {
        btn: '16px',
        '24': '24px',
        '40': '40px',
      },
      zIndex: {
        header: '100',
        cursor: '101',
      },
      boxShadow: {
        DEFAULT: '0px 8px 15px 0px hsla(0, 0%, 0%, 0.05)',
        'coming-soon': '8px 8px 40px 0px hsla(240, 5%, 34%, 0.08)',
        card: '0px 4px 10px 0px #0000000A;',
      },
      spacing: {
        0: '0rem',
        ...Array(100 * 4)
          .fill(0)
          .map((_, i) => i + 1)
          .reduce<Record<string, string>>((acc, i) => {
            acc[i / 4] = i / 16 + 'rem'
            return acc
          }, {}),
      },
      scale: {
        200: '2',
      },
    },
    fontSize: {
      sm: ['0.875rem', '1.0625rem'],
      base: ['1rem', '1.375rem'],
      md: ['1.125rem', '1.75rem'],
      lg: ['1.4375rem', '1.6875rem'],
      // no xl
      '2xl': ['1.75rem', '2.0625rem'],
      '3xl': ['2.1875rem', '2.5625rem'],
      '4xl': ['2.75rem', '3.25rem'],
      '5xl': ['3.4375rem', '4.0625rem'],
      '6xl': ['4.3125rem', '5.0625rem'],

      11: ['0.6875rem', { lineHeight: '0.75rem' }],
      12: ['0.75rem', { lineHeight: '1rem' }],
      14: ['0.875rem', { lineHeight: '1.0625rem' }],
      16: ['1rem', { lineHeight: '1.375rem' }],
      18: ['1.125rem', { lineHeight: '1.75rem' }],
      23: ['1.4375rem', { lineHeight: '1.6875rem' }],
      28: ['1.75rem', { lineHeight: '2.0625rem' }],
      32: ['2rem', { lineHeight: '1.75rem' }],
      35: ['2.1875rem', { lineHeight: '2.5625rem' }],
      44: ['2.75rem', { lineHeight: '3.25rem' }],
      55: ['3.4375rem', { lineHeight: '4.0625rem' }],
      69: ['4.3125rem', { lineHeight: '5.0625rem' }],
      92: ['5.75rem', { lineHeight: '6.75rem' }],
    },
    colors: {
      green: {
        100: 'hsla(86,58%,95%,1)',
        200: 'hsla(85,59%,81%,1)',
        300: 'hsla(86,59%,73%,1)',
        400: 'hsla(86,59%,62%,1)',
        500: 'hsla(86,59%,54%,1)',
        600: 'hsla(86,50%,38%,1)',
        700: 'hsla(85,51%,33%,1)',
      },
      blue: {
        100: 'hsla(210,75%,97%,1)',
        200: 'hsla(207,73%,93%,1)',
        300: 'hsla(206,75%,87%,1)',
        400: 'hsla(204,76%,78%,1)',
        500: 'hsla(206,74%,73%,1)',
        'tint-10': ' #86C1ED1A',
        'tint-20': 'hsla(206, 74%, 73%, 0.2)',
        'tint-50': 'hsla(206, 74%, 73%, 0.5)',
      },
      tint: {
        'white-70': 'hsla(0, 0%, 100%, 0.7)',
      },
      red: {
        50: 'hsla(4,100%,97%,1)',
        100: 'hsla(4,100%,90%,1)',
        300: 'hsla(6,100%,81%,1)',
        400: 'hsla(6,100%,70%,1)',
        500: 'hsla(6,98%,60%,1)',
        600: 'hsla(6,84%,48%,1)',
        'tint-50': 'hsla(6,98%,60%,0.5)',
      },
      neutral: {
        100: 'hsla(210,20%,98%,1)',
        200: 'hsla(240,5%,96%,1)',
        300: 'hsla(240,6%,90%,1)',
        400: 'hsla(240,5%,84%,1)',
        500: 'hsla(240,5%,65%,1)',
        600: 'hsla(240,4%,46%,1)',
        700: 'hsla(240,5%,34%,1)',
        800: 'hsla(240,4%,16%,1)',
      },
      white: 'hsla(0,0%,100%,1)',
      'white-1/5': 'hsla(0,0%,100%,0.20)',
      'white-4/5': 'hsla(0,0%,100%,0.80)',
      black: 'hsla(240,10%,4%,1)',
      transparent: 'transparent',
    },
    screens: {
      xs: '375px',
      sm: '425px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '4k': '2000px',
    },
  },
  plugins: [
    plugin(({ addVariant, addComponents, addUtilities }) => {
      addVariant('hocus', ['&:hover', '&:focus'])
      addVariant('touch', '@media(hover: none)')
      addVariant('not-last', '&:not(:last-child)')
      addVariant('not-first', '&:not(:first-child)')

      addUtilities({
        '.container-fluid': {
          maxWidth: '1088px',
          marginLeft: 'auto',
          marginRight: 'auto',
        },
        '.flex-center': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      })

      addComponents({
        '.clip-sm': {
          clipPath: 'path("M 12,0 H 0 V 12 C 0,6 6,0 12,0 Z")',
        },
        '.clip-lg': {
          clipPath: 'path("M 24,0 H 0 V 24 C 0,12 12,0 24,0 Z")',
        },
        '.hidden-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.hidden-scrollbar': {
          scrollbarWidth: 'none',
          MsOverflowStyle: 'none',
        },
      })
    }),
  ],
}
export default config
