import { existsSync } from "node:fs"
import { fileURLToPath } from "node:url"

import mdx from "@astrojs/mdx"
import { defineConfig } from "astro/config"

for (const envFile of [".env.local", ".env"]) {
  if (existsSync(envFile)) process.loadEnvFile(envFile)
}

const projectRoot = fileURLToPath(new URL(".", import.meta.url))
const bundledContentRoot = fileURLToPath(new URL("./content", import.meta.url))
const contentRoot = process.env.OBSIDIAN_VAULT_PATH || bundledContentRoot

export default defineConfig({
  site: "https://shch.one",
  output: "static",
  trailingSlash: "always",
  publicDir: "./static",
  integrations: [mdx()],
  i18n: {
    locales: ["ru", "en"],
    defaultLocale: "ru",
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    server: {
      fs: {
        allow: [projectRoot, contentRoot],
      },
    },
  },
})
