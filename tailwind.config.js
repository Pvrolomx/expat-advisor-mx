/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        wa: {
          green: '#00a884',
          'green-dark': '#075e54',
          'green-light': '#25d366',
          'bg-dark': '#111b21',
          'bg-chat': '#0b141a',
          'msg-out': '#005c4b',
          'msg-in': '#202c33',
          border: '#2a3942',
          text: '#e9edef',
          'text-secondary': '#8696a0',
        }
      }
    },
  },
  plugins: [],
}
