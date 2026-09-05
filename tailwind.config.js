/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          void: "#030014",
          abyss: "#050112",
          surface: "rgba(13, 7, 32, 0.7)",
          glass: "rgba(18, 10, 43, 0.5)",
          border: "rgba(0, 240, 255, 0.15)",
        },
        cosmic: {
          cyan: "#00f0ff",
          purple: "#9d4edd",
          violet: "#7928ca",
          alien: "#00ff9f",
          plasma: "#ff007f",
          gold: "#ffb703",
        },
      },
      fontFamily: {
        display: ['"Orbitron"', '"Space Grotesk"', 'sans-serif'],
        mono: ['"Share Tech Mono"', '"Fira Code"', 'monospace'],
        body: ['"Rajdhani"', '"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 240, 255, 0.4)',
        'glow-purple': '0 0 25px -5px rgba(157, 78, 221, 0.4)',
        'glow-alien': '0 0 25px -5px rgba(0, 255, 159, 0.4)',
        'glow-plasma': '0 0 25px -5px rgba(255, 0, 127, 0.4)',
        'hud-card': '0 8px 32px 0 rgba(0, 0, 0, 0.56), inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'orbit-slow': 'spin 30s linear infinite',
        'scanline': 'scanline 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

