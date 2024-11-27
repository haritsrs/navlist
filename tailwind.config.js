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
        floatShape0: {
          '0%, 100%': { 
            transform: 'translateY(0) translateX(0) rotate(45deg)',
          },
          '50%': { 
            transform: 'translateY(-15px) translateX(10px) rotate(90deg)',
          }
        },
        floatShape1: {
          '0%, 100%': { 
            transform: 'translateY(0) translateX(0) rotate(120deg)',
          },
          '50%': { 
            transform: 'translateY(20px) translateX(-15px) rotate(180deg)',
          }
        },
        floatShape2: {
          '0%, 100%': { 
            transform: 'translateY(0) translateX(0) rotate(210deg)',
          },
          '50%': { 
            transform: 'translateY(-25px) translateX(5px) rotate(270deg)',
          }
        },
      },
      animation: {
        'float-shape-0': 'floatShape0 20s ease-in-out infinite',
        'float-shape-1': 'floatShape1 22s ease-in-out infinite',
        'float-shape-2': 'floatShape2 18s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};