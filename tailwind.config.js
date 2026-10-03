/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FAFAF7",
        charcoal: "#1a1a1a",
        "charcoal-light": "#2d2d2d",
        accent: {
          lavender: "#E9D5FF",
          blue: "#BFDBFE",
          mint: "#A7F3D0",
          pink: "#FBCFE8",
          yellow: "#FDE68A",
          cyan: "#A5F3FC",
          orange: "#FED7AA",
        },
      },
      fontFamily: {
        pixel: ['"Silkscreen"', '"Press Start 2P"', '"DotGothic16"', '"Pixelify Sans"', "monospace"],
        handwritten: ['"Caveat"', "cursive"],
        display: ['"Inter"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
      animation: {
        "ticker": "ticker 30s linear infinite",
        "ticker-reverse": "ticker-reverse 25s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out 2s infinite",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "ticker-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
