/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#effcff",
          100: "#c6f7ff",
          200: "#93ebff",
          300: "#58dfff",
          400: "#1ecfff",
          500: "#00b7ff",
          600: "#0091d6",
          700: "#0073aa",
          800: "#065e8a",
          900: "#0a4b6e"
        }
      },
      backgroundImage: {
        "gradient-bubble": "radial-gradient(circle at 20% 20%, rgba(255,0,128,0.18), transparent 40%), radial-gradient(circle at 80% 10%, rgba(0,200,255,0.20), transparent 40%), radial-gradient(circle at 30% 80%, rgba(255,200,0,0.18), transparent 35%)"
      }
    },
  },
  plugins: [],
}
