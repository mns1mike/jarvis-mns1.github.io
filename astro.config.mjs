import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.mns1express.com",
  output: "static",
  build: {
    format: "directory",
  },
});
