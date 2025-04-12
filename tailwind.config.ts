import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        sm: '425px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      }
    },
    fontFamily: {
      primaria: ['var(--font-primaria)', 'sans-serif'],
      secundaria: ['var(--font-secundaria)', 'sans-serif'],
    },
  },
  plugins: [],
} satisfies Config;
