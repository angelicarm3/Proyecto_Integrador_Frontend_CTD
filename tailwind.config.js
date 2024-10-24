/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black1: '#080808',
        black2: '#1C1B20',
        yellow1: '#F3C02F',
        gray1: '#414A68',
        red1: '#FF2801'
      },
      fontFamily: {
        Aurora: ['Aurora Condensed', 'sans-serif'],
        BankGothic: ['BankGothic', 'sans-serif']
      }
    }
  },
  plugins: []
}
