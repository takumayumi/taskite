/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    colors: {
      black: "#212121",
      blue: "#759CBF",
      green: "#84BFB9",
      "green-1": "#A6D3CF",
      "green-2": "#3C7973",
      indigo: "#191659",
      "indigo-1": "#8783DC",
      "indigo-2": "#080635",
      orange: "#D9936A",
      "orange-1": "#D4B3A0",
      "orange-2": "#DA7032",
      transparent: "transparent",
      white: "#EBEBEB",
      yellow: "#F2BC79",
      "yellow-1": "#F4D6B0",
      "yellow-2": "#F6A23B",
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        playwright: ["Playwrite NO", "cursive"],
      },
      spacing: {
        92.5: "370px",
        138: "552px",
      },
    },
  },
  plugins: [],
};
