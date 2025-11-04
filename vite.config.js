import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    vue(),
    Pages({
      dirs: "src/pages",
    }),
    Layouts({
      layoutsDirs: "src/layouts",
      defaultLayout: "default",
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://lnaidbe.mistech.io",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
