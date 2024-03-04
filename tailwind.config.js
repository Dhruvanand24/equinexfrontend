/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto"]
      },

      colors: {
        accent: ["#7758FF"],
        text: ["#595959"],
        offwhite: ["#F0F0F0"],
        background: ["#EDF1FA"],
        bluedark: ["#539BFF"],
        bluelight: ["#49BEFF"],
        textbox: ["#F4F7FF"],
        black: ["#1A202C"],
        heading: ["#4A5568"],
        textboxtext: ["#8792A4"],
        sidebar: ["#718096"],
        ring: ["#BACFFF"]
      }
    },
  },
  plugins: [],
}