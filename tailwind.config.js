/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        InterRegular: ["InterRegular", "sans-serif"],
      },
      colors: {
        zinc: {
          900: "#18181b",
          200: "#e4e4e7",
        },
      },
    },
  },
  plugins: [],
}

