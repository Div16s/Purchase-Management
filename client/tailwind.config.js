const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
       header: ["Poppins", "sans-serif"],
       custom: ["Roboto Condensed", "sans-serif"],
       figtree: ["Figtree", "sans-serif"]
    },
  },
  plugins: [],
});