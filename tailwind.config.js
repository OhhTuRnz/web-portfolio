/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      // Add a custom class for hiding elements on medium screens
      screens: {
        'sm' : '552px',
        'md' : '768px', // You can adjust the breakpoint as needed
        'lg' : '1024px',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

