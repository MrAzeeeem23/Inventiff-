/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Italiana: ["Italiana", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
        bebas_neue_r: ["Bebas Neue", "serif"],
        afacad: ["Afacad", "sans-serif"],
        michroma_regular: ["Michroma", "sans-serif"],
        exo: ["Exo 2", "sans-serif"],
      },
      keyframes: {
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        shine: {
          "0%": { "background-position": "100%" },
          "100%": { "background-position": "-100%" },
        }
      },
      animation: {
        gradient: "gradient 8s linear infinite",
        spotlight: "spotlight 2s ease .75s 1 forwards",
        spin_slow: "spin 20s linear infinite",
        shine: "shine 5s linear infinite",
      },
    },
  },
  darkMode: "selector",
  plugins: [],
};
