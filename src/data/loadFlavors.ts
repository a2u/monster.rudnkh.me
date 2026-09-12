import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Flavor } from "@/data/types";

const FLAVORS_DIR = path.join(process.cwd(), "content/flavors");

export function getFlavors(): Flavor[] {
  if (!fs.existsSync(FLAVORS_DIR)) return [];

  return fs
    .readdirSync(FLAVORS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => readFlavor(file))
    .sort((a, b) => b.capturedAt.localeCompare(a.capturedAt));
}

export function getFlavor(slug: string): Flavor | undefined {
  const file = `${slug}.md`;
  const fullPath = path.join(FLAVORS_DIR, file);
  if (!fs.existsSync(fullPath)) return undefined;
  return readFlavor(file);
}

export function getFlavorSlugs(): string[] {
  if (!fs.existsSync(FLAVORS_DIR)) return [];
  return fs
    .readdirSync(FLAVORS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

function readFlavor(file: string): Flavor {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(FLAVORS_DIR, file), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    name: asString(data.name, slug),
    description: content.trim() || asString(data.description),
    notes: asString(data.notes),
    foundAt: {
      lat: asNumber(data.lat),
      lng: asNumber(data.lng),
      place: asString(data.place),
    },
    capturedAt: asString(data.capturedAt ?? data.drunkAt),
    photo: asString(data.photo),
    accent: asString(data.accent, "#111111"),
  };
}

function asString(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString();
  }
  return fallback;
}

function asNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.trim().replace(",", "."));
    if (Number.isFinite(parsed)) return parsed;
  }
  return 0;
}

