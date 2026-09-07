import { existsSync } from "node:fs"
import { fileURLToPath } from "node:url"

import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

for (const envFile of [".env.local", ".env"]) {
  if (existsSync(envFile)) process.loadEnvFile(envFile)
}

const bundledContentRoot = fileURLToPath(new URL("../content", import.meta.url))
const contentRoot = process.env.OBSIDIAN_VAULT_PATH || bundledContentRoot

const siteContent = defineCollection({
  loader: glob({
    base: contentRoot,
    pattern: "**/*.{md,mdx}",
  }),
  schema: ({ image }) =>
    z.object({
      aliases: z.array(z.string()).default([]),
      cover: image().optional(),
      credits: z.string().optional(),
      externalUrl: z.url().optional(),
      featured: z.boolean().default(false),
      locale: z.enum(["ru", "en"]).default("ru"),
      object: z.string().optional(),
      order: z.number().int().default(999),
      role: z.string().optional(),
      slug: z.string(),
      stack: z.array(z.string()).default([]),
      status: z.enum(["draft", "published", "archived"]),
      summary: z.string(),
      title: z.string(),
      translationKey: z.string().optional(),
      type: z.enum(["note", "project"]),
      year: z.number().int().optional(),
    }),
})

export const collections = {
  site: siteContent,
}
