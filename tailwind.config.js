/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem'
      },
      fontFamily: {
        poppins: ['"Poppins";'],
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  content: ['./src/**/*.{html,ts}'],
  blocklist: ['collapse'],
  corePlugins: {
    preflight: false
  }
};
