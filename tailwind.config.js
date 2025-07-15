/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          DEFAULT: '#f59e0b', 
          dark: '#d97706',   
          light: '#fcd34d',  
        },
      },
    },
  },
  plugins: [],
};
export default config;