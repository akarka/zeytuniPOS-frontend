/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
    ],
    darkTheme: "dark", // varsayılan dark tema
    base: true, // temel CSS'leri uygula
    styled: true, // komponent stillerini uygula
    utils: true, // utility class'ları uygula
    prefix: "", // class prefix'i (örn: "daisy-")
    logs: true, // konsol logları
    themeRoot: ":root", // tema değişkenlerinin root elementi
  },
};
