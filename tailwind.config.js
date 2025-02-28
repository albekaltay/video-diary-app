/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tüm bileşen dosyalarınızı dahil edin
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}