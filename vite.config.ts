import { readFileSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The `/*` block of public/_headers (Cloudflare Pages syntax), so the preview
// server, and the e2e tests that run against it, use the production headers.
function siteHeaders(): Record<string, string> {
  const headers: Record<string, string> = {};
  let inBlock = false;
  for (const line of readFileSync("public/_headers", "utf8").split("\n")) {
    if (!line.trim() || line.startsWith("#")) continue;
    if (!/^\s/.test(line)) {
      inBlock = line.trim() === "/*";
      continue;
    }
    const at = line.indexOf(":");
    if (inBlock && at > 0)
      headers[line.slice(0, at).trim()] = line.slice(at + 1).trim();
  }
  return headers;
}

export default defineConfig({
  plugins: [react()],
  base: "./",
  preview: { headers: siteHeaders() },
});
