const config = {
  plugins: {
    // Tailwind looks for "tailwindcss" starting from `base`, which defaults to the process's
    // working directory. Pin it to this folder so the dev server finds it however it was started.
    "@tailwindcss/postcss": { base: import.meta.dirname },
  },
};

export default config;
