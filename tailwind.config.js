const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
  // important: '#__next',
  darkMode: 'class',
  mode: 'jit',
  // future: {
  //   purgeLayersByDefault: true,
  //   applyComplexClasses: true,
  // },
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      linearBorderGradients: {
        directions: {
          tr: 'to top right',
          r: 'to right',
        },
        colors: {
          'blue-red': ['#27B0E6', '#ff3838'],
          'blue-pink': ['#27B0E6', '#FA52A0'],
          'pink-red-light-brown': ['#FE5A75', '#FEC464'],
        },
        background: {
          'dark-1000': '#0D0415',
          'dark-900': '#161522',
          'dark-800': '#202231',
          'dark-pink-red': '#4e3034',
          'gray-850': '#162031',
          'gray-800': '#0f172a',
          'gray-100': '#eaf0f6',
          white: '#fff',
        },
        border: {
          1: '1px',
          2: '2px',
          3: '3px',
          4: '4px',
        },
      },
      colors: {
        blue: '#384aff',

        'gray-850': '#162031',
        'gray-800': '#0f172a',
        'gray-100': '#eaf0f6',
        'gray-50': '#f8fafc',

        'dark-border': '#252525',
        'dark-stroke': '#222222',
        'light-border': '#A1A1A1',
        'light-stroke': '#D7D7FF',

        purple: '#a755dd',
        pink: '#f338c3',
        green: '#7cff6b',
        'green-special': '#26A17B',
        red: '#ff3838',
        yellow: '#ffd166',
        grey: '#AFAFC5',
        'light-blue': '#71B2D1',
        'dark-gray': '#20222F',
        'opaque-blue': '#0993ec80',
        'opaque-pink': '#f338c380',
        'pink-red': '#FE5A75',
        'light-brown': '#FEC464',
        'light-yellow': '#FFD166',
        'cyan-blue': '#0993EC',
        'dark-pink': '#221825',
        'dark-blue': '#0F182A',
        'dark-1000': '#0D0415',
        'dark-900': '#161522',
        'dark-850': '#1d1e2c',
        'dark-800': '#202231',
        'dark-700': '#2E3348',
        'dark-650': '#8F8D94',
        'dark-600': '#1C2D49',
        'dark-500': '#223D5E',
        'dark-400': '#171522',
        'low-emphesis': '#575757',
        primary: '#BFBFBF',
        secondary: '#7F7F7F',
        'high-emphesis': '#E3E3E3',
        blackberry: '#3A1F3E',
        bunting: '#202C45',
        'Mardi-Gras': '#212B2B',
        Myrtle: '#23274A',
        'aqua-pearl': '#5CB6D5',
        'black-russian': '#1A1D26',
        'carribean-green': '#00D395',
        'tahiti-gold': '#F5841F',
      },
      lineHeight: {
        '48px': '48px',
      },
      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        hero: [
          '48px',
          {
            letterSpacing: '-0.02em;',
            lineHeight: '96px',
            fontWeight: 700,
          },
        ],
        lg: ['1rem'],
        base: ['0.9rem'],
        sm: ['0.8rem'],
        xs: ['0.7rem'],
      },
      borderRadius: {
        none: '0',
        px: '1px',
        '1.5xl': '14px',
        '2.5xl': '20px',
        DEFAULT: '0.625rem',
      },
      boxShadow: {
        swap: '0px 50px 250px -47px rgba(39, 176, 230, 0.29)',
        liquidity: '0px 50px 250px -47px rgba(123, 97, 255, 0.23)',
        'pink-glow': '0px 57px 90px -47px rgba(250, 82, 160, 0.15)',
        'blue-glow': '0px 57px 90px -47px rgba(39, 176, 230, 0.17)',
        'pink-glow-hovered': '0px 57px 90px -47px rgba(250, 82, 160, 0.30)',
        'blue-glow-hovered': '0px 57px 90px -47px rgba(39, 176, 230, 0.34)',
      },
      ringWidth: {
        DEFAULT: '1px',
      },
      padding: {
        px: '1px',
        '3px': '3px',
      },
      minHeight: {
        empty: '128px',
        cardContent: '230px',
        fitContent: 'fit-content',
      },
      minHeight: {
        5: '1.25rem',
      },
      minWidth: {
        5: '1.25rem',
      },
      dropShadow: {
        currencyLogo: '0px 3px 6px rgba(15, 15, 15, 0.25)',
      },
      screens: {
        '3xl': '1600px',
      },
      animation: {
        ellipsis: 'ellipsis 1.25s infinite',
        'spin-slow': 'spin 2s linear infinite',
        fade: 'opacity 150ms linear',
      },
      keyframes: {
        ellipsis: {
          '0%': { content: '"."' },
          '33%': { content: '".."' },
          '66%': { content: '"..."' },
        },
        opacity: {
          '0%': { opacity: 0 },
          '100%': { opacity: 100 },
        },
      },
    },
  },
  variants: {
    linearBorderGradients: ['responsive', 'hover', 'dark'], // defaults to ['responsive']
    extend: {
      backgroundColor: ['checked', 'disabled'],
      backgroundImage: ['hover', 'focus'],
      borderColor: ['checked', 'disabled'],
      cursor: ['disabled'],
      opacity: ['hover', 'disabled'],
      placeholderColor: ['hover', 'active'],
      ringWidth: ['disabled'],
      ringColor: ['disabled'],
    },
  },
  plugins: [
    require('tailwindcss-border-gradient-radius'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.header-border-b': {
          background:
            'linear-gradient(to right, rgba(39, 176, 230, 0.2) 0%, rgba(250, 82, 160, 0.2) 100%) left bottom no-repeat',
          backgroundSize: '100% 1px',
        },
      })
    }),
  ],
}
