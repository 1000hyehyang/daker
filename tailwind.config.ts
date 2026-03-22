import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        "muted-bg": "hsl(var(--muted-bg) / <alpha-value>)",
        faint: "hsl(var(--faint) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        "border-strong": "hsl(var(--border-strong) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
        "accent-hover": "hsl(var(--accent-hover) / <alpha-value>)",
        "accent-fg": "hsl(var(--accent-fg) / <alpha-value>)",
        "accent-muted": "hsl(var(--accent-muted) / <alpha-value>)",
        danger: "hsl(var(--danger) / <alpha-value>)",
        "danger-bg": "hsl(var(--danger-bg) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        elevated: "#ffffff",
        ink: "hsl(var(--foreground) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        /** Editorial display */
        display: ["2.75rem", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "600" }],
        /** Section titles */
        title: ["1.25rem", { lineHeight: "1.35", letterSpacing: "-0.02em", fontWeight: "600" }],
      },
      maxWidth: {
        measure: "42rem",
        content: "68rem",
      },
    },
  },
  plugins: [],
};

export default config;
