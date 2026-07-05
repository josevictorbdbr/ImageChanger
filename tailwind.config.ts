import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#12141A",
        paper: "#F5F6FA",
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
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "dot-grid":
          "radial-gradient(circle, #D8DCE6 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-grid": "16px 16px",
      },
    },
  },
  plugins: [],
};

export default config;
