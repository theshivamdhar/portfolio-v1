import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });

await page.setContent(`
  <!DOCTYPE html>
  <html><body>
  <video id="v" src="http://localhost:5173/images/life-hackathon.mp4" preload="metadata" style="display:none"></video>
  </body></html>
`);

const dims = await page.evaluate(() => {
  return new Promise((resolve) => {
    const v = document.getElementById('v');
    v.onloadedmetadata = () => resolve({ w: v.videoWidth, h: v.videoHeight, dur: Math.round(v.duration) });
    v.onerror = () => resolve({ error: 'load error', w: 0, h: 0 });
    setTimeout(() => resolve({ timeout: true, w: v.videoWidth, h: v.videoHeight }), 5000);
  });
});

console.log('Video info:', JSON.stringify(dims));
await browser.close();
