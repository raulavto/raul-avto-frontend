import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

async function generateAutohubLogo() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });
  const page = await browser.newPage();
  const logoBase64 = fs
    .readFileSync(path.join(publicDir, 'autohub-logo-raw.png'))
    .toString('base64');

  await page.setContent(`
    <html><body style="margin:0;background:#000">
    <canvas id="c"></canvas>
    <script>
      window.done = false;
      const img = new Image();
      img.onload = () => {
        const c = document.getElementById('c');
        const ctx = c.getContext('2d');
        c.width = img.width;
        c.height = img.height;
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, c.width, c.height);
        for (let i = 0; i < data.data.length; i += 4) {
          const r = data.data[i];
          const g = data.data[i + 1];
          const b = data.data[i + 2];
          const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
          if (luminance < 35) {
            data.data[i + 3] = 0;
          } else {
            data.data[i] = 255;
            data.data[i + 1] = 255;
            data.data[i + 2] = 255;
            data.data[i + 3] = 255;
          }
        }
        ctx.putImageData(data, 0, 0);
        window.done = true;
      };
      img.src = 'data:image/png;base64,${logoBase64}';
    </script>
    </body></html>
  `);

  await page.waitForFunction('window.done === true');
  const canvas = await page.$('#c');
  await canvas.screenshot({
    path: path.join(publicDir, 'autohub-auction.png'),
    omitBackground: true,
  });

  await browser.close();
  console.log('Generated autohub-auction.png');
}

generateAutohubLogo().catch((error) => {
  console.error(error);
  process.exit(1);
});
