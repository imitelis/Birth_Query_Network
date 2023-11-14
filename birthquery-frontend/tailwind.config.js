/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      focus: {
        outline: "none",
        boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
