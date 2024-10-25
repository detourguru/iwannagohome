import type { Config } from "tailwindcss";

const config: Config = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        gray: {
          50: "var(--gray-50)",
          100: "var(--gray-100)",
        },
      },
      fontSize: {
        "regular-12": ["12px", { lineHeight: "140%", fontWeight: 400 }],
        "regular-14": ["14px", { lineHeight: "140%", fontWeight: 400 }],
        "regular-16": ["16px", { lineHeight: "140%", fontWeight: 400 }],
        "regular-18": ["18px", { lineHeight: "140%", fontWeight: 400 }],
        "regular-20": ["20px", { lineHeight: "140%", fontWeight: 400 }],
        "bold-14": ["14px", { lineHeight: "140%", fontWeight: 700 }],
        "bold-16": ["16px", { lineHeight: "140%", fontWeight: 700 }],
        "bold-18": ["18px", { lineHeight: "140%", fontWeight: 700 }],
        "bold-20": ["20px", { lineHeight: "140%", fontWeight: 700 }],
        "bold-24": ["24px", { lineHeight: "140%", fontWeight: 700 }],
        "bold-34": ["34px", { lineHeight: "140%", fontWeight: 700 }],
        "bold-70": ["70px", { lineHeight: "140%", fontWeight: 700 }],
      },
    },
  },
  plugins: [],
};
export default config;
