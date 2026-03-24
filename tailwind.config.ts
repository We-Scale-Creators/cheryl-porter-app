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
        brand: {
          pink: "#FF008F",
          "pink-light": "#FFE5F3",
          "pink-hover": "#E6007F",
          purple: "#8B2FC9",
          "purple-deep": "#6B1D7B",
          gold: "#F5D31A",
          "gold-light": "#FFF9E6",
          cream: "#FFF8E7",
          black: "#2F2F2F",
          gray: "#6B7280",
          "gray-light": "#F3F4F6",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(180deg, #FF008F 0%, #8B2FC9 50%, #6B1D7B 100%)",
        "brand-gradient-horizontal": "linear-gradient(90deg, #FF008F 0%, #8B2FC9 100%)",
        "brand-pink-gradient": "linear-gradient(135deg, #FF008F 0%, #FF4DB2 100%)",
      },
      boxShadow: {
        card: "0 4px 20px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
