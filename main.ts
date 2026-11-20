import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR || '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';

try {
  // Create output directory if it doesn't exist
  mkdirSync(outputDir, { recursive: true });

  // Copy VIDEO.json
  const sourcePath = join(botDir, 'VIDEO.json');
  const destPath = join(outputDir, 'VIDEO.json');
  copyFileSync(sourcePath, destPath);

  // Parse JSON and validate URL
  const data = JSON.parse(readFileSync(destPath, 'utf-8'));
  if (typeof data.url !== 'string') {
    process.exit(1);
  }

  process.exit(0);
} catch (err) {
  console.error(err);
  process.exit(1);
}