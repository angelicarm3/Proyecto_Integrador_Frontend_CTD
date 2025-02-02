/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './src/**/*.css', './node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}'],
  darkMode: 'false',
  theme: {
    extend: {
      colors: {
        black1: '#080808',
        black2: '#1C1B20',
        black3: '#191919',
        beige1: '#F3EDE7',
        blue1: '#1E97F3',
        yellow1: '#D4AF37',
        gray1: '#4D414A6B',
        gray2: '#1E1E1E',
        gray3: '#666666',
        gray4: '#D9D9D9',
        gray5: '#414A6B',
        gray6: '#C0C0C0',
        green1: '#09A334',
        red1: '#CC4043',
        white: '#FFFFFF',
        customDarkBlue: 'rgb(15, 23, 42)',
        popUpBg1: '#000000b3',
        popUpBg2: '#40414A6B',
        customLighterBlue: 'rgb(65, 74, 107)'
      },
      fontFamily: {
        Aurora: ['Aurora Condensed', 'sans-serif'],
        BankGothic: ['BankGothic', 'sans-serif'],
        Urbanist: ['Urbanist', 'sans-serif'],
        Roboto: ['Roboto Slab', 'serif']
      },
      animation: {
        'spin-slow': 'spin 1.5s linear infinite'
      }
    }
  },
  plugins: []
}
