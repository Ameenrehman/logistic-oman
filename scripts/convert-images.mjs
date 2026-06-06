import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = 'E:/logistic-website';
const outputDir = 'E:/logistic-website/public/images';
const sizes = [1920, 1280, 640];
const formats = ['webp', 'avif'];

const images = [
  'cargo-door-opening.jpeg',
  'cold-chain-trailer-interrior.jpeg',
  'oman-network-map.jpeg'
];

async function convert() {
  for (const img of images) {
    const inputPath = path.join(inputDir, img);
    const baseName = path.parse(img).name;
    
    for (const size of sizes) {
      for (const format of formats) {
        const outputName = `${baseName}-${size}w.${format}`;
        const outputPath = path.join(outputDir, outputName);
        
        await sharp(inputPath)
          .resize(size, null, { withoutEnlargement: true })
          .toFormat(format, { quality: 80 })
          .toFile(outputPath);
        
        console.log(`Created: ${outputName}`);
      }
    }
    
    // Also copy original as fallback
    const origExt = path.parse(img).ext;
    const origOutput = `${baseName}${origExt}`;
    fs.copyFileSync(inputPath, path.join(outputDir, origOutput));
    console.log(`Copied: ${origOutput}`);
  }
  console.log('All conversions complete!');
}

convert().catch(console.error);