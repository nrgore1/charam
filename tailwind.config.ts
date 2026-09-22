import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        parchment: "#FAF8F5",
        sand: "#F3EBDC",
        ink: "#28231D",
        "ink-soft": "#5A5347",
        saffron: {
          DEFAULT: "#DB8A0C",
          deep: "#AE6A05",
          tint: "#FBEFDA",
        },
        forest: {
          DEFAULT: "#1E3B33",
          deep: "#122720",
        },
        brass: "#A5813A",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        arch: "999px 999px 24px 24px",
      },
      maxWidth: {
        measure: "68ch",
      },
    },
  },
  plugins: [],
};

export default config;
