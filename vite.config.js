import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        index: new URL("./index.html", import.meta.url).pathname,
        userapp: new URL("./userApp.html", import.meta.url).pathname,
      },
      external: {
        main: new URL("./main.js", import.meta.url).pathname,
        user: new URL("./user.js", import.meta.url).pathname,
      },
    },
  },
});
