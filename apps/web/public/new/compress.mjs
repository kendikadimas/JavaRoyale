import sharp from 'sharp';

const files = [
  { in: 'gingerr.jpg', out: 'ginger_compressed.webp' },
  { in: 'honeyyy.jpg', out: 'honey_compressed.webp' },
  { in: 'limee.jpg', out: 'lime_compressed.webp' },
  { in: 'lemongrass.jpg', out: 'lemongrass_compressed.webp' },
  { in: 'palmsugar.jpg', out: 'palmsugar_compressed.webp' }
];

async function run() {
  for (const f of files) {
    try {
      await sharp(f.in)
        .resize({ width: 500 })
        .webp({ quality: 80 })
        .toFile(f.out);
      console.log(`Compressed ${f.in}`);
    } catch (e) {
      console.error(`Error on ${f.in}`, e);
    }
  }
}

run();
