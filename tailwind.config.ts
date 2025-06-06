import aspectRatio from "@tailwindcss/aspect-ratio";
import forms from "@tailwindcss/forms";
import lineClamp from "@tailwindcss/line-clamp";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/react/**/*.{js,ts,jsx,tsx}", // HeroUI
  ],
  darkMode: "class", // suporte opcional ao modo escuro
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
        sans: ["Inter", "sans-serif"], // Texto principal
        display: ["Poppins", "sans-serif"], // Títulos e destaques
      },
      spacing: {
        section: "4rem", // espaçamento vertical entre seções
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
          xl: "3rem",
          "2xl": "4rem",
        },
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease-in-out",
        slideUp: "slideUp 0.4s ease-out",
        scaleIn: "scaleIn 0.3s ease-in-out",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["disabled", "group-hover"],
      opacity: ["disabled"],
    },
  },
  plugins: [lineClamp, forms, aspectRatio],
};

export default config;
