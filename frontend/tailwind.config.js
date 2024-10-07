/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite', // Slow spinning
        'bounce': 'bounce 1.5s infinite', // Bouncing effect for 403
      },
    },
  },
  plugins: [],
}

