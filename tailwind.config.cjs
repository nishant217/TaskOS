module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      colors: {
        /* Core surfaces */
        background: "var(--theme-background)",
        surface: "var(--theme-surface)",
        border: "var(--theme-border)",

        
        /* Brand / primary */
        primary: "var(--theme-primary)",
        "primary-2": "var(--theme-primary-2)",
        "primary-3": "var(--theme-primary-3)",
        accent: "var(--theme-accent)",
        "accent-2": "var(--theme-accent-2)",

        /* Text */
        "text-primary": "var(--theme-text-primary)",
        "text-muted": "var(--theme-text-muted)",
        "text-inverse": "var(--theme-text-inverse)",

        /* Cards */
        "card-bg": "var(--theme-card-bg)",
        "card-border": "var(--theme-card-border)",

        /* Status */
        success: "var(--theme-success)",
        warning: "var(--theme-warning)",

        /* Tints */
        "primary-tint": "var(--theme-primary-tint)",
        "primary-2-tint": "var(--theme-primary-2-tint)",
        "primary-3-tint": "var(--theme-primary-3-tint)",
        "accent-tint": "var(--theme-accent-tint)",

        /* Effects */
        "shadow-theme": "var(--theme-shadow)",
        "gradient-primary": "var(--theme-gradient-primary)",
      },
    },
  },
  plugins: [],
};
