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
        gray2: '#1E1E1E',
        gray3: '#666666',
        gray4: '#D9D9D9',
        red1: '#FF2801',
        white: '#FFFFFF'
      },
      fontFamily: {
        Aurora: ['Aurora Condensed', 'sans-serif'],
        BankGothic: ['BankGothic', 'sans-serif'],
        Urbanist: ['Urbanist', 'sans-serif'],
        Bodoni: ['Bodoni Moda', 'serif']
      }
    }
  },
  plugins: []
}
