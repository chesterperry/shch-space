import {
  cpSync,
  existsSync,
  mkdtempSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
} from "node:fs"
import { tmpdir } from "node:os"
import { basename, join } from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = fileURLToPath(new URL("..", import.meta.url))

for (const envFile of [".env.local", ".env"]) {
  const path = join(projectRoot, envFile)
  if (existsSync(path)) process.loadEnvFile(path)
}

const source = process.env.OBSIDIAN_VAULT_PATH
if (!source || !existsSync(source)) {
  throw new Error("OBSIDIAN_VAULT_PATH must point to the local content vault")
}

const target = join(projectRoot, "content")
const temporaryRoot = mkdtempSync(join(tmpdir(), "shch-content-sync-"))
const stagedContent = join(temporaryRoot, "content")

const include = path => basename(path) !== ".DS_Store"

try {
  cpSync(source, stagedContent, { recursive: true, filter: include })

  const queue = [stagedContent]
  let markdownFiles = 0
  while (queue.length > 0) {
    const directory = queue.pop()
    for (const name of readdirSync(directory)) {
      const path = join(directory, name)
      if (statSync(path).isDirectory()) queue.push(path)
      else if (/\.(md|mdx)$/i.test(name)) markdownFiles += 1
    }
  }

  if (markdownFiles === 0) {
    throw new Error("Content snapshot contains no Markdown files")
  }

  rmSync(target, { recursive: true, force: true })
  renameSync(stagedContent, target)
  console.log(`Synced ${markdownFiles} Markdown files into content/`)
} finally {
  rmSync(temporaryRoot, { recursive: true, force: true })
}
