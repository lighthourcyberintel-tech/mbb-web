/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: "#3d6b6b",
          light: "#4e8080",
          dark: "#2e5050",
        },
        cream: {
          DEFAULT: "#f5f0e8",
          dark: "#ede8e0",
        },
        olive: {
          DEFAULT: "#8a9a5b",
          dark: "#6e7a47",
        },
        charcoal: {
          DEFAULT: "#1a1a1a",
          light: "#2e2e2e",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      fontWeight: {
        display: "800",
      },
    },
  },
  plugins: [],
}
