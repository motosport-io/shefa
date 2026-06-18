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
        display: ["var(--font-assistant)", "var(--font-heebo)", "sans-serif"],
      },
      colors: {
        ink: {
          DEFAULT: "#0a1020",
          800: "#111a30",
          700: "#1b2745",
          600: "#2b3a5e",
        },
        brand: {
          50: "#eef6ff",
          100: "#d9ecff",
          200: "#b3d8ff",
          400: "#4aa3f0",
          500: "#1f8fe6",
          600: "#0b6fc4",
          700: "#0a579b",
          DEFAULT: "#0b6fc4",
        },
        electric: "#22d3ee",
        greenman: "#16a34a",
        polaris: "#f59e0b",
      },
      boxShadow: {
        card: "0 10px 40px -12px rgba(10, 16, 32, 0.18)",
        soft: "0 4px 20px -8px rgba(10, 16, 32, 0.12)",
        glow: "0 0 60px -10px rgba(34, 211, 238, 0.45)",
        float: "0 30px 60px -20px rgba(10, 16, 32, 0.45)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float-slow": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "float-slow": "float-slow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
