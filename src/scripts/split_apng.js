const fs = require('fs');
const path = require('path');

const inputPath = process.argv[2];
const outputDir = process.argv[3];

if (!inputPath || !outputDir) {
  console.log('Usage: node split_apng.js <input_path> <output_dir>');
  process.exit(1);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const buffer = fs.readFileSync(inputPath);

// PNG Signature
const SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!buffer.slice(0, 8).equals(SIGNATURE)) {
  console.error('Not a valid PNG file');
  process.exit(1);
}

const chunks = [];
let offset = 8;

while (offset < buffer.length) {
  const length = buffer.readUInt32BE(offset);
  const type = buffer.slice(offset + 4, offset + 8).toString();
  const data = buffer.slice(offset + 8, offset + 8 + length);
  const crc = buffer.slice(offset + 8 + length, offset + 12 + length);
  
  chunks.push({ length, type, data, crc });
  offset += 12 + length;
  
  if (type === 'IEND') break;
}

const ihdrChunk = chunks.find(c => c.type === 'IHDR');
const acTlChunk = chunks.find(c => c.type === 'acTL');

if (!acTlChunk) {
  console.error('Not an APNG file');
  process.exit(1);
}

const numFrames = acTlChunk.data.readUInt32BE(0);
console.log(`Found ${numFrames} frames`);

let frameIndex = 0;
let currentFrameData = [];
let currentFrameIhdr = null;

// Helper to calculate CRC32
function crc32(buffer) {
  let c = 0xffffffff;
  const table = [];
  for (let n = 0; n < 256; n++) {
    let k = n;
    for (let m = 0; m < 8; m++) {
      k = (k & 1) ? (0xedb88320 ^ (k >>> 1)) : (k >>> 1);
    }
    table[n] = k;
  }
  for (let i = 0; i < buffer.length; i++) {
    c = table[(c ^ buffer[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function writeChunk(type, data) {
  const lengthBuf = Buffer.alloc(4);
  lengthBuf.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type);
  const crcInput = Buffer.concat([typeBuf, data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(crcInput), 0);
  return Buffer.concat([lengthBuf, typeBuf, data, crcBuf]);
}

chunks.forEach((chunk) => {
  if (chunk.type === 'fcTL') {
    // Save previous frame
    if (currentFrameData.length > 0) {
      const frameBuffer = Buffer.concat([
        SIGNATURE,
        writeChunk('IHDR', currentFrameIhdr),
        ...currentFrameData,
        writeChunk('IEND', Buffer.alloc(0))
      ]);
      fs.writeFileSync(path.join(outputDir, `frame${frameIndex}.png`), frameBuffer);
      console.log(`Saved frame ${frameIndex}`);
      frameIndex++;
    }
    
    // Start new frame
    const width = chunk.data.readUInt32BE(4);
    const height = chunk.data.readUInt32BE(8);
    
    // Construct IHDR for this frame
    currentFrameIhdr = Buffer.from(ihdrChunk.data);
    currentFrameIhdr.writeUInt32BE(width, 0);
    currentFrameIhdr.writeUInt32BE(height, 4);
    
    currentFrameData = [];
  } else if (chunk.type === 'fdAT') {
    // fdAT frame data follows 4-byte sequence number
    currentFrameData.push(writeChunk('IDAT', chunk.data.slice(4)));
  } else if (chunk.type === 'IDAT') {
    // The first IDAT is frame 0 if no fcTL preceded it or it is the first frame
    // But in APNG, if frame 0 is animated, it should have a fcTL.
    // Usually, the first IDAT is frame 0.
    if (frameIndex === 0 && currentFrameData.length === 0) {
        currentFrameIhdr = ihdrChunk.data;
        currentFrameData.push(writeChunk('IDAT', chunk.data));
    }
  }
});

// Save the very last frame
if (currentFrameData.length > 0) {
    const frameBuffer = Buffer.concat([
      SIGNATURE,
      writeChunk('IHDR', currentFrameIhdr),
      ...currentFrameData,
      writeChunk('IEND', Buffer.alloc(0))
    ]);
    fs.writeFileSync(path.join(outputDir, `frame${frameIndex}.png`), frameBuffer);
    console.log(`Saved frame ${frameIndex}`);
}
