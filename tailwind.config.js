/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: "#050714",
          900: "#0b0f2a",
          850: "#10163a",
          800: "#161d4e",
          700: "#222c73",
        },
        cosmic: {
          cyan: "#38bdf8",
          purple: "#a855f7",
          violet: "#6366f1",
          pink: "#ec4899",
          emerald: "#10b981",
          amber: "#f59e0b",
        },
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 5s ease-in-out infinite",
        "float-fast": "float 3.5s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "spin-slow": "spin 25s linear infinite",
        "aurora": "aurora 15s ease infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(0.8deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.35, transform: "scale(1)" },
          "50%": { opacity: 0.7, transform: "scale(1.08)" },
        },
        aurora: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glass-hover": "0 14px 40px -10px rgba(99, 102, 241, 0.45)",
        "glow-cyan": "0 0 25px rgba(56, 189, 248, 0.4)",
        "glow-purple": "0 0 30px rgba(168, 85, 247, 0.4)",
        "inner-glow": "inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)",
      },
    },
  },
  plugins: [],
};
