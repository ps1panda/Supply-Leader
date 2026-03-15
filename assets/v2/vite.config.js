import { resolve } from "node:path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { twMerge } from "tailwind-merge";
import nunjucks from "@vituum/vite-plugin-nunjucks";

function mergeClasses(value = "", base = "") {
  return twMerge(base, value);
}

function renderAttrs(attrs = {}) {
  return Object.entries(attrs)
    .filter(([, value]) => value !== false && value !== null && value !== undefined)
    .map(([key, value]) => {
      if (value === true) {
        return key;
      }

      const normalized = String(value).replaceAll('"', "&quot;");
      return `${key}="${normalized}"`;
    })
    .join(" ");
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    nunjucks({
      root: resolve(__dirname, "src/njk"),
      globals: {
        format: "njk"
      },
      filters: {
        twMerge: mergeClasses,
        renderAttrs
      },
      options: {
        trimBlocks: true,
        lstripBlocks: true
      }
    })
  ],
  server: {
    host: "127.0.0.1",
    port: 3000
  },
  preview: {
    host: "127.0.0.1",
    port: 4173
  },
  build: {
    rollupOptions: {
      input: [
        resolve(__dirname, "index.html"),
        resolve(__dirname, "src/njk/pages/about-company.njk.html")
      ]
    }
  }
});
