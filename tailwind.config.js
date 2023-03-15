const options = require('./config'); //options from config.js

const allPlugins = {
  typography: require('@tailwindcss/typography'),
  forms: require('@tailwindcss/forms'),
  lineClamp: require('@tailwindcss/line-clamp'),
  containerQueries: require('@tailwindcss/container-queries'),
};

const plugins = Object.keys(allPlugins)
  .filter((k) => options.plugins[k])
  .map((k) => {
    if (k in options.plugins && options.plugins[k]) {
      return allPlugins[k];
    }
  });

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,php}'],
  theme: {
    screens: {
      xs: '360px',
      sm: '600px',
      md: '768px',
      md2: '960px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1600px',
    },
    colors: {
      white: '#fff',
      'ghost-white': '#f9f9f9',
      'mango-tango': '#fe7a41',
      'atomic-tangerine': '#FE9567',
      'carrot-orange': '#E26934',
      indigo: '#29394d',
      gray: '#949494',
      'light-silver': '#d8d8d8',
      current: 'currentColor',
    },
    fontFamily: {
      sans: ['MPLUS1p', 'sans-serif'],
    },

    extend: {
      fontSize: {
        'site-22': '1.375rem',
        'site-28': '1.75rem',
        'site-32': '2rem',
        'site-38': '2.375rem',
        'site-40': '2.5rem',
        'site-44': '2.75rem',
        'site-48': '3rem',
        'site-56': '3.5rem',
        'site-60': '3.75rem',
        'site-80': '5rem',
      },
      lineHeight: {
        'site-32': '2rem',
        'site-40': '2.5rem',
        'site-48': '3rem',
        'site-56': '3.5rem',
        'site-60': '3.75rem',
        'site-68': '4.25rem',
        'site-80': '5rem',
        'site-120': '7.5rem',
      },
      boxShadow: {
        site: '0px 8px 20px rgba(129, 135, 189, 0.2)',
      },
      container: {
        screens: {
          '2xl': '1600px',
        },
        padding: {
          DEFAULT: '1.5rem',
          /*sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',*/
        },
      },
      spacing: {},
      borderRadius: {},
    },
  },
  plugins: plugins,
};
