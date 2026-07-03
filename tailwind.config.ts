import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Royal purple, primary brand
        royal: {
          DEFAULT: "#4B1D7A",
          50: "#f4eefb",
          100: "#e7d8f5",
          600: "#5b258f",
          700: "#4B1D7A",
          800: "#3a1660",
          900: "#2a1047",
        },
        // Gold, accents and highlights
        gold: {
          DEFAULT: "#B79A23",
          light: "#d8bd4f",
          dark: "#8f7818",
        },
        // Tower blue, secondary accent
        tower: {
          DEFAULT: "#1E5EA8",
          light: "#3a7cc4",
          dark: "#174c87",
        },
        ink: {
          DEFAULT: "#101010",
          soft: "#1a1a20",
          mute: "#2a2a32",
        },
        cloud: "#F8F8F8",
        status: {
          available: "#22C55E",
          selected: "#1E5EA8",
          booked: "#EF4444",
          maintenance: "#6B7280",
          pending: "#B79A23",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.22em",
      },
      maxWidth: {
        shell: "1200px",
      },
      boxShadow: {
        card: "0 18px 48px -24px rgba(16,16,16,0.35)",
        lift: "0 30px 60px -24px rgba(16,16,16,0.45)",
        glow: "0 0 0 1px rgba(183,154,35,0.25), 0 20px 50px -20px rgba(75,29,122,0.35)",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1.16)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both",
        "slow-zoom": "slow-zoom 18s ease-in-out infinite alternate",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
