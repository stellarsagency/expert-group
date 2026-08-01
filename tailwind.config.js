/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-navy": "#1A3B66",
        "brand-ocean": "#2B75A4",
        "brand-yellow": "#FFB73C",
        "brand-green": "#3BB074",
        "brand-red": "#E60012",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
