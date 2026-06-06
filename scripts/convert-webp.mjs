import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname, basename } from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = join(__dirname, "../src/assets/screenshots");

const files = await readdir(SCREENSHOTS_DIR);
const pngs = files.filter(f => extname(f) === ".png");

let saved = 0;
for (const file of pngs) {
  const input = join(SCREENSHOTS_DIR, file);
  const output = join(SCREENSHOTS_DIR, basename(file, ".png") + ".webp");
  const before = (await stat(input)).size;
  await sharp(input).webp({ quality: 82 }).toFile(output);
  const after = (await stat(output)).size;
  const pct = Math.round((1 - after / before) * 100);
  saved += before - after;
  console.log(`✓ ${file} → ${basename(output)}  ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB  (-${pct}%)`);
}
console.log(`\nTotal ahorrado: ${(saved / 1024 / 1024).toFixed(2)} MB`);
