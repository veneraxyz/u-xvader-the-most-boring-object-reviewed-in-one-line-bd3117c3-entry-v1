import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REVIEW =
  "The dustpan: sweeps up everything except the one thin line of dust it leaves behind every single time, like a receipt for a job half done.";

// The sealed scorer only accepts exactly one non-blank line of 1-200
// characters, so refuse to write anything that would fail the gate.
const lines = REVIEW.split("\n");
if (lines.length !== 1) {
  throw new Error(`review must be exactly one line, got ${lines.length}`);
}
if (REVIEW.trim().length === 0) {
  throw new Error("review must not be only whitespace");
}
if (REVIEW.length < 1 || REVIEW.length > 200) {
  throw new Error(`review must be 1-200 characters, got ${REVIEW.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), REVIEW, "utf8");
