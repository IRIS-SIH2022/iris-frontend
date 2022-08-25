import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        index: new URL("./index.html", import.meta.url).pathname,
        userapp: new URL("./reporting.html", import.meta.url).pathname,
        record: new URL("./record.html", import.meta.url).pathname,
        login: new URL("./login.html", import.meta.url).pathname,
      },
      external: {
        main: new URL("./main.js", import.meta.url).pathname,
        user: new URL("./user.js", import.meta.url).pathname,
        record: new URL("./record.js", import.meta.url).pathname,
        login: new URL("./login.js", import.meta.url).pathname,
      },
    },
  },
});
