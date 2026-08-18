import vinext from "vinext";
import { defineConfig } from "vite";

// The site is exported as static HTML for GitHub → Cloudflare Pages deploys.
export default defineConfig({
  plugins: [vinext()],
});
