import { writeFileSync } from 'node:fs';

// Initial front view is +Z; +Y is up. Light grazes the face from upper left.
const width = 512, height = 256;
const normalize = (v) => v.map((n) => n / Math.hypot(...v));
const key = normalize([-1.4, 1.5, 0.8]);
const fill = normalize([1, 0.4, 1.5]);
const pixels = Buffer.alloc(width * height * 4);
for (let y = 0; y < height; y++) {
  const latitude = Math.PI * (0.5 - (y + 0.5) / height);
  for (let x = 0; x < width; x++) {
    const longitude = 2 * Math.PI * ((x + 0.5) / width - 0.5);
    const direction = [Math.cos(latitude) * Math.cos(longitude), Math.sin(latitude), Math.cos(latitude) * Math.sin(longitude)];
    const lobe = (axis, sharpness) => Math.exp(sharpness * (direction.reduce((sum, n, i) => sum + n * axis[i], 0) - 1));
    const light = 0.12 + 22 * lobe(key, 55) + 0.35 * lobe(fill, 5);
    const exponent = Math.floor(Math.log2(light)) + 1;
    const mantissa = Math.floor(light * 2 ** (8 - exponent));
    const offset = (y * width + x) * 4;
    pixels[offset] = pixels[offset + 1] = pixels[offset + 2] = mantissa;
    pixels[offset + 3] = exponent + 128;
  }
}
writeFileSync(new URL('../public/images/upper-left-studio.hdr', import.meta.url), Buffer.concat([
  Buffer.from(`#?RADIANCE\nFORMAT=32-bit_rle_rgbe\n\n-Y ${height} +X ${width}\n`), pixels,
]));
