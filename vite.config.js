import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "./src") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
      {
        find: "@hooks",
        replacement: path.resolve(__dirname, "./src/hooks"),
      },
      {
        find: "@config",
        replacement: path.resolve(__dirname, "./src/config"),
      },
      {
        find: "@context",
        replacement: path.resolve(__dirname, "./src/context"),
      },
      {
        find: "@helpers",
        replacement: path.resolve(__dirname, "./src/helpers"),
      },
      {
        find: "@hooks",
        replacement: path.resolve(__dirname, "./src/hooks"),
      },
      {
        find: "@layouts",
        replacement: path.resolve(__dirname, "./src/layouts"),
      },
      {
        find: "@pages",
        replacement: path.resolve(__dirname, "./src/pages"),
      },
      {
        find: "@themes",
        replacement: path.resolve(__dirname, "./src/themes"),
      },
    ],
  },
  plugins: [react()],
});
