import type { Config } from "tailwindcss";

const config: Config = {
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
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: '#007AFF',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            h1: {
              color: 'inherit',
              marginTop: '1.5em',
              marginBottom: '0.5em',
            },
            h2: {
              color: 'inherit',
              marginTop: '1.25em',
              marginBottom: '0.5em',
            },
            h3: {
              color: 'inherit',
              marginTop: '1em',
              marginBottom: '0.5em',
            },
            p: {
              marginTop: '0.75em',
              marginBottom: '0.75em',
            },
            ul: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            li: {
              marginTop: '0.25em',
              marginBottom: '0.25em',
            },
            code: {
              color: 'inherit',
              backgroundColor: 'rgba(127, 127, 127, 0.1)',
              borderRadius: '0.25rem',
              padding: '0.2em 0.4em',
            },
          },
        },
      },
    },
  },
};

export default config;
