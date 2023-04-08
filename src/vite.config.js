import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    open: "index.html",
  },
  build: {
    emptyOutDir: true,
    outDir: "../dist",
    modulePreload: { polyfill: false },
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
});
