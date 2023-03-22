const plugin = require("tailwindcss/plugin")

const settings = {
  colorText: "#333",
  colorPrimary: "#7026b9",
  colorCodeBg: "#fff4db",
  colorCode: "#8a6534",
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/posts/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular"],
    },
    extend: { content: { "ne-arrow": 'url("../images/NE-arrow.svg")' } },
  },
  plugins: [],
}
