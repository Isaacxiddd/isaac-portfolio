import fs from 'fs';
import path from 'path';
import https from 'https';

const outDir = path.resolve('public', 'logos');
fs.mkdirSync(outDir, { recursive: true });

const logos = {
  python: 'https://www.vectorlogo.zone/logos/python/python-icon.png',
  html5: 'https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.png',
  css3: 'https://www.vectorlogo.zone/logos/w3_css/w3_css-official.svg', // svg ok
  tailwindcss: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.png',
  react: 'https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.png',
  typescript: 'https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.png',
  nodejs: 'https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.png',
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (r2) => r2.pipe(file).on('finish', resolve));
        return;
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

for (const [name, url] of Object.entries(logos)) {
  const ext = path.extname(new URL(url).pathname) || '.png';
  const dest = path.join(outDir, `${name}${ext}`);
  console.log('Downloading', name, '->', dest);
  await download(url, dest);
}
console.log('Logos downloaded to /public/logos');
