import { readFileSync, writeFileSync } from 'node:fs';
// Shift RGBE scanlines half their width for a lossless 180-degree yaw.
const source = readFileSync(new URL('../public/images/XtraLights-15.hdr', import.meta.url));
const header = source.toString('ascii', 0, 4096).match(/^[+-]Y (\d+) [+-]X (\d+)\r?\n/m);
if (!header) throw new Error('Unsupported HDR header');
const height = Number(header[1]), width = Number(header[2]);
if (width % 2 || width < 8 || width > 32767) throw new Error('Unsupported HDR width');
let offset = header.index + header[0].length;
const chunks = [source.subarray(0, offset)];
for (let y = 0; y < height; y++) {
  if (source[offset++] !== 2 || source[offset++] !== 2 || source.readUInt16BE(offset) !== width) throw new Error('Expected RLE scanline');
  offset += 2;
  chunks.push(Buffer.from([2, 2, width >> 8, width & 255]));
  for (let channel = 0; channel < 4; channel++) {
    const row = Buffer.alloc(width);
    let x = 0;
    while (x < width) {
      const count = source[offset++];
      const length = count > 128 ? count - 128 : count;
      if (!length || x + length > width) throw new Error('Invalid HDR run');
      if (count > 128) row.fill(source[offset++], x, x + length);
      else { source.copy(row, x, offset, offset + length); offset += length; }
      x += length;
    }
    const rotated = Buffer.concat([row.subarray(width / 2), row.subarray(0, width / 2)]);
    for (let start = 0; start < width; start += 127) {
      const literal = rotated.subarray(start, Math.min(start + 127, width));
      chunks.push(Buffer.from([literal.length]), literal);
    }
  }
}
if (offset !== source.length) throw new Error('Unexpected trailing HDR data');
writeFileSync(new URL('../public/images/XtraLights-15-rotated-180.hdr', import.meta.url), Buffer.concat(chunks));
console.log(`Rotated ${width} x ${height} HDR environment 180 degrees.`);
