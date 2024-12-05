/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "max-sm": { max: "540px" },
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      backgroundImage: {
        "accent-gradient":
          "linear-gradient(90deg, hsla(00, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)",
      },
      colors: {
        "accent-color": "#8174A0",
      },
    },
  },
  plugins: [],
};
