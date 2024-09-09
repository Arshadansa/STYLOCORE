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
      },
    },
    
  },
  plugins: [
    require('flowbite/plugin')  // Add Flowbite plugin here
]

};
