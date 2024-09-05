/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        '--color-primary-l': '#de7226',
        '--color-primary':'#d05e0d',
        '--color-secondary-l': '#21225b',
        '--color-secondary': '#121336',
        '--color-headings': '#1b0760',
        '--color-body': '#000000cc',
      },
      width: {
        '--service-image-w': '25rem',
      },
      margin: {
        // '3rem 0 2rem 2rem'
        '--body-mt': '4rem',
        '--body-ml': '10rem',
        '--body-mr': '8rem',
      },
      dropShadow: {
        'forRegButton': '0 0 25px #de7226',
        // '4xl': [
        //     '0 35px 35px rgba(0, 0, 0, 0.25)',
        //     '0 45px 65px rgba(0, 0, 0, 0.15)'
        // ]
      },
      boxShadow: {
        'myBoxShadow': '0 0 10px #d3d3d3',
        // '4xl': [
        //     '0 35px 35px rgba(0, 0, 0, 0.25)',
        //     '0 45px 65px rgba(0, 0, 0, 0.15)'
        // ]
      }
    },
  },
  plugins: [],
}
