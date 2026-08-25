export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        canvas: '#F5F6F2',
        surface: '#FFFFFF',
        elevated: '#FBFBF8',
        ink: {
          DEFAULT: '#18231F',
          secondary: '#6B7A75',
          tertiary: '#9AA5A0',
          inverse: '#F6F8F4',
        },
        primary: {
          DEFAULT: '#2E5E52',
          dark: '#22463D',
          soft: '#DCE8E1',
          tint: '#EDF3EF',
        },
        sage: '#A9C4B5',
        mist: '#E7EFE9',
        lavender: '#E2DEEF',
        sky: '#D8E6EC',
        sand: '#EFE7DC',
        blush: '#EFE0DE',
        line: '#E6E9E2',
        danger: {
          DEFAULT: '#A9524A',
          soft: '#F5E7E5',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['32px', { lineHeight: '38px', letterSpacing: '-0.02em' }],
        h1: ['26px', { lineHeight: '32px', letterSpacing: '-0.02em' }],
        h2: ['20px', { lineHeight: '26px', letterSpacing: '-0.01em' }],
        h3: ['17px', { lineHeight: '23px', letterSpacing: '-0.01em' }],
        body: ['15px', { lineHeight: '23px' }],
        small: ['13.5px', { lineHeight: '20px' }],
        caption: ['12px', { lineHeight: '17px' }],
      },
      spacing: {
        '4.5': '1.125rem',
      },
      borderRadius: {
        card: '20px',
        xl2: '26px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(24,35,31,0.04), 0 8px 24px -12px rgba(24,35,31,0.10)',
        lift: '0 2px 6px rgba(24,35,31,0.06), 0 18px 40px -18px rgba(24,35,31,0.22)',
        device: '0 40px 90px -30px rgba(24,35,31,0.45)',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
}
