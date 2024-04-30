/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem'
      },
      fontFamily: {
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
