import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1A1D29",
        paper: "#f3f4f8",
        surface: "#F6F7FB",
        muted: "#667085",
        border: "#E3E6ED",
        accent: {
          DEFAULT: "#3654FF",
          hover: "#2743E0",
        },
        success: {
          DEFAULT: "#12B76A",
          hover: "#0E9C5A",
        },
        warning: {
           DEFAULT: "#F79009",
            hover: "#DC7F05",
        },
        danger: {
          DEFAULT: "#F04438",
          hover: "#D92D20",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "dot-grid": "radial-gradient(circle, rgba(54,84,255,0.18) 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-grid": "16px 16px",
      },
    },
  },
  plugins: [],
};

export default config;
