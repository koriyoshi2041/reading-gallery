import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define a modern, dark palette inspired by fintech UIs
        // These will be used with CSS variables for easy theming
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: {
          DEFAULT: "var(--color-primary)",
          // Example shades if needed: 50: "var(--color-primary-50)",
        },
        secondary: "var(--color-secondary)",
        accent: {
          DEFAULT: "var(--color-accent)",
          dark: "var(--color-accent-dark)",
        },
        muted: "var(--color-muted)",
        card: "var(--color-card)",
        border: "var(--color-border)",
      },
      fontFamily: {
        // Use a modern sans-serif font stack for readability
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      // Subtle shadows for depth, common in fintech UIs
      boxShadow: {
        "fintech-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "fintech-md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "fintech-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      // Subtle animations
      animation: {
        'fade-in': 'fadeIn 1.5s ease-in-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')({
      // Customize typography plugin for better readability and fintech aesthetic
      // This will ensure markdown-rendered content also follows the new styles
      // This directly addresses "字看不清，对比度差" for text content
      prose: {
        css: {
          // General body text styles
          color: "var(--color-foreground)",
          lineHeight: "1.75",
          fontSize: "1.125rem", // Slightly larger base font size

          // Headings
          h1: {
            color: "var(--color-foreground)",
            fontWeight: "700",
            fontSize: "2.5rem", // Larger, more impactful headings
            marginTop: "1.5em",
            marginBottom: "0.75em",
          },
          h2: {
            color: "var(--color-foreground)",
            fontWeight: "600",
            fontSize: "2rem",
            marginTop: "1.25em",
            marginBottom: "0.75em",
          },
          h3: {
            color: "var(--color-foreground)",
            fontWeight: "600",
            fontSize: "1.75rem",
            marginTop: "1em",
            marginBottom: "0.5em",
          },
          h4: {
            color: "var(--color-foreground)",
            fontWeight: "600",
            fontSize: "1.5rem",
            marginTop: "1em",
            marginBottom: "0.5em",
          },
          // Links
          a: {
            color: "var(--color-primary)",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
              color: "var(--color-accent)", // Subtle hover effect
            },
          },
          // Blockquotes
          blockquote: {
            borderLeftColor: "var(--color-border)",
            color: "var(--color-muted)",
            fontStyle: "italic",
          },
          // Code blocks
          code: {
            color: "var(--color-primary)",
            backgroundColor: "var(--color-card)",
            padding: "0.2em 0.4em",
            borderRadius: "0.3em",
          },
          "code::before": { content: "none" },
          "code::after": { content: "none" },
          pre: {
            backgroundColor: "var(--color-card)",
            color: "var(--color-foreground)",
            borderRadius: "0.5rem",
            padding: "1rem",
            lineHeight: "1.5",
          },
          // Lists
          ul: {
            listStyleType: "disc",
            paddingLeft: "1.5em",
          },
          ol: {
            listStyleType: "decimal",
            paddingLeft: "1.5em",
          },
          li: {
            marginTop: "0.5em",
            marginBottom: "0.5em",
          },
          // Tables
          table: {
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "1em",
            marginBottom: "1em",
          },
          th: {
            backgroundColor: "var(--color-muted)",
            color: "var(--color-foreground)",
            padding: "0.75em",
            borderBottom: "1px solid var(--color-border)",
            textAlign: "left",
          },
          td: {
            padding: "0.75em",
            borderBottom: "1px solid var(--color-border)",
          },
        },
      },
    }),
  ],
};
export default config;
