/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/flowbite-react/**/*.js', // Add this line for Flowbite
  ],
  theme: {
    extend: {
      
      colors: {
        primary: "#9896bc",
        silder: "#2d2d35",
        aboutsection:"#dfdeec",
        secondary:"#5e5c70"
      },
    },
    
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* Hide scrollbar for Chrome, Safari, and Opera */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          /* Hide scrollbar for IE, Edge, and Firefox */
          '-ms-overflow-style': 'none', // IE and Edge
          'scrollbar-width': 'none', // Firefox
        },
      });
    },
    require('flowbite/plugin')  // Add Flowbite plugin here
]

};
