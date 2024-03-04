/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#7758FF",
        text: "#595959",
        white: "#F0F0F0",
        background: "#EDF1FA",
        bluedark: "#539BFF",
        bluelight: "#49BEFF",
        textbox: "#BACFFF",
        black: "#1A202C",
        heading: "#4A5568",
        textboxtext: "#9299A4",
        sidebar: "#718096"
      }
    },
  },
  plugins: [],
}