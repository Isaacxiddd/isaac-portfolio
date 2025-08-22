module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { pixel: ["'Press Start 2P'", "monospace"] },
      colors: {
        cyberbg: "#060714",
        cyberpanel: "#071028",
        cyberaccent: "#0ea5ff",
        neondanger: "#ff4d8f",
      },
      boxShadow: {
        neon: "0 0 14px rgba(14,165,255,0.12), 0 0 36px rgba(255,77,143,0.06)"
      }
    }
  },
  plugins: []
};
