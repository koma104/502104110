import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        "primary/10": "rgba(37, 99, 235, 0.1)",
        "primary/5": "rgba(37, 99, 235, 0.05)",
        "primary/20": "rgba(37, 99, 235, 0.2)",
        "background-light": "#f6f7f8",
        "bg-offwhite": "#f9f9f9",
        "text-black": "#111111",
        "accent-blue": "#2563eb",
      },
      fontFamily: {
        display: ["Inter", "Noto Sans JP", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
        "card-hover":
          "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
