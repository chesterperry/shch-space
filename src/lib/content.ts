import type { CollectionEntry } from "astro:content"

export type SiteEntry = CollectionEntry<"site">

export const byOrder = (a: SiteEntry, b: SiteEntry) =>
  a.data.order - b.data.order

export const isPublished = (entry: SiteEntry) =>
  entry.data.status === "published"

export const isRussian = (entry: SiteEntry) => entry.data.locale === "ru"

export const excerpt = (body: string | undefined, maxLength = 180) => {
  const plainText = (body || "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`~|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()

  if (plainText.length <= maxLength) return plainText

  const shortened = plainText.slice(0, maxLength + 1)
  const lastSpace = shortened.lastIndexOf(" ")
  return `${shortened.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`
}
