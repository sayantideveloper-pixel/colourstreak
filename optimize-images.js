const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// All images used on the landing page that need optimization
const imageTasks = [
  // Hero / banner section WebP images
  { src: 'newimg/webpimg/Girl-min.webp', quality: 65 },
  { src: 'newimg/webpimg/custombnr.webp', quality: 65 },

  // Service section WebP images (large, 131-184KB each)
  { src: 'newimg/webpimg/Graphic.webp', quality: 55 },
  { src: 'newimg/webpimg/Digital MArketing.webp', quality: 55 },
  { src: 'newimg/webpimg/Web-min.webp', quality: 55 },
  { src: 'newimg/webpimg/Signage.webp', quality: 55 },
  { src: 'newimg/webpimg/Digital Print.webp', quality: 55 },
  { src: 'newimg/webpimg/interior design.webp', quality: 55 },

  // About section WebP images
  { src: 'newimg/webpimg/thin.webp', quality: 55 },
  { src: 'newimg/webpimg/wide.webp', quality: 55 },
  { src: 'newimg/webpimg/customerreviews.webp', quality: 55 },

  // Stack cards JPG images (large, 197-355KB each) → convert to WebP
  { src: 'newimg/stackcards/Graphic.jpg', quality: 55, toWebp: true },
  { src: 'newimg/stackcards/Digital MArketing.jpg', quality: 55, toWebp: true },
  { src: 'newimg/stackcards/Web-min.jpg', quality: 55, toWebp: true },
  { src: 'newimg/stackcards/Signage.jpg', quality: 55, toWebp: true },
  { src: 'newimg/stackcards/Digital Print.jpg', quality: 55, toWebp: true },
  { src: 'newimg/stackcards/interior design.jpg', quality: 55, toWebp: true },

  // Why choose section JPG images (101-221KB each) → compress
  { src: 'newimg/whychoose/startegic.jpg', quality: 55, toWebp: true },
  { src: 'newimg/whychoose/visualstory.jpg', quality: 55, toWebp: true },
  { src: 'newimg/whychoose/uiux.jpg', quality: 55, toWebp: true },
  { src: 'newimg/whychoose/packaging.jpg', quality: 55, toWebp: true },
  { src: 'newimg/whychoose/signage.jpg', quality: 55, toWebp: true },
  { src: 'newimg/whychoose/campaign.jpg', quality: 55, toWebp: true },

  // Hero background JPG
  { src: 'images/demo-branding-studio-bg-01.jpg', quality: 55, toWebp: true },
];

const basePath = __dirname;

async function optimizeImage(task) {
  const inputPath = path.join(basePath, task.src);
  
  if (!fs.existsSync(inputPath)) {
    console.log(`  SKIP (not found): ${task.src}`);
    return;
  }

  const originalSize = fs.statSync(inputPath).size;
  const originalKB = Math.round(originalSize / 1024);

  try {
    if (task.toWebp) {
      // Convert JPG to WebP (save alongside original)
      const outputPath = inputPath.replace(/\.jpe?g$/i, '.webp');
      await sharp(inputPath)
        .webp({ quality: task.quality, effort: 6 })
        .toFile(outputPath);

      const newSize = fs.statSync(outputPath).size;
      const newKB = Math.round(newSize / 1024);
      const saved = Math.round((1 - newSize / originalSize) * 100);
      console.log(`  OK: ${task.src} → .webp  ${originalKB}KB → ${newKB}KB (${saved}% saved)`);
    } else {
      // Compress WebP in-place (write to temp, then overwrite)
      const tempPath = inputPath + '.tmp';
      await sharp(inputPath)
        .webp({ quality: task.quality, effort: 6 })
        .toFile(tempPath);

      const newSize = fs.statSync(tempPath).size;
      const newKB = Math.round(newSize / 1024);
      const saved = Math.round((1 - newSize / originalSize) * 100);

      // Only replace if actually smaller
      if (newSize < originalSize) {
        fs.unlinkSync(inputPath);
        fs.renameSync(tempPath, inputPath);
        console.log(`  OK: ${task.src}  ${originalKB}KB → ${newKB}KB (${saved}% saved)`);
      } else {
        fs.unlinkSync(tempPath);
        console.log(`  SKIP (already optimal): ${task.src}  ${originalKB}KB`);
      }
    }
  } catch (err) {
    console.log(`  ERROR: ${task.src} - ${err.message}`);
  }
}

async function main() {
  console.log('=== Image Optimization ===\n');
  
  for (const task of imageTasks) {
    await optimizeImage(task);
  }
  
  console.log('\n=== Done! ===');
}

main();
