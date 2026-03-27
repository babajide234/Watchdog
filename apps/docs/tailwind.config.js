/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#d4d4d8",
            a: { color: "#f97316", textDecoration: "none" },
            "h1,h2,h3,h4": { color: "#fafafa" },
            code: { color: "#f97316", backgroundColor: "#18181b", padding: "0.15em 0.4em", borderRadius: "0.25rem" },
            "pre code": { backgroundColor: "transparent", color: "inherit", padding: 0 },
            pre: { backgroundColor: "#09090b", border: "1px solid #27272a" },
            strong: { color: "#fafafa" },
          },
        },
      },
    },
  },
  plugins: [],
};
