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
        ps3accent: "#0055cc",
        ps3text: "#0c1e42",
        ps3bg: "#c0d8f2",
      },
      boxShadow: {
        neon: "0 0 14px rgba(14,165,255,0.12), 0 0 36px rgba(255,77,143,0.06)"
      }
    }
  },
  plugins: []
};
