#!/usr/bin/env node
/**
 * Prepares the background print used by the Cut paper theme from Doug's painting
 * of the record shelf (src/assets/art/record-shelf.jpg): greyscale, a little
 * more contrast, two sizes. The site multiplies it onto the page colour.
 * Re-run only if the painting or the treatment changes.
 */
import sharp from 'sharp';

const art = (name) => new URL(`../src/assets/art/${name}`, import.meta.url).pathname;

for (const [width, quality] of [[1600, 58], [900, 56]]) {
  const info = await sharp(art('record-shelf.jpg'))
    .resize({ width })
    .grayscale()
    .linear(1.35, -(0.175 * 255)) // contrast 1.35 around mid-grey
    .linear(1.15, 0) // brightness 1.15
    .webp({ quality, effort: 6 })
    .toFile(art(`record-shelf-print-${width}.webp`));
  console.log(`record-shelf-print-${width}.webp  ${Math.round(info.size / 1024)} kB`);
}
