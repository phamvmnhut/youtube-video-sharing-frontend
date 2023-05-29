/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '12px',
        sm: '1rem',
        lg: '45px',
        xl: '5rem',
        '2xl': '13rem',
      },
    },
    extend: {
      colors: {
        background: "#000000", // black
        background2: "#0D1727", // blue black
        primary: "#14F195", // green
        secondary: "#00FFFF", // blue
        tertiary: "#9340FF", // purple
        quaternary: "#FF0F7B", // red
        quinary: "#ffb83a", // yellow

        'dark': '#3c4858',
        'black': '#161c2d',
        'dark-footer': '#192132',
        // quaternary, quinary, senary, septenary, octonary, nonary, denary.
      },
      textColor: {
        base: "white",
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
      },

      boxShadow: {
        sm: '0 2px 4px 0 rgb(60 72 88 / 0.15)',
        DEFAULT: '0 0 3px rgb(60 72 88 / 0.15)',
        md: '0 5px 13px rgb(60 72 88 / 0.20)',
        lg: '0 10px 25px -3px rgb(60 72 88 / 0.15)',
        xl: '0 20px 25px -5px rgb(60 72 88 / 0.1), 0 8px 10px -6px rgb(60 72 88 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(60 72 88 / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(60 72 88 / 0.05)',
        testi: '2px 2px 2px -1px rgb(60 72 88 / 0.15)',
      },
      fontSize: {
        sm: ['14px', '20px'],
        base: ['17px', '24px'],
        lg: ['20px', '28px'],
        xl: ['22px', '30px'],
      },
      spacing: {
        0.75: '0.1875rem',
        3.25: '0.8125rem'
      },
      zIndex: {
        1: '11',
        2: '21',
        3: '31',
        999: '9999',
      },
      maxWidth: ({
        theme,
        breakpoints
      }) => ({
        '1200': '71.25rem',
        '992': '60rem',
        '768': '45rem',
      }),
      fontFamily: {
        "monterat": ['Montserrat', 'sans-serif'],
        "teko": ['Teko', 'sans-serif'],
      },
      animation: {
        blob: "blob 7s infinite",
        'fade-in-down': 'fade-in-down 0.2s ease-out',
        wiggle: 'wiggle 1s ease-in-out infinite',
        heartBeat: 'heartBeat 1s infinite',
        hflip: 'flipHorizontal 2s infinite',
        vflip: 'flipVertical 2s infinite',
        swing: 'swing 2s ease-out infinite',
        rubberBand: 'rubberBand 1s infinite',
        flash: 'flash 2s infinite',
        headShake: 'headShake 2s infinite',
        wobble: 'wobble 1s infinite',
        jello: 'jello 2s infinite',
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1)",
          },
        },
      }
    }
  },
  variant: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-animated'),
    require('tailwind-scrollbar-hide'),
  ],
}
