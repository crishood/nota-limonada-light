#!/usr/bin/env node
// Build script for Nota Limonada Light.
//
// Obsidian ships only manifest.json and theme.css to the user (see the
// Developer policies: themes must not load remote assets, and only
// those two files are attached to a GitHub release). That means any
// font file sitting in fonts/ never reaches the user unless it is
// inlined directly into theme.css as a base64 data URI.
//
// This script concatenates every src/*.css file in filename order,
// replaces each url("fonts/...") reference with its base64 data URI,
// and writes the result to theme.css at the repo root. Edit files in
// src/, never theme.css directly — it is a build artifact (even
// though it stays committed, since Obsidian reads it straight from
// the repo checkout at release time).
//
// Usage: node build.mjs

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, extname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = join(__dirname, "src");
const OUT_FILE = join(__dirname, "theme.css");

const MIME_BY_EXT = {
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};

function inlineFontUrls(css) {
  return css.replace(/url\((["'])(fonts\/[^"')]+\.(?:woff2|woff))\1\)/g, (match, quote, relPath) => {
    const ext = extname(relPath);
    const mime = MIME_BY_EXT[ext];
    if (!mime) {
      throw new Error(`Unrecognized font extension in ${relPath} — add it to MIME_BY_EXT.`);
    }
    const absPath = join(__dirname, relPath);
    const data = readFileSync(absPath).toString("base64");
    return `url(${quote}data:${mime};base64,${data}${quote})`;
  });
}

function build() {
  const files = readdirSync(SRC_DIR)
    .filter((f) => f.endsWith(".css"))
    .sort(); // 00-, 01-, 02-... prefixes control cascade order

  const parts = files.map((f) => {
    const raw = readFileSync(join(SRC_DIR, f), "utf8");
    return `/* ---- src/${f} ---- */\n${inlineFontUrls(raw)}`;
  });

  const banner = `/* Nota Limonada Light — GENERATED FILE, do not edit directly.\n   Source lives in src/*.css — edit there and run \`node build.mjs\`. */\n\n`;
  writeFileSync(OUT_FILE, banner + parts.join("\n\n"));

  const bytes = Buffer.byteLength(readFileSync(OUT_FILE));
  console.log(`Built theme.css from ${files.length} source files — ${(bytes / 1024).toFixed(1)} KB`);
}

build();
