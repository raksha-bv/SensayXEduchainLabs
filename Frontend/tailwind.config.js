/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "pastel-purple": "#A388EE",
        "pastel-purple-dark": "#8A6CD7",
        "pastel-blue": "#88AEEE",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(163, 136, 238, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(163, 136, 238, 0.1) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-pattern": "20px 20px",
      },
      animation: {
        bounce: "bounce 1s infinite",
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      transitionDelay: {
        0: "0ms",
        150: "150ms",
        300: "300ms",
      },
    },
  },

  plugins: [require("tailwind-scrollbar"), require("@tailwindcss/typography")],
};
