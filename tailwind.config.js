/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        fadeSlideInLeft: {
          '0%': {
            transform: 'translateX(-100%) translateY(50px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0) translateY(-50px)', 
            opacity: '1',
          },
        },
      },
      animation: {
        'fade-slide-in-left': 'fadeSlideInLeft 1s ease-out forwards',
      },
    },
  },
  plugins: [],
};
