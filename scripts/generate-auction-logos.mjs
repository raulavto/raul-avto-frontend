import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

async function generateLogos() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });
  const page = await browser.newPage();

  const carmaxSvg = fs
    .readFileSync(path.join(publicDir, 'carmax-auction.svg'), 'utf8')
    .replace(/#053361/g, '#FFFFFF');

  await page.setViewport({ width: 400, height: 120, deviceScaleFactor: 2 });
  await page.setContent(`
    <html><body style="margin:0;background:#000;display:flex;align-items:center;justify-content:center;min-height:100vh">
    ${carmaxSvg}
    </body></html>
  `);

  const carmaxEl = await page.$('svg');
  await carmaxEl.screenshot({
    path: path.join(publicDir, 'carmax-auction.png'),
    omitBackground: true,
  });

  const encarBase64 = fs
    .readFileSync(path.join(publicDir, 'encar-brand.jpg'))
    .toString('base64');

  await page.setContent(`
    <html><body style="margin:0;background:#000">
    <canvas id="c"></canvas>
    <script>
      window.done = false;
      const img = new Image();
      img.onload = () => {
        const cropH = Math.floor(img.height * 0.62);
        const c = document.getElementById('c');
        const ctx = c.getContext('2d');
        c.width = img.width;
        c.height = cropH;
        ctx.drawImage(img, 0, 0, img.width, cropH, 0, 0, img.width, cropH);
        const data = ctx.getImageData(0, 0, c.width, c.height);
        for (let i = 0; i < data.data.length; i += 4) {
          const r = data.data[i];
          const g = data.data[i + 1];
          const b = data.data[i + 2];
          if (r > 140 && g < 110 && b < 110 && r > g + 30) {
            data.data[i] = 255;
            data.data[i + 1] = 255;
            data.data[i + 2] = 255;
            data.data[i + 3] = 255;
          } else {
            data.data[i + 3] = 0;
          }
        }
        ctx.putImageData(data, 0, 0);
        window.done = true;
      };
      img.src = 'data:image/jpeg;base64,${encarBase64}';
    </script>
    </body></html>
  `);

  await page.waitForFunction('window.done === true');
  const encarEl = await page.$('#c');
  await encarEl.screenshot({
    path: path.join(publicDir, 'encar-auction.png'),
    omitBackground: true,
  });

  await browser.close();
  console.log('Generated carmax-auction.png and encar-auction.png');
}

generateLogos().catch((error) => {
  console.error(error);
  process.exit(1);
});
