import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

// Scroll to life section
await page.evaluate(() => {
  const el = document.querySelector('[data-section="life"]');
  if (el) el.scrollIntoView({ behavior: 'instant' });
});

// Wait for images and sticky note animations to settle
await page.waitForTimeout(2500);

const outPath = path.join(__dirname, 'life_section_1440.png');
const section = page.locator('[data-section="life"]');
await section.screenshot({ path: outPath });
await browser.close();
console.log('Saved:', outPath);
