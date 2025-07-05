/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Abilita la dark mode basata su classi
  theme: {
    extend: {
      colors: {
        // Puoi aggiungere colori personalizzati qui se necessario
      },
    },
  },
  plugins: [],
};
