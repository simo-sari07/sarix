/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce': 'bounce 1s infinite',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      backgroundImage: {
        'header-gradient': 'linear-gradient(to bottom, #1d0033, #2b0066, #3b0099, #0a0a20)',
      },
    },
  },
  plugins: [],
}
