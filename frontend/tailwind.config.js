/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-700': '#6A1B9A',
        'indigo-600': '#3F51B5',
        'indigo-500': '#5C6BC0',
        'pink-200': '#FFCDD2',
        'green-200': '#C8E6C9',
      },
    },
  },
  plugins: [],
}