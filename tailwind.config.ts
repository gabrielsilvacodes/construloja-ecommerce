import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/react/**/*.{js,ts,jsx,tsx}", // HeroUI
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2D6A4F", // Verde musgo
        secondary: "#F4A261", // Laranja queimado
        accent: "#E76F51", // Vermelho terroso
        neutral: "#1C1C1E", // Escuro neutro
        light: "#F5F5F5", // Fundo claro
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
