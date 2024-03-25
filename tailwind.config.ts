import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: "#E9E9E9",
      black: "#222222",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    nextui({
      prefix: "nextui",
      addCommonColors: false,
      defaultTheme: "light",
      defaultExtendTheme: "light",
      layout: {},
      themes: {
        light: {
          layout: {},
          colors: {
            background: "#E9E9E9",
            text: "#222222",
            primary: {
              DEFAULT: "#222222",
              foreground: "#E9E9E9",
            },
            primaryLight: "#E9E9E9",
            primaryLightHover: "#CCCCCC",
            primaryLightActive: "#AAAAAA",
            primaryLightContrast: "#222222",
            primaryBorder: "#222222",
            primaryBorderHover: "#111111",
            primarySolidHover: "#111111",
            primarySolidContrast: "#E9E9E9",
            primaryShadow: "#222222",
          },
        },
        dark: {
          layout: {},
          colors: {
            background: "#E9E9E9",
            text: "#222222",
            primary: {
              DEFAULT: "#222222",
              foreground: "#E9E9E9",
            },
            primaryLight: "#E9E9E9",
            primaryLightHover: "#CCCCCC",
            primaryLightActive: "#AAAAAA",
            primaryLightContrast: "#222222",
            primaryBorder: "#222222",
            primaryBorderHover: "#111111",
            primarySolidHover: "#111111",
            primarySolidContrast: "#E9E9E9",
            primaryShadow: "#222222",
          },
        },
        // ... custom themes
      },
    }),
  ],
};

export default config;