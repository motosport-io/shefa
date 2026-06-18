/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-heebo)", "var(--font-assistant)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#0b63b8",
          dark: "#084a8a",
          light: "#e8f1fb",
          accent: "#1f9d55",
        },
        ink: "#0f172a",
      },
      boxShadow: {
        card: "0 4px 24px -8px rgba(15, 23, 42, 0.18)",
      },
    },
  },
  plugins: [],
};
