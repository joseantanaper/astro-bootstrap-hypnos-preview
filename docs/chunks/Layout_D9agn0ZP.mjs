import { c as createAstro, a as createComponent, r as renderTemplate, d as addAttribute, m as maybeRenderHead, s as spreadAttributes, b as renderComponent, F as Fragment, f as renderUniqueStylesheet, g as renderScriptElement, h as createHeadAndContent, u as unescapeHTML, e as renderSlot, i as renderHead } from './astro/server_BXNPVPNM.mjs';
import 'kleur/colors';
/* empty css                         */
import 'clsx';
import { A as AstroError, E as ExpectedImageOptions, f as ExpectedImage, r as resolveSrc, i as isRemoteImage, F as FailedToFetchRemoteImageDimensions, g as isESMImportedImage, h as isLocalService, D as DEFAULT_HASH_PROPS, j as InvalidImageService, k as ImageMissingAlt, U as UnknownContentCollectionError } from './astro/assets-service_CaHlsx__.mjs';
import { prependForwardSlash } from '@astrojs/internal-helpers/path';
import * as mime from 'mrmime';
import 'openmeteo';
import pLimit from 'p-limit';

const neuro720 = "/astro-bootstrap-hypnos-preview/astro/neuro03.720.4rwNpPCy.mp4";

const neuro360 = "/astro-bootstrap-hypnos-preview/astro/neuro03.360.C8n2sogs.mp4";

const app = {
  config: {
    title: "HYPNOS",
    subtitle: "Badalona"
  }
};

const $$Astro$h = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$ViewTransitions = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/node_modules/astro/components/ViewTransitions.astro", void 0);

const decoder = new TextDecoder();
const toUTF8String = (input, start = 0, end = input.length) => decoder.decode(input.slice(start, end));
const toHexString = (input, start = 0, end = input.length) => input.slice(start, end).reduce((memo, i) => memo + ("0" + i.toString(16)).slice(-2), "");
const readInt16LE = (input, offset = 0) => {
  const val = input[offset] + input[offset + 1] * 2 ** 8;
  return val | (val & 2 ** 15) * 131070;
};
const readUInt16BE = (input, offset = 0) => input[offset] * 2 ** 8 + input[offset + 1];
const readUInt16LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8;
const readUInt24LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16;
const readInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + (input[offset + 3] << 24);
const readUInt32BE = (input, offset = 0) => input[offset] * 2 ** 24 + input[offset + 1] * 2 ** 16 + input[offset + 2] * 2 ** 8 + input[offset + 3];
const readUInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + input[offset + 3] * 2 ** 24;
const methods = {
  readUInt16BE,
  readUInt16LE,
  readUInt32BE,
  readUInt32LE
};
function readUInt(input, bits, offset, isBigEndian) {
  offset = offset || 0;
  const endian = isBigEndian ? "BE" : "LE";
  const methodName = "readUInt" + bits + endian;
  return methods[methodName](input, offset);
}
function readBox(buffer, offset) {
  if (buffer.length - offset < 4) return;
  const boxSize = readUInt32BE(buffer, offset);
  if (buffer.length - offset < boxSize) return;
  return {
    name: toUTF8String(buffer, 4 + offset, 8 + offset),
    offset,
    size: boxSize
  };
}
function findBox(buffer, boxName, offset) {
  while (offset < buffer.length) {
    const box = readBox(buffer, offset);
    if (!box) break;
    if (box.name === boxName) return box;
    offset += box.size;
  }
}

const BMP = {
  validate: (input) => toUTF8String(input, 0, 2) === "BM",
  calculate: (input) => ({
    height: Math.abs(readInt32LE(input, 22)),
    width: readUInt32LE(input, 18)
  })
};

const TYPE_ICON = 1;
const SIZE_HEADER$1 = 2 + 2 + 2;
const SIZE_IMAGE_ENTRY = 1 + 1 + 1 + 1 + 2 + 2 + 4 + 4;
function getSizeFromOffset(input, offset) {
  const value = input[offset];
  return value === 0 ? 256 : value;
}
function getImageSize$1(input, imageIndex) {
  const offset = SIZE_HEADER$1 + imageIndex * SIZE_IMAGE_ENTRY;
  return {
    height: getSizeFromOffset(input, offset + 1),
    width: getSizeFromOffset(input, offset)
  };
}
const ICO = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0) return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_ICON;
  },
  calculate(input) {
    const nbImages = readUInt16LE(input, 4);
    const imageSize = getImageSize$1(input, 0);
    if (nbImages === 1) return imageSize;
    const imgs = [imageSize];
    for (let imageIndex = 1; imageIndex < nbImages; imageIndex += 1) {
      imgs.push(getImageSize$1(input, imageIndex));
    }
    return {
      height: imageSize.height,
      images: imgs,
      width: imageSize.width
    };
  }
};

const TYPE_CURSOR = 2;
const CUR = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0) return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_CURSOR;
  },
  calculate: (input) => ICO.calculate(input)
};

const DDS = {
  validate: (input) => readUInt32LE(input, 0) === 542327876,
  calculate: (input) => ({
    height: readUInt32LE(input, 12),
    width: readUInt32LE(input, 16)
  })
};

const gifRegexp = /^GIF8[79]a/;
const GIF = {
  validate: (input) => gifRegexp.test(toUTF8String(input, 0, 6)),
  calculate: (input) => ({
    height: readUInt16LE(input, 8),
    width: readUInt16LE(input, 6)
  })
};

const brandMap = {
  avif: "avif",
  mif1: "heif",
  msf1: "heif",
  // hief-sequence
  heic: "heic",
  heix: "heic",
  hevc: "heic",
  // heic-sequence
  hevx: "heic"
  // heic-sequence
};
function detectBrands(buffer, start, end) {
  let brandsDetected = {};
  for (let i = start; i <= end; i += 4) {
    const brand = toUTF8String(buffer, i, i + 4);
    if (brand in brandMap) {
      brandsDetected[brand] = 1;
    }
  }
  if ("avif" in brandsDetected) {
    return "avif";
  } else if ("heic" in brandsDetected || "heix" in brandsDetected || "hevc" in brandsDetected || "hevx" in brandsDetected) {
    return "heic";
  } else if ("mif1" in brandsDetected || "msf1" in brandsDetected) {
    return "heif";
  }
}
const HEIF = {
  validate(buffer) {
    const ftype = toUTF8String(buffer, 4, 8);
    const brand = toUTF8String(buffer, 8, 12);
    return "ftyp" === ftype && brand in brandMap;
  },
  calculate(buffer) {
    const metaBox = findBox(buffer, "meta", 0);
    const iprpBox = metaBox && findBox(buffer, "iprp", metaBox.offset + 12);
    const ipcoBox = iprpBox && findBox(buffer, "ipco", iprpBox.offset + 8);
    const ispeBox = ipcoBox && findBox(buffer, "ispe", ipcoBox.offset + 8);
    if (ispeBox) {
      return {
        height: readUInt32BE(buffer, ispeBox.offset + 16),
        width: readUInt32BE(buffer, ispeBox.offset + 12),
        type: detectBrands(buffer, 8, metaBox.offset)
      };
    }
    throw new TypeError("Invalid HEIF, no size found");
  }
};

const SIZE_HEADER = 4 + 4;
const FILE_LENGTH_OFFSET = 4;
const ENTRY_LENGTH_OFFSET = 4;
const ICON_TYPE_SIZE = {
  ICON: 32,
  "ICN#": 32,
  // m => 16 x 16
  "icm#": 16,
  icm4: 16,
  icm8: 16,
  // s => 16 x 16
  "ics#": 16,
  ics4: 16,
  ics8: 16,
  is32: 16,
  s8mk: 16,
  icp4: 16,
  // l => 32 x 32
  icl4: 32,
  icl8: 32,
  il32: 32,
  l8mk: 32,
  icp5: 32,
  ic11: 32,
  // h => 48 x 48
  ich4: 48,
  ich8: 48,
  ih32: 48,
  h8mk: 48,
  // . => 64 x 64
  icp6: 64,
  ic12: 32,
  // t => 128 x 128
  it32: 128,
  t8mk: 128,
  ic07: 128,
  // . => 256 x 256
  ic08: 256,
  ic13: 256,
  // . => 512 x 512
  ic09: 512,
  ic14: 512,
  // . => 1024 x 1024
  ic10: 1024
};
function readImageHeader(input, imageOffset) {
  const imageLengthOffset = imageOffset + ENTRY_LENGTH_OFFSET;
  return [
    toUTF8String(input, imageOffset, imageLengthOffset),
    readUInt32BE(input, imageLengthOffset)
  ];
}
function getImageSize(type) {
  const size = ICON_TYPE_SIZE[type];
  return { width: size, height: size, type };
}
const ICNS = {
  validate: (input) => toUTF8String(input, 0, 4) === "icns",
  calculate(input) {
    const inputLength = input.length;
    const fileLength = readUInt32BE(input, FILE_LENGTH_OFFSET);
    let imageOffset = SIZE_HEADER;
    let imageHeader = readImageHeader(input, imageOffset);
    let imageSize = getImageSize(imageHeader[0]);
    imageOffset += imageHeader[1];
    if (imageOffset === fileLength) return imageSize;
    const result = {
      height: imageSize.height,
      images: [imageSize],
      width: imageSize.width
    };
    while (imageOffset < fileLength && imageOffset < inputLength) {
      imageHeader = readImageHeader(input, imageOffset);
      imageSize = getImageSize(imageHeader[0]);
      imageOffset += imageHeader[1];
      result.images.push(imageSize);
    }
    return result;
  }
};

const J2C = {
  // TODO: this doesn't seem right. SIZ marker doesn't have to be right after the SOC
  validate: (input) => toHexString(input, 0, 4) === "ff4fff51",
  calculate: (input) => ({
    height: readUInt32BE(input, 12),
    width: readUInt32BE(input, 8)
  })
};

const JP2 = {
  validate(input) {
    if (readUInt32BE(input, 4) !== 1783636e3 || readUInt32BE(input, 0) < 1) return false;
    const ftypBox = findBox(input, "ftyp", 0);
    if (!ftypBox) return false;
    return readUInt32BE(input, ftypBox.offset + 4) === 1718909296;
  },
  calculate(input) {
    const jp2hBox = findBox(input, "jp2h", 0);
    const ihdrBox = jp2hBox && findBox(input, "ihdr", jp2hBox.offset + 8);
    if (ihdrBox) {
      return {
        height: readUInt32BE(input, ihdrBox.offset + 8),
        width: readUInt32BE(input, ihdrBox.offset + 12)
      };
    }
    throw new TypeError("Unsupported JPEG 2000 format");
  }
};

const EXIF_MARKER = "45786966";
const APP1_DATA_SIZE_BYTES = 2;
const EXIF_HEADER_BYTES = 6;
const TIFF_BYTE_ALIGN_BYTES = 2;
const BIG_ENDIAN_BYTE_ALIGN = "4d4d";
const LITTLE_ENDIAN_BYTE_ALIGN = "4949";
const IDF_ENTRY_BYTES = 12;
const NUM_DIRECTORY_ENTRIES_BYTES = 2;
function isEXIF(input) {
  return toHexString(input, 2, 6) === EXIF_MARKER;
}
function extractSize(input, index) {
  return {
    height: readUInt16BE(input, index),
    width: readUInt16BE(input, index + 2)
  };
}
function extractOrientation(exifBlock, isBigEndian) {
  const idfOffset = 8;
  const offset = EXIF_HEADER_BYTES + idfOffset;
  const idfDirectoryEntries = readUInt(exifBlock, 16, offset, isBigEndian);
  for (let directoryEntryNumber = 0; directoryEntryNumber < idfDirectoryEntries; directoryEntryNumber++) {
    const start = offset + NUM_DIRECTORY_ENTRIES_BYTES + directoryEntryNumber * IDF_ENTRY_BYTES;
    const end = start + IDF_ENTRY_BYTES;
    if (start > exifBlock.length) {
      return;
    }
    const block = exifBlock.slice(start, end);
    const tagNumber = readUInt(block, 16, 0, isBigEndian);
    if (tagNumber === 274) {
      const dataFormat = readUInt(block, 16, 2, isBigEndian);
      if (dataFormat !== 3) {
        return;
      }
      const numberOfComponents = readUInt(block, 32, 4, isBigEndian);
      if (numberOfComponents !== 1) {
        return;
      }
      return readUInt(block, 16, 8, isBigEndian);
    }
  }
}
function validateExifBlock(input, index) {
  const exifBlock = input.slice(APP1_DATA_SIZE_BYTES, index);
  const byteAlign = toHexString(
    exifBlock,
    EXIF_HEADER_BYTES,
    EXIF_HEADER_BYTES + TIFF_BYTE_ALIGN_BYTES
  );
  const isBigEndian = byteAlign === BIG_ENDIAN_BYTE_ALIGN;
  const isLittleEndian = byteAlign === LITTLE_ENDIAN_BYTE_ALIGN;
  if (isBigEndian || isLittleEndian) {
    return extractOrientation(exifBlock, isBigEndian);
  }
}
function validateInput(input, index) {
  if (index > input.length) {
    throw new TypeError("Corrupt JPG, exceeded buffer limits");
  }
}
const JPG = {
  validate: (input) => toHexString(input, 0, 2) === "ffd8",
  calculate(input) {
    input = input.slice(4);
    let orientation;
    let next;
    while (input.length) {
      const i = readUInt16BE(input, 0);
      if (input[i] !== 255) {
        input = input.slice(1);
        continue;
      }
      if (isEXIF(input)) {
        orientation = validateExifBlock(input, i);
      }
      validateInput(input, i);
      next = input[i + 1];
      if (next === 192 || next === 193 || next === 194) {
        const size = extractSize(input, i + 5);
        if (!orientation) {
          return size;
        }
        return {
          height: size.height,
          orientation,
          width: size.width
        };
      }
      input = input.slice(i + 2);
    }
    throw new TypeError("Invalid JPG, no size found");
  }
};

const KTX = {
  validate: (input) => {
    const signature = toUTF8String(input, 1, 7);
    return ["KTX 11", "KTX 20"].includes(signature);
  },
  calculate: (input) => {
    const type = input[5] === 49 ? "ktx" : "ktx2";
    const offset = type === "ktx" ? 36 : 20;
    return {
      height: readUInt32LE(input, offset + 4),
      width: readUInt32LE(input, offset),
      type
    };
  }
};

const pngSignature = "PNG\r\n\n";
const pngImageHeaderChunkName = "IHDR";
const pngFriedChunkName = "CgBI";
const PNG = {
  validate(input) {
    if (pngSignature === toUTF8String(input, 1, 8)) {
      let chunkName = toUTF8String(input, 12, 16);
      if (chunkName === pngFriedChunkName) {
        chunkName = toUTF8String(input, 28, 32);
      }
      if (chunkName !== pngImageHeaderChunkName) {
        throw new TypeError("Invalid PNG");
      }
      return true;
    }
    return false;
  },
  calculate(input) {
    if (toUTF8String(input, 12, 16) === pngFriedChunkName) {
      return {
        height: readUInt32BE(input, 36),
        width: readUInt32BE(input, 32)
      };
    }
    return {
      height: readUInt32BE(input, 20),
      width: readUInt32BE(input, 16)
    };
  }
};

const PNMTypes = {
  P1: "pbm/ascii",
  P2: "pgm/ascii",
  P3: "ppm/ascii",
  P4: "pbm",
  P5: "pgm",
  P6: "ppm",
  P7: "pam",
  PF: "pfm"
};
const handlers = {
  default: (lines) => {
    let dimensions = [];
    while (lines.length > 0) {
      const line = lines.shift();
      if (line[0] === "#") {
        continue;
      }
      dimensions = line.split(" ");
      break;
    }
    if (dimensions.length === 2) {
      return {
        height: parseInt(dimensions[1], 10),
        width: parseInt(dimensions[0], 10)
      };
    } else {
      throw new TypeError("Invalid PNM");
    }
  },
  pam: (lines) => {
    const size = {};
    while (lines.length > 0) {
      const line = lines.shift();
      if (line.length > 16 || line.charCodeAt(0) > 128) {
        continue;
      }
      const [key, value] = line.split(" ");
      if (key && value) {
        size[key.toLowerCase()] = parseInt(value, 10);
      }
      if (size.height && size.width) {
        break;
      }
    }
    if (size.height && size.width) {
      return {
        height: size.height,
        width: size.width
      };
    } else {
      throw new TypeError("Invalid PAM");
    }
  }
};
const PNM = {
  validate: (input) => toUTF8String(input, 0, 2) in PNMTypes,
  calculate(input) {
    const signature = toUTF8String(input, 0, 2);
    const type = PNMTypes[signature];
    const lines = toUTF8String(input, 3).split(/[\r\n]+/);
    const handler = handlers[type] || handlers.default;
    return handler(lines);
  }
};

const PSD = {
  validate: (input) => toUTF8String(input, 0, 4) === "8BPS",
  calculate: (input) => ({
    height: readUInt32BE(input, 14),
    width: readUInt32BE(input, 18)
  })
};

const svgReg = /<svg\s([^>"']|"[^"]*"|'[^']*')*>/;
const extractorRegExps = {
  height: /\sheight=(['"])([^%]+?)\1/,
  root: svgReg,
  viewbox: /\sviewBox=(['"])(.+?)\1/i,
  width: /\swidth=(['"])([^%]+?)\1/
};
const INCH_CM = 2.54;
const units = {
  in: 96,
  cm: 96 / INCH_CM,
  em: 16,
  ex: 8,
  m: 96 / INCH_CM * 100,
  mm: 96 / INCH_CM / 10,
  pc: 96 / 72 / 12,
  pt: 96 / 72,
  px: 1
};
const unitsReg = new RegExp(
  `^([0-9.]+(?:e\\d+)?)(${Object.keys(units).join("|")})?$`
);
function parseLength(len) {
  const m = unitsReg.exec(len);
  if (!m) {
    return void 0;
  }
  return Math.round(Number(m[1]) * (units[m[2]] || 1));
}
function parseViewbox(viewbox) {
  const bounds = viewbox.split(" ");
  return {
    height: parseLength(bounds[3]),
    width: parseLength(bounds[2])
  };
}
function parseAttributes(root) {
  const width = root.match(extractorRegExps.width);
  const height = root.match(extractorRegExps.height);
  const viewbox = root.match(extractorRegExps.viewbox);
  return {
    height: height && parseLength(height[2]),
    viewbox: viewbox && parseViewbox(viewbox[2]),
    width: width && parseLength(width[2])
  };
}
function calculateByDimensions(attrs) {
  return {
    height: attrs.height,
    width: attrs.width
  };
}
function calculateByViewbox(attrs, viewbox) {
  const ratio = viewbox.width / viewbox.height;
  if (attrs.width) {
    return {
      height: Math.floor(attrs.width / ratio),
      width: attrs.width
    };
  }
  if (attrs.height) {
    return {
      height: attrs.height,
      width: Math.floor(attrs.height * ratio)
    };
  }
  return {
    height: viewbox.height,
    width: viewbox.width
  };
}
const SVG = {
  // Scan only the first kilo-byte to speed up the check on larger files
  validate: (input) => svgReg.test(toUTF8String(input, 0, 1e3)),
  calculate(input) {
    const root = toUTF8String(input).match(extractorRegExps.root);
    if (root) {
      const attrs = parseAttributes(root[0]);
      if (attrs.width && attrs.height) {
        return calculateByDimensions(attrs);
      }
      if (attrs.viewbox) {
        return calculateByViewbox(attrs, attrs.viewbox);
      }
    }
    throw new TypeError("Invalid SVG");
  }
};

const TGA = {
  validate(input) {
    return readUInt16LE(input, 0) === 0 && readUInt16LE(input, 4) === 0;
  },
  calculate(input) {
    return {
      height: readUInt16LE(input, 14),
      width: readUInt16LE(input, 12)
    };
  }
};

function readIFD(input, isBigEndian) {
  const ifdOffset = readUInt(input, 32, 4, isBigEndian);
  return input.slice(ifdOffset + 2);
}
function readValue(input, isBigEndian) {
  const low = readUInt(input, 16, 8, isBigEndian);
  const high = readUInt(input, 16, 10, isBigEndian);
  return (high << 16) + low;
}
function nextTag(input) {
  if (input.length > 24) {
    return input.slice(12);
  }
}
function extractTags(input, isBigEndian) {
  const tags = {};
  let temp = input;
  while (temp && temp.length) {
    const code = readUInt(temp, 16, 0, isBigEndian);
    const type = readUInt(temp, 16, 2, isBigEndian);
    const length = readUInt(temp, 32, 4, isBigEndian);
    if (code === 0) {
      break;
    } else {
      if (length === 1 && (type === 3 || type === 4)) {
        tags[code] = readValue(temp, isBigEndian);
      }
      temp = nextTag(temp);
    }
  }
  return tags;
}
function determineEndianness(input) {
  const signature = toUTF8String(input, 0, 2);
  if ("II" === signature) {
    return "LE";
  } else if ("MM" === signature) {
    return "BE";
  }
}
const signatures = [
  // '492049', // currently not supported
  "49492a00",
  // Little endian
  "4d4d002a"
  // Big Endian
  // '4d4d002a', // BigTIFF > 4GB. currently not supported
];
const TIFF = {
  validate: (input) => signatures.includes(toHexString(input, 0, 4)),
  calculate(input) {
    const isBigEndian = determineEndianness(input) === "BE";
    const ifdBuffer = readIFD(input, isBigEndian);
    const tags = extractTags(ifdBuffer, isBigEndian);
    const width = tags[256];
    const height = tags[257];
    if (!width || !height) {
      throw new TypeError("Invalid Tiff. Missing tags");
    }
    return { height, width };
  }
};

function calculateExtended(input) {
  return {
    height: 1 + readUInt24LE(input, 7),
    width: 1 + readUInt24LE(input, 4)
  };
}
function calculateLossless(input) {
  return {
    height: 1 + ((input[4] & 15) << 10 | input[3] << 2 | (input[2] & 192) >> 6),
    width: 1 + ((input[2] & 63) << 8 | input[1])
  };
}
function calculateLossy(input) {
  return {
    height: readInt16LE(input, 8) & 16383,
    width: readInt16LE(input, 6) & 16383
  };
}
const WEBP = {
  validate(input) {
    const riffHeader = "RIFF" === toUTF8String(input, 0, 4);
    const webpHeader = "WEBP" === toUTF8String(input, 8, 12);
    const vp8Header = "VP8" === toUTF8String(input, 12, 15);
    return riffHeader && webpHeader && vp8Header;
  },
  calculate(input) {
    const chunkHeader = toUTF8String(input, 12, 16);
    input = input.slice(20, 30);
    if (chunkHeader === "VP8X") {
      const extendedHeader = input[0];
      const validStart = (extendedHeader & 192) === 0;
      const validEnd = (extendedHeader & 1) === 0;
      if (validStart && validEnd) {
        return calculateExtended(input);
      } else {
        throw new TypeError("Invalid WebP");
      }
    }
    if (chunkHeader === "VP8 " && input[0] !== 47) {
      return calculateLossy(input);
    }
    const signature = toHexString(input, 3, 6);
    if (chunkHeader === "VP8L" && signature !== "9d012a") {
      return calculateLossless(input);
    }
    throw new TypeError("Invalid WebP");
  }
};

const typeHandlers = /* @__PURE__ */ new Map([
  ["bmp", BMP],
  ["cur", CUR],
  ["dds", DDS],
  ["gif", GIF],
  ["heif", HEIF],
  ["icns", ICNS],
  ["ico", ICO],
  ["j2c", J2C],
  ["jp2", JP2],
  ["jpg", JPG],
  ["ktx", KTX],
  ["png", PNG],
  ["pnm", PNM],
  ["psd", PSD],
  ["svg", SVG],
  ["tga", TGA],
  ["tiff", TIFF],
  ["webp", WEBP]
]);
const types = Array.from(typeHandlers.keys());

const firstBytes = /* @__PURE__ */ new Map([
  [56, "psd"],
  [66, "bmp"],
  [68, "dds"],
  [71, "gif"],
  [73, "tiff"],
  [77, "tiff"],
  [82, "webp"],
  [105, "icns"],
  [137, "png"],
  [255, "jpg"]
]);
function detector(input) {
  const byte = input[0];
  const type = firstBytes.get(byte);
  if (type && typeHandlers.get(type).validate(input)) {
    return type;
  }
  return types.find((fileType) => typeHandlers.get(fileType).validate(input));
}

const globalOptions = {
  disabledTypes: []
};
function lookup(input) {
  const type = detector(input);
  if (typeof type !== "undefined") {
    if (globalOptions.disabledTypes.indexOf(type) > -1) {
      throw new TypeError("disabled file type: " + type);
    }
    const size = typeHandlers.get(type).calculate(input);
    if (size !== void 0) {
      size.type = size.type ?? type;
      return size;
    }
  }
  throw new TypeError("unsupported file type: " + type);
}

async function probe(url) {
  const response = await fetch(url);
  if (!response.body || !response.ok) {
    throw new Error("Failed to fetch image");
  }
  const reader = response.body.getReader();
  let done, value;
  let accumulatedChunks = new Uint8Array();
  while (!done) {
    const readResult = await reader.read();
    done = readResult.done;
    if (done) break;
    if (readResult.value) {
      value = readResult.value;
      let tmp = new Uint8Array(accumulatedChunks.length + value.length);
      tmp.set(accumulatedChunks, 0);
      tmp.set(value, accumulatedChunks.length);
      accumulatedChunks = tmp;
      try {
        const dimensions = lookup(accumulatedChunks);
        if (dimensions) {
          await reader.cancel();
          return dimensions;
        }
      } catch (error) {
      }
    }
  }
  throw new Error("Failed to parse the size");
}

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      './astro/assets-service_CaHlsx__.mjs'
    ).then(n => n.s).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset) globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: await resolveSrc(options.src)
  };
  if (options.inferSize && isRemoteImage(resolvedOptions.src)) {
    try {
      const result = await probe(resolvedOptions.src);
      resolvedOptions.width ??= result.width;
      resolvedOptions.height ??= result.height;
      delete resolvedOptions.inferSize;
    } catch {
      throw new AstroError({
        ...FailedToFetchRemoteImageDimensions,
        message: FailedToFetchRemoteImageDimensions.message(resolvedOptions.src)
      });
    }
  }
  const originalFilePath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : void 0;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  resolvedOptions.src = clonedSrc;
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => ({
      transform: srcSet.transform,
      url: await service.getURL(srcSet.transform, imageConfig),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }))
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(
      validatedOptions,
      propsToHash,
      originalFilePath
    );
    srcSets = srcSetTransforms.map((srcSet) => ({
      transform: srcSet.transform,
      url: globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalFilePath),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }));
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$g = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/node_modules/astro/components/Image.astro", void 0);

const $$Astro$f = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const scopedStyleClass = props.class?.match(/\bastro-\w{8}\b/)?.[0];
  if (scopedStyleClass) {
    if (pictureAttributes.class) {
      pictureAttributes.class = `${pictureAttributes.class} ${scopedStyleClass}`;
    } else {
      pictureAttributes.class = scopedStyleClass;
    }
  }
  for (const key in props) {
    if (key.startsWith("data-astro-cid")) {
      pictureAttributes[key] = props[key];
    }
  }
  const originalSrc = await resolveSrc(props.src);
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({
        ...props,
        src: originalSrc,
        format,
        widths: props.widths,
        densities: props.densities
      })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(originalSrc) && specialFormatsFallback.includes(originalSrc.format)) {
    resultFallbackFormat = originalSrc.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionalAttributes = {};
  if (props.sizes) {
    sourceAdditionalAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute(mime.lookup(image.options.format ?? image.src) ?? `image/${image.options.format}`, "type")}${spreadAttributes(sourceAdditionalAttributes)}>`;
  })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					const getImage = async (options) => await getImage$1(options, imageConfig);

const $$Astro$e = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$Iconx = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$Iconx;
  const {
    id,
    class: className = "",
    size = 16,
    dataId,
    dataValue,
    dataTheme,
    debug = false
  } = Astro2.props;
  const iconAlias = {
    none: {
      id: "bi-house",
      icon: [
        "M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"
      ]
    },
    // Navigation
    home: {
      id: "bi-house",
      icon: [
        "M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"
      ]
    },
    toggleLeft: {
      id: "bi-chevron-left",
      icon: [
        "evenodd;M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
      ]
    },
    toggleRight: {
      id: "bi-chevron-right",
      icon: [
        "evenodd;M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
      ]
    },
    email: {
      id: "bi-email",
      icon: [
        "M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671",
        "M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791"
      ]
    },
    instagram: {
      id: "bi-instagram",
      icon: [
        "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"
      ]
    },
    phone: {
      id: "bi-phone",
      icon: [
        "evenodd;M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
      ]
    },
    map: {
      id: "bi-geo-alt-fill",
      icon: [
        "M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"
      ]
    },
    dots: {
      id: "bi-three-dots-vertical",
      icon: [
        "M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"
      ]
    },
    language: {
      id: "bi-translate",
      icon: [
        "M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z",
        "M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31"
      ]
    },
    menu: {
      id: "bi-list",
      icon: [
        "evenodd;M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
      ]
    },
    arrowUp: {
      id: "arrow-up-circle",
      icon: [
        "evenodd;M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"
      ]
    },
    enter: {
      id: "bi bi-arrow-up-square-fill",
      icon: [
        "M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0"
      ]
    },
    quote: {
      id: "bi bi-quote",
      icon: [
        "M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388q0-.527.062-1.054.093-.558.31-.992t.559-.683q.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 9 7.558V11a1 1 0 0 0 1 1zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612q0-.527.062-1.054.094-.558.31-.992.217-.434.559-.683.34-.279.868-.279V3q-.868 0-1.52.372a3.3 3.3 0 0 0-1.085.992 4.9 4.9 0 0 0-.62 1.458A7.7 7.7 0 0 0 3 7.558V11a1 1 0 0 0 1 1z"
      ]
    },
    arrowLink: {
      id: "bi bi-arrow-up-right-square",
      icon: [
        "evenodd;M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707z"
      ]
    },
    // Theme
    themeLight: {
      id: "bi-sun",
      icon: [
        "M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"
      ]
    },
    themeDark: {
      id: "bi-moon",
      icon: [
        "M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"
      ]
    },
    themeAuto: {
      id: "bi-circle-half",
      icon: ["M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16"]
    },
    // Weather
    weatherSun: {
      id: "bi-sun-fill",
      icon: [
        "M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"
      ]
    },
    weatherMoon: {
      id: "bi-cloud-moon-fill",
      icon: [
        "M11.473 11a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5z",
        "M11.286 1.778a.5.5 0 0 0-.565-.755 4.595 4.595 0 0 0-3.18 5.003 5.5 5.5 0 0 1 1.055.209A3.6 3.6 0 0 1 9.83 2.617a4.593 4.593 0 0 0 4.31 5.744 3.58 3.58 0 0 1-2.241.634q.244.477.394 1a4.59 4.59 0 0 0 3.624-2.04.5.5 0 0 0-.565-.755 3.593 3.593 0 0 1-4.065-5.422z"
      ]
    },
    weatherSunCloudy: {
      id: "bi-cloud-sun-fill",
      icon: [
        "M11.473 11a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5z",
        "M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708zm1.734 3.374a2 2 0 1 1 3.296 2.198q.3.423.516.898a3 3 0 1 0-4.84-3.225q.529.017 1.028.129m4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377M14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"
      ]
    },
    weatherMoonCloudy: {
      id: "bi-cloud-moon-fill",
      icon: [
        "M11.473 11a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5z",
        "M11.286 1.778a.5.5 0 0 0-.565-.755 4.595 4.595 0 0 0-3.18 5.003 5.5 5.5 0 0 1 1.055.209A3.6 3.6 0 0 1 9.83 2.617a4.593 4.593 0 0 0 4.31 5.744 3.58 3.58 0 0 1-2.241.634q.244.477.394 1a4.59 4.59 0 0 0 3.624-2.04.5.5 0 0 0-.565-.755 3.593 3.593 0 0 1-4.065-5.422z"
      ]
    },
    weatherFog: {
      id: "bi-cloud-fog-fill",
      icon: [
        "M3 13.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m10.405-9.473a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 12H13a3 3 0 0 0 .405-5.973"
      ]
    },
    weatherRain: {
      id: "bi-cloud-rain-fill",
      icon: [
        "M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317m.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973"
      ]
    },
    weatherSnow: {
      id: "bi-cloud-snow-fill",
      icon: [
        "M2.625 11.5a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m2.75 2a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m5.5 0a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 0 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m-2.75-2a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m5.5 0a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 0 1-.5 0v-.57l-.501.287a.25.25 0 1 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m-.22-7.223a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10.25H13a3 3 0 0 0 .405-5.973"
      ]
    },
    weatherStorm: {
      id: "bi-cloud-lightning-fill",
      icon: [
        "M7.053 11.276A.5.5 0 0 1 7.5 11h1a.5.5 0 0 1 .474.658l-.28.842H9.5a.5.5 0 0 1 .39.812l-2 2.5a.5.5 0 0 1-.875-.433L7.36 14H6.5a.5.5 0 0 1-.447-.724zm6.352-7.249a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973"
      ]
    },
    weather: {
      id: "bi-thermometer-half",
      icon: [
        "M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415",
        "M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"
      ]
    },
    specialties: {
      id: "bi-clipboard2-pulse-fill",
      icon: [
        "M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5",
        "M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5M9.98 5.356 11.372 10h.128a.5.5 0 0 1 0 1H11a.5.5 0 0 1-.479-.356l-.94-3.135-1.092 5.096a.5.5 0 0 1-.968.039L6.383 8.85l-.936 1.873A.5.5 0 0 1 5 11h-.5a.5.5 0 0 1 0-1h.191l1.362-2.724a.5.5 0 0 1 .926.08l.94 3.135 1.092-5.096a.5.5 0 0 1 .968-.039Z"
      ]
    },
    we: {
      id: "bi-people-fill",
      icon: [
        "M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"
      ]
    },
    contact: {
      id: "bi-chat-square-dots-fill",
      icon: [
        "M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
      ]
    },
    about: {
      id: "bi-info-circle-fill",
      icon: [
        "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"
      ]
    }
  };
  const selectedIcon = iconAlias[id] ? iconAlias[id].icon : iconAlias.none.icon;
  return renderTemplate`${!debug ? renderTemplate`${maybeRenderHead()}<svg xmlns="http://www.w3.org/2000/svg"${addAttribute(size, "width")}${addAttribute(size, "height")} style="min-width: 16px; min-height: 16px;" fill="currentColor"${addAttribute(["bi", className], "class:list")} viewBox="0 0 16 16"${addAttribute(id, "data-icon-id")}${addAttribute(dataId, "data-id")}${addAttribute(dataTheme, "data-theme")}>${selectedIcon && selectedIcon.map((path) => renderTemplate`<path${addAttribute(path.split(";").length > 1 ? "evenodd" : "nonzero", "fill-rule")}${addAttribute(path.split(";")[path.split(";").length - 1], "d")}></path>`)}</svg>` : Object.entries(iconAlias).map((val) => renderTemplate`<a class="btn"><svg xmlns="http://www.w3.org/2000/svg"${addAttribute(size, "width")}${addAttribute(size, "height")} style="min-width: 16px; min-height: 16px;" fill="currentColor"${addAttribute(["bi", className], "class:list")} viewBox="0 0 16 16">${val[1] && val[1].icon.map((path) => renderTemplate`<path${addAttribute(path.split(";").length > 1 ? "evenodd" : "nonzero", "fill-rule")}${addAttribute(path.split(";")[path.split(";").length - 1], "d")}></path>`)}</svg>${" "}<span>${val[0]}</span></a>`)}`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/components/widgets/Iconx.astro", void 0);

const $$Astro$d = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$Link = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Link;
  const {
    id = null,
    href,
    label = null,
    labelBreakpoint = null,
    class: className = "",
    icon = "home",
    iconClass = "",
    target = null,
    dataValue = null,
    rel = null
  } = Astro2.props;
  const dataTarget = href.toString().includes("#") ? "#" + href.toString().split("#")[1] : "";
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(id, "id")}${addAttribute(href, "href")}${addAttribute(["btn", className], "class:list")}${addAttribute(target, "target")}${addAttribute(label, "arial-label")}${addAttribute(dataTarget, "data-target")}${addAttribute(dataValue, "data-value")}${addAttribute(rel, "rel")}> ${renderComponent($$result, "Iconx", $$Iconx, { "id": icon, "class": iconClass })} ${label && renderTemplate`<span${addAttribute([labelBreakpoint ? `d-none ${labelBreakpoint}` : null], "class:list")}> ${label} </span>`} </a>`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/components/nav/Link.astro", void 0);

const languageSelector = [
  { id: "es", label: "Español" },
  { id: "ca", label: "Català" },
  { id: "en", label: "English" }
];
const defaultLang = "es";
const ui = {
  es: {
    phoneLabel: "Teléfono",
    emailLabel: "Email",
    instagramLabel: "Instagram",
    mapLabel: "Mapa",
    "nav.navigation": "Navegación",
    "nav.config": "Configuración",
    "nav.theme": "Tema",
    "nav.language": "Idioma",
    "nav.about": "Acerca de",
    "nav.linkmap": "Ver en Google Maps",
    "nav.addBookmark": "Añadir a Mis Marcadores",
    "theme.light": "Claro",
    "theme.dark": "Oscuro",
    "theme.auto": "Auto",
    "msg.locale": "El idioma por defecto de este equipo es %1.",
    "msg.localechange": "Puedes seleccionar otro aquí:",
    enter: "Entrar",
    main: "Inicio",
    address: ["Pasaje San Elias, 12", "08918 Badalona, Barcelona", "Congrés"],
    phone: "+34 93 179 48 23",
    phoneUrl: "tel:+34 93 179 48 23",
    email: "hypnosbadalona@gmail.com",
    emailUrl: "mailto:hypnosbadalona@gmail.com?subject=Consulta",
    instagram: "hypnos.psicologia_logopedia",
    instagramUrl: "https://www.instagram.com/hypnos.psicologia_logopedia/",
    mapUrl: "https://maps.app.goo.gl/3yhTKiSgabZAYRXy5",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2991.0594498830665!2d2.2252904765981683!3d41.43793167129363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4bb5e65590dbd%3A0xa9f6c146cab77600!2sHYPNOS%20psicologia%20i%20logop%C3%A8dia!5e0!3m2!1ses!2ses!4v1715876229215!5m2!1ses!2ses",
    title: "Hypnos",
    subtitle: "Psicología y Logopedia"
  },
  en: {
    "nav.navigation": "Navigation",
    "nav.config": "Configuration",
    "nav.theme": "Theme",
    "nav.language": "Language",
    "nav.about": "About",
    "nav.linkmap": "See on Google Maps",
    "nav.addBookmark": "Add to My Bookmarks",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.auto": "Auto",
    "msg.locale": "L'idioma per defecte d'aquest equip és %1.",
    "msg.localechange": "Pots sel·leccionar un altre aquí:",
    enter: "Entrar",
    main: "Home",
    address: ["Pasaje San Elias, 12", "08918 Badalona, Barcelona", "Congrés"],
    title: "Hypnos",
    subtitle: "Psychology and Speech Therapy"
  },
  ca: {
    "nav.navigation": "Navigation",
    "nav.config": "Configuration",
    "nav.theme": "Tema",
    "nav.language": "Idioma",
    "nav.about": "Sobre",
    "nav.linkmap": "Veure en Google Maps",
    "nav.addBookmark": "Afegir als Meus Marcadors",
    "theme.light": "Clar",
    "theme.dark": "Fosc",
    "theme.auto": "Auto",
    "msg.locale": "Default language por this device is %1.",
    "msg.localechange": "You can select another one here:",
    enter: "Enter",
    main: "Inici",
    address: [
      "Passatge Sant Elies, 12",
      "08918 Badalona, Barcelona",
      "Congrés"
    ],
    title: "Hypnos",
    subtitle: "Psicologia i Logopèdia"
  }
};

function getLangFromUrl(url) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang;
  return defaultLang;
}
function useTranslations(lang) {
  return function t(key) {
    return ui && lang && key && ui[lang][key] || ui[defaultLang][key];
  };
}

const $$Astro$c = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const Themes = {
  THEME_LIGHT: "light",
  THEME_DARK: "dark",
  THEME_AUTO: "auto"
};
const themeSelector = [
  {
    id: Themes.THEME_LIGHT,
    icon: "themeLight",
    label: "theme.light"
  },
  {
    id: Themes.THEME_DARK,
    icon: "themeDark",
    label: "theme.dark"
  },
  {
    id: Themes.THEME_AUTO,
    icon: "themeAuto",
    label: "theme.auto"
  }
];
const $$ThemeSelector = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$ThemeSelector;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  const componentClass = "app-theme-selector";
  const componentClassBtn = "app-theme-btn";
  const { mode = 0 } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "astro-theme-selector", "astro-theme-selector", { "style": { display: mode === 2 ? "inline" : "inline-flex" } }, { "default": () => renderTemplate`  ${mode !== 2 && renderTemplate`${maybeRenderHead()}<div${addAttribute([
    componentClass,
    mode === 0 ? ["dropdown", "d-inline", " d-xl-none"] : [""]
  ], "class:list")}> <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> ${renderComponent($$result, "Iconx", $$Iconx, { "id": "themeLight", "dataTheme": "light", "class:list": [componentClassBtn] })} ${renderComponent($$result, "Iconx", $$Iconx, { "id": "themeDark", "dataTheme": "dark", "class:list": [componentClassBtn] })} ${renderComponent($$result, "Iconx", $$Iconx, { "id": "themeAuto", "dataTheme": "auto", "class:list": [componentClassBtn] })} ${mode === 0 && renderTemplate`<span${addAttribute([componentClassBtn, "d-none", "d-md-inline"], "class:list")}> ${t("nav.theme")} </span>`} </button> <ul${addAttribute(["dropdown-menu", "dropdown-menu-end"], "class:list")}> ${themeSelector.map((theme) => renderTemplate`<li class="nav-link"> <button${addAttribute([componentClassBtn, "dropdown-item"], "class:list")}${addAttribute(theme.id, "data-theme")}> ${renderComponent($$result, "Iconx", $$Iconx, { "id": theme.icon, "class:list": [componentClassBtn] })} <span>${t(theme.label)}</span> </button> </li>`)} </ul> </div>`}  ${mode === 0 && renderTemplate`<div${addAttribute([componentClass], "class:list")}> <span${addAttribute([
    componentClassBtn,
    "btn-label",
    "d-none",
    "d-xl-inline"
  ], "class:list")}> ${renderComponent($$result, "Iconx", $$Iconx, { "id": "themeLight", "dataTheme": "light", "class:list": [componentClassBtn] })} ${renderComponent($$result, "Iconx", $$Iconx, { "id": "themeDark", "dataTheme": "dark", "class:list": [componentClassBtn] })} ${renderComponent($$result, "Iconx", $$Iconx, { "id": "themeAuto", "dataTheme": "auto", "class:list": [componentClassBtn] })} ${t("nav.theme")}:
</span> <div${addAttribute(["btn-group", "d-none", "d-xl-inline-flex"], "class:list")}> ${themeSelector.map((theme) => renderTemplate`<button${addAttribute([componentClassBtn, "btn"], "class:list")}${addAttribute(theme.id, "data-theme")}> ${renderComponent($$result, "Iconx", $$Iconx, { "id": theme.icon })} <span>${t(theme.label)}</span> </button>`)} </div> </div>`} ${mode === 2 && renderTemplate`<div${addAttribute([componentClass, "list-group"], "class:list")}> ${themeSelector.map((theme) => renderTemplate`<button${addAttribute([
    componentClassBtn,
    "list-group-item",
    "border-0",
    "text-start"
  ], "class:list")}${addAttribute(theme.id, "data-theme")}> ${renderComponent($$result, "Iconx", $$Iconx, { "id": theme.icon })} <span>${t(theme.label)}</span> </button>`)} </div>`}  ` })}`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/components/widgets/ThemeSelector.astro", void 0);

const $$Astro$b = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$LocaleSelector = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$LocaleSelector;
  const lang = getLangFromUrl(Astro2.url);
  const currentLocale = Astro2.currentLocale;
  const t = useTranslations(lang);
  const componentClass = "app-locale-selector";
  const componentClassBtn = "app-locale-btn";
  const { mode = 0 } = Astro2.props;
  const basePath = "https://joseantanaper.github.io/astro-bootstrap-hypnos-preview";
  return renderTemplate`${renderComponent($$result, "astro-locale-selector", "astro-locale-selector", { "style": { display: mode === 2 ? "inline" : "inline-flex" } }, { "default": () => renderTemplate` ${mode !== 2 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div${addAttribute(["dropdown", "d-inline", mode === 0 && "d-xl-none"], "class:list")}>  <button${addAttribute([
    "btn",
    "dropdown-toggle",
    "d-inline",
    mode === 0 && "d-xl-none"
  ], "class:list")} type="button" data-bs-toggle="dropdown" aria-expanded="false"> ${renderComponent($$result2, "Iconx", $$Iconx, { "id": "language" })} <span${addAttribute([
    "d-inline",
    mode === 0 && "d-md-none",
    "text-uppercase"
  ], "class:list")}> ${currentLocale} </span> ${mode === 0 && renderTemplate`<span class="d-none d-md-inline text-capitalize"> ${languageSelector.filter(
    (language) => language.id == currentLocale
  )[0].label} </span>`} </button> <ul class="dropdown-menu dropdown-menu-end"> ${languageSelector.map((lang2) => {
    return renderTemplate`<li class="nav-link"> ${renderComponent($$result2, "Link", $$Link, { "href": `${basePath}/${lang2.id}/`, "class": `dropdown-item ${currentLocale === lang2.id ? "active pe-none" : ""}`, "icon": "language", "label": lang2.label, "dataValue": lang2.id })} </li>`;
  })} </ul> </div> ${mode === 0 && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate` <span${addAttribute(["btn-label", "d-none", "d-xl-inline"], "class:list")}> ${renderComponent($$result3, "Iconx", $$Iconx, { "id": "language" })} <span>${t("nav.language")}</span> </span> <div${addAttribute(["btn-group", "d-none", "d-xl-inline-flex"], "class:list")}> ${languageSelector.map((lang2) => renderTemplate`${renderComponent($$result3, "Link", $$Link, { "href": `${basePath}/${lang2.id}/`, "class:list": [
    "btn",
    componentClassBtn,
    "text-start",
    currentLocale === lang2.id ? ["active", "pe-none"] : ""
  ], "icon": "language", "label": lang2.label, "dataValue": lang2.id })}`)} </div> ` })}`}` })}`} ${mode === 2 && renderTemplate`<div${addAttribute([componentClass, "list-group", "w-100"], "class:list")}> ${languageSelector.map((lang2) => renderTemplate`${renderComponent($$result, "Link", $$Link, { "href": `${basePath}/${lang2.id}/`, "class:list": [
    "list-group-item",
    componentClassBtn,
    "border-0",
    "text-start",
    "p-3",
    currentLocale === lang2.id ? ["active", "pe-none"] : ""
  ], "icon": "language", "label": lang2.label, "dataValue": lang2.id })}`)} </div>`}  ` })}`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/components/widgets/LocaleSelector.astro", void 0);

const $$Astro$a = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$Navcommon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Navcommon;
  const lang = Astro2.currentLocale;
  const t = useTranslations(lang);
  const { mode = 0 } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${mode === 1 && renderTemplate`${maybeRenderHead()}<div class="col-9 d-none d-md-inline"></div>`}<div class="col text-center d-inline-block"><div class="btn-group">${renderComponent($$result2, "Link", $$Link, { "href": `${"/astro-bootstrap-hypnos-preview"}`, "label": t("main"), "labelBreakpoint": "d-sm-inline", "class": "btn-outline-primary" })}</div></div><div class="col text-center">${renderComponent($$result2, "ThemeSelector", $$ThemeSelector, { "mode": mode })}</div><div class="col text-center">${renderComponent($$result2, "LocaleSelector", $$LocaleSelector, { "mode": mode })}</div>` })}`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/components/nav/Navcommon.astro", void 0);

const $$Astro$9 = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$AddressCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$AddressCard;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  return renderTemplate`${maybeRenderHead()}<div class="container-fluid"> <div class="row"> <div class="col-2 d-flex"> ${renderComponent($$result, "Iconx", $$Iconx, { "id": "map", "class": "opacity-25 m-auto", "size": 48 })} </div> <div class="col"> ${t("address").map((entry) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${entry}<br> ` })}`)} </div> </div> </div>`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/components/AddressCard.astro", void 0);

const weatherCodes = [];
for (let i = 0; i <= 99; i++) {
  weatherCodes.push(i);
}
const weatherIcon = (weatherIsDay, weatherCode) => {
  if (weatherIsDay === 1) {
    if ([0].includes(weatherCode)) return "weatherSun";
    if ([1, 2, 3].includes(weatherCode)) return "weatherSunCloudy";
    if ([45, 48].includes(weatherCode)) return "weatherFog";
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode))
      return "weatherRain";
    if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) return "weatherSnow";
    if ([95, 96, 99].includes(weatherCode)) return "weatherStorm";
    return "weather";
  } else {
    if ([0].includes(weatherCode)) return "weatherMoon";
    if ([1, 2, 3].includes(weatherCode)) return "weatherMoonCloudy";
    if ([45, 48].includes(weatherCode)) return "weatherFog";
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode))
      return "weatherRain";
    if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) return "weatherSnow";
    if ([95, 96, 99].includes(weatherCode)) return "weatherStorm";
    return "weather";
  }
};
const weatherColor = (weatherIsDay, weatherCode) => {
  if (weatherIsDay === 1) {
    if ([0].includes(weatherCode)) return "text-warning";
    if ([1, 2, 3].includes(weatherCode)) return "text-warning";
    if ([45, 48].includes(weatherCode)) return "text-info";
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode))
      return "text-info";
    if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) return "text-info";
    if ([95, 96, 99].includes(weatherCode)) return "text-info";
    return "text-info";
  } else {
    if ([0].includes(weatherCode)) return "text-primary";
    if ([1, 2, 3].includes(weatherCode)) return "text-primary";
    if ([45, 48].includes(weatherCode)) return "text-primary";
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode))
      return "text-primary";
    if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) return "text-primary";
    if ([95, 96, 99].includes(weatherCode)) return "text-primary";
    return "text-primary";
  }
};

const $$Astro$8 = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$Weather = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Weather;
  const { debug = false, mode = 0 } = Astro2.props;
  return renderTemplate`${debug === true ? renderTemplate`${maybeRenderHead()}<div class="d-block">${weatherCodes && [0, 1].map(
    (day) => weatherCodes.map((code) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`<div class="m-2 d-inline-block text-center">${renderComponent($$result2, "Iconx", $$Iconx, { "id": weatherIcon(day, code), "class:list": [
      weatherColor(day, code),
      weatherIcon(day, code) === "weather" ? "opacity-25" : null,
      "me-2"
    ], "size": mode === 1 ? 16 : 56 })}<span>${code}</span></div>${code >= 99 && renderTemplate`<hr>`}` })}`)
  )}</div>` : renderTemplate`<div${addAttribute([
    mode === 1 ? "d-inline-flex align-items-center" : "d-flex align-items-center"
  ], "class:list")}>${renderComponent($$result, "Iconx", $$Iconx, { "class:list": ["d-none", "app-weather-icon", "text-danger"], "id": "weather", "size": mode === 1 ? null : 56 })}${renderComponent($$result, "Iconx", $$Iconx, { "class:list": ["app-weather-icon", "d-none"], "id": "weatherSun", "size": mode === 1 ? null : 56 })}${renderComponent($$result, "Iconx", $$Iconx, { "class:list": ["app-weather-icon", "d-none"], "id": "weatherSunCloudy", "size": mode === 1 ? null : 56 })}${renderComponent($$result, "Iconx", $$Iconx, { "class:list": ["app-weather-icon", "d-none"], "id": "weatherMoon", "size": mode === 1 ? null : 56 })}${renderComponent($$result, "Iconx", $$Iconx, { "class:list": ["app-weather-icon", "d-none"], "id": "weatherMoonCloudy", "size": mode === 1 ? null : 56 })}${renderComponent($$result, "Iconx", $$Iconx, { "class:list": ["app-weather-icon", "d-none"], "id": "weatherFog", "size": mode === 1 ? null : 56 })}${renderComponent($$result, "Iconx", $$Iconx, { "class:list": ["app-weather-icon", "d-none"], "id": "weatherRain", "size": mode === 1 ? null : 56 })}${renderComponent($$result, "Iconx", $$Iconx, { "class:list": ["app-weather-icon", "d-none"], "id": "weatherSnow", "size": mode === 1 ? null : 56 })}${renderComponent($$result, "Iconx", $$Iconx, { "class:list": ["app-weather-icon", "d-none"], "id": "weatherStorm", "size": mode === 1 ? null : 56 })}${renderComponent($$result, "Iconx", $$Iconx, { "class:list": ["app-weather-icon", "d-none"], "id": "weather", "size": mode === 1 ? null : 56 })}<span${addAttribute([
    "d-none",
    "app-weather-label",
    "fw-lighter",
    mode === 1 ? "ps-1" : "d-flex align-items-center fs-2 ms-3"
  ], "class:list")}>${"0\xBA"}</span></div>`}`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/components/widgets/weather/Weather.astro", void 0);

const hypnosLogo$1 = new Proxy({"src":"/astro-bootstrap-hypnos-preview/astro/hypnos-logo-720.DJ3BQ-v5.png","width":720,"height":205,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/DEV/Astro/astro-bootstrap-hypnos/src/assets/logo/png/hypnos-logo-720.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("D:/DEV/Astro/astro-bootstrap-hypnos/src/assets/logo/png/hypnos-logo-720.png");
							return target[name];
						}
					});

const hypnosHead$1 = new Proxy({"src":"/astro-bootstrap-hypnos-preview/astro/hypnos-head-480.aQMYIk6S.png","width":480,"height":493,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/DEV/Astro/astro-bootstrap-hypnos/src/assets/logo/png/hypnos-head-480.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("D:/DEV/Astro/astro-bootstrap-hypnos/src/assets/logo/png/hypnos-head-480.png");
							return target[name];
						}
					});

const themes = {
  THEME_LIGHT: "light",
  THEME_DARK: "dark",
  THEME_AUTO: "auto"
};
const globalService = {
  console: {
    setup: () => {
      if (!localStorage.getItem("enableConsole") || Number(localStorage.getItem("enableConsole")) !== 0 || false) {
        console.log = function() {
        };
      }
    }
  },
  theme: {
    defaultTheme: themes.THEME_AUTO,
    isCurrent: (html, theme) => {
      console.log(
        "globalService.theme",
        "isCurrent",
        theme,
        globalService.theme.htmlStoreTheme(html),
        globalService.theme.getStoredTheme()
      );
      return html instanceof HTMLElement && theme === globalService.theme.htmlStoreTheme(html) || theme === globalService.theme.getStoredTheme() ? true : false;
    },
    htmlTheme: (html) => {
      return html instanceof HTMLElement ? html.getAttribute("data-bs-theme") : null;
    },
    htmlStoreTheme: (html) => {
      return html instanceof HTMLElement ? html.getAttribute("data-bs-storeTheme") : null;
    },
    osTheme: (window) => {
      const osTheme = window instanceof Window ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : globalService.theme.defaultTheme;
      console.log("globalService", "osTheme", osTheme);
      return osTheme;
    },
    setTheme: (window, html, theme) => {
      html.setAttribute(
        "data-bs-theme",
        theme === "light" || theme === "dark" ? theme : globalService.theme.osTheme(window) || globalService.theme.defaultTheme
      );
      html.setAttribute(
        "data-bs-storeTheme",
        theme === "light" || theme === "dark" ? theme : "auto"
      );
    },
    storeTheme: (theme) => {
      console.log("globalService", "storeTheme", theme);
      localStorage.setItem("theme", theme ?? "auto");
    },
    getStoredTheme: () => {
      return localStorage.getItem("theme");
    }
  },
  locale: {
    defaultLocale: "es",
    storeLocale: (locale) => {
      localStorage.setItem(
        "locale",
        locale ?? globalService.locale.defaultLocale
      );
    },
    getStoredLocale: () => {
      return localStorage.getItem("locale");
    }
  },
  test: (label) => {
    console.log("globalService", "test", label);
  },
  currentPath: (url) => {
    return url.split("/")[3];
  }
};

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign({"BASE_URL": "/astro-bootstrap-hypnos-preview", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://joseantanaper.github.io/astro-bootstrap-hypnos-preview", "ASSETS_PREFIX": undefined}, { Path: process.env.Path })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = cacheEntriesByCollection.get(collection);
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries.slice();
    }
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/site/ca/00-header.md": () => import('./00-header_DlyhYvYJ.mjs'),"/src/content/site/ca/01-spec.md": () => import('./01-spec_DJs3SpaQ.mjs'),"/src/content/site/ca/02-we.md": () => import('./02-we_BbxHvUiO.mjs'),"/src/content/site/ca/03-contact.md": () => import('./03-contact_BGNXAwIj.mjs'),"/src/content/site/ca/99-about.md": () => import('./99-about_BEVG4yz-.mjs'),"/src/content/site/en/00-header.md": () => import('./00-header_BGdXiwRI.mjs'),"/src/content/site/en/01-spec.md": () => import('./01-spec_C7l7EEyk.mjs'),"/src/content/site/en/02-we.md": () => import('./02-we_D7-V0Nuc.mjs'),"/src/content/site/en/03-contact.md": () => import('./03-contact_CkZRYzDz.mjs'),"/src/content/site/en/99-about.md": () => import('./99-about_DQBto5i5.mjs'),"/src/content/site/es/00-header.md": () => import('./00-header_N0B19h86.mjs'),"/src/content/site/es/01-spec.md": () => import('./01-spec_Cwr7k0Xf.mjs'),"/src/content/site/es/02-we.md": () => import('./02-we_BuezTRvz.mjs'),"/src/content/site/es/03-contact.md": () => import('./03-contact_0Mdl5yKi.mjs'),"/src/content/site/es/99-about.md": () => import('./99-about_tDCkQklk.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"site":{"type":"content","entries":{"ca/01-spec":"/src/content/site/ca/01-spec.md","ca/03-contact":"/src/content/site/ca/03-contact.md","ca/00-header":"/src/content/site/ca/00-header.md","ca/02-we":"/src/content/site/ca/02-we.md","en/00-header":"/src/content/site/en/00-header.md","ca/99-about":"/src/content/site/ca/99-about.md","en/01-spec":"/src/content/site/en/01-spec.md","en/03-contact":"/src/content/site/en/03-contact.md","en/02-we":"/src/content/site/en/02-we.md","en/99-about":"/src/content/site/en/99-about.md","es/00-header":"/src/content/site/es/00-header.md","es/01-spec":"/src/content/site/es/01-spec.md","es/02-we":"/src/content/site/es/02-we.md","es/03-contact":"/src/content/site/es/03-contact.md","es/99-about":"/src/content/site/es/99-about.md"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/site/ca/00-header.md": () => import('./00-header_CekaBCQ1.mjs'),"/src/content/site/ca/01-spec.md": () => import('./01-spec_BQdXjDs7.mjs'),"/src/content/site/ca/02-we.md": () => import('./02-we_B5M72Ny0.mjs'),"/src/content/site/ca/03-contact.md": () => import('./03-contact_ktu48yv5.mjs'),"/src/content/site/ca/99-about.md": () => import('./99-about_DfrNyMbD.mjs'),"/src/content/site/en/00-header.md": () => import('./00-header_DPUAe6N2.mjs'),"/src/content/site/en/01-spec.md": () => import('./01-spec_0a5aaBsO.mjs'),"/src/content/site/en/02-we.md": () => import('./02-we_DWOuY96Z.mjs'),"/src/content/site/en/03-contact.md": () => import('./03-contact_DGVWd_RV.mjs'),"/src/content/site/en/99-about.md": () => import('./99-about_bJkqUOdN.mjs'),"/src/content/site/es/00-header.md": () => import('./00-header_DxgEBT7b.mjs'),"/src/content/site/es/01-spec.md": () => import('./01-spec_Dvpbfpc9.mjs'),"/src/content/site/es/02-we.md": () => import('./02-we_BJ0WiVlV.mjs'),"/src/content/site/es/03-contact.md": () => import('./03-contact_D7dD-IOo.mjs'),"/src/content/site/es/99-about.md": () => import('./99-about_K__OjTvA.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
});

const $$Astro$7 = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Header;
  const lang = Astro2.currentLocale;
  const t = useTranslations(lang);
  const header = (await getCollection("site", (entry) => entry.id.startsWith(`${lang}/00`)))[0];
  globalService.currentPath(new URL(Astro2.url).pathname);
  const { Content } = header ? await header.render() : { Content: null };
  return renderTemplate`${header && header.data && renderTemplate`${maybeRenderHead()}<div id="app-main-header" class="row app-main-header"><div class="col"><div class="row"><div class="col-lg-6">${renderComponent($$result, "Image", $$Image, { "src": hypnosHead$1, "width": hypnosHead$1.width, "height": hypnosHead$1.height, "alt": "Hypnos", "class": "app-hypnos-head m-auto d-block img-fluid", "loading": "eager" })}</div><div class="col-lg-6 text-end"><div class="row"><div class="col"><div class="row"><div class="col">${renderComponent($$result, "Image", $$Image, { "src": hypnosLogo$1, "width": hypnosLogo$1.width, "height": hypnosLogo$1.height, "alt": "Hypnos", "loading": "eager", "class": "app-hypnos-logo img-fluid" })}<span class="app-main-header-subtitle">${t("subtitle")}</span></div></div><div class="row text-center text-md-end py-5"><div class="col-md">${Content && renderTemplate`${renderComponent($$result, "Content", Content, {})}`}</div></div><div class="row text-center"><div class="col-md py-3 d-flex justify-content-center justify-content-md-end">${renderComponent($$result, "Weather", $$Weather, {})}</div><div class="col-md py-3 text-center text-md-end">${renderComponent($$result, "AddressCard", $$AddressCard, {})}</div></div></div></div></div></div><div class="row flex-nowrap justify-content-end">${renderComponent($$result, "Navcommon", $$Navcommon, { "mode": 1 })}</div><div class="row p-5"></div></div></div>`}`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/components/section/Header.astro", void 0);

const $$Astro$6 = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$Menu = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Menu;
  const { id, title, placement = "offcanvas-start" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`offcanvas shadow ${placement}`, "class")} tabindex="-1"${addAttribute(id, "id")}${addAttribute(`${id}-label`, "aria-labelledby")}> <div${addAttribute(`${placement === "offcanvas-end" ? "me-2" : ""}
    offcanvas-header
    bg-secondary-subtle
    w-100`, "class")}> ${placement === "offcanvas-start" && renderTemplate`<button class="btn btn-lg btn-outline-danger me-3" data-bs-dismiss="offcanvas" aria-label="Close"> ${placement === "offcanvas-start" && renderTemplate`${renderComponent($$result, "Iconx", $$Iconx, { "id": "toggleLeft" })}`} </button>`} <h3 class="offcanvas-title"${addAttribute(`${id}-label`, "id")}> ${title} </h3> ${placement === "offcanvas-end" && renderTemplate`<button class="btn btn-lg btn-outline-danger ms-3 end-0 me-2 position-absolute" data-bs-dismiss="offcanvas" aria-label="Close"> ${placement === "offcanvas-end" && renderTemplate`${renderComponent($$result, "Iconx", $$Iconx, { "id": "toggleRight" })}`} </button>`} </div> <div class="offcanvas-body"> ${renderSlot($$result, $$slots["default"])} </div> </div>`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/components/menu/Menu.astro", void 0);

const hypnosLogo = new Proxy({"src":"/astro-bootstrap-hypnos-preview/astro/hypnos-logo-360.BK_LV3Ks.png","width":360,"height":102,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/DEV/Astro/astro-bootstrap-hypnos/src/assets/logo/png/hypnos-logo-360.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("D:/DEV/Astro/astro-bootstrap-hypnos/src/assets/logo/png/hypnos-logo-360.png");
							return target[name];
						}
					});

const hypnosHead = new Proxy({"src":"/astro-bootstrap-hypnos-preview/astro/hypnos-head-360.CBIe561P.png","width":360,"height":370,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/DEV/Astro/astro-bootstrap-hypnos/src/assets/logo/png/hypnos-head-360.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("D:/DEV/Astro/astro-bootstrap-hypnos/src/assets/logo/png/hypnos-head-360.png");
							return target[name];
						}
					});

const $$Astro$5 = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Navbar;
  const {
    id,
    title,
    placement = "",
    containerClass = "",
    goTop = 0
  } = Astro2.props;
  console.log("Navbar", id, "placement?", placement);
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<nav${addAttribute(id, "id")}${addAttribute(`navbar navbar-expand ${placement} ${containerClass}`, "class")}><div class="container-fluid d-inline-flex">${Astro2.slots.has("nav") && renderTemplate`${renderSlot($$result2, $$slots["brand"])}`}${Astro2.slots.has("widget") && renderTemplate`${renderSlot($$result2, $$slots["widget"])}`}<ul${addAttribute([
    "navbar-nav",
    "d-inline-flex",
    Astro2.slots.has("config") && "border-end me-2"
  ], "class:list")}>${Astro2.slots.has("nav") && renderTemplate`<li class="nav-item">${renderSlot($$result2, $$slots["nav"])}</li>`}${Astro2.slots.has("tool") && renderTemplate`<li class="nav-item">${renderSlot($$result2, $$slots["tool"])}</li>`}</ul>${Astro2.slots.has("config") && renderTemplate`${renderSlot($$result2, $$slots["config"])}`}<!-- <div class="app-navbar-block d-none d-xxl-inline"></div>
    <div class="app-navbar-block"></div>
    <div class="app-navbar-block"> --></div></nav>${renderSlot($$result2, $$slots["menu-start"])}${renderSlot($$result2, $$slots["menu-end"])}${goTop === 1 && renderTemplate`<button class="app-btn-goTop btn btn-lg text-primary hide">${renderComponent($$result2, "Iconx", $$Iconx, { "id": "arrowUp", "class": "m-1" })}</button>`}` })}`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/layouts/Navbar.astro", void 0);

const $$Astro$4 = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$Navlinks = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Navlinks;
  const lang = getLangFromUrl(Astro2.url);
  const links = await getCollection(
    "site",
    (entry) => entry.id.startsWith(`${lang}/`) && !entry.id.startsWith(`${lang}/00`)
  );
  const { mode = 0 } = Astro2.props;
  return renderTemplate`${mode === 0 ? links.map(({ data }) => renderTemplate`${renderComponent($$result, "Link", $$Link, { "href": new URL(
    "https://joseantanaper.github.io/astro-bootstrap-hypnos-preview/" + lang + (data.link.startsWith("/") ? data.link : "/#" + data.link)
  ), "data-target": "#" + data.link, "icon": `${data.icon}`, "label": `${data.title}` })}`) : links.map(({ data }) => renderTemplate`${renderComponent($$result, "Link", $$Link, { "href": new URL(
    "https://joseantanaper.github.io/astro-bootstrap-hypnos-preview/" + lang + (data.link.startsWith("/") ? data.link : "/#" + data.link)
  ), "data-target": "#" + data.link, "class": "text-start p-3", "icon": `${data.icon}`, "label": `${data.title}` })}`)}`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/components/nav/Navlinks.astro", void 0);

const $$Astro$3 = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$Navcontact = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Navcontact;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  const links = [
    {
      href: t("phoneUrl"),
      class: "btn-outline-success border-0",
      label: t("phoneLabel"),
      icon: "phone"
    },
    {
      href: t("emailUrl"),
      class: "btn-outline-warning border-0",
      label: t("emailLabel"),
      icon: "email"
    },
    {
      href: t("instagramUrl"),
      class: "btn-outline-danger border-0",
      label: t("instagramLabel"),
      icon: "instagram",
      target: "_blank"
    },
    {
      href: t("mapUrl"),
      class: "btn-outline-primary border-0",
      label: t("mapLabel"),
      icon: "map",
      target: "_blank"
    }
  ];
  const { class: className, label = 0 } = Astro2.props;
  return renderTemplate`${links.map((link) => renderTemplate`${renderComponent($$result, "Link", $$Link, { "href": link.href, "class:list": [link.class, className], "arial-label": link.label, "label": label === 0 ? null : link.label, "icon": link.icon, "iconClass": "opacity-100", "target": link.target })}`)}`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/components/nav/Navcontact.astro", void 0);

const $$Astro$2 = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$Navmain = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Navmain;
  const lang = getLangFromUrl(Astro2.url);
  const t = useTranslations(lang);
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Navbar", $$Navbar, { "id": "app-main-navbar", "title": "Hypnos", "placement": "sticky-top", "goTop": 1 }, { "brand": ($$result3) => renderTemplate`${maybeRenderHead()}<div class="w-100 me-2"><button class="btn btn-lg me-2" data-bs-toggle="offcanvas" data-bs-target="#app-main-navbar-menu-start" aria-controls="app-main-navbar-menu-start">${renderComponent($$result3, "Iconx", $$Iconx, { "id": "menu" })}</button>${renderComponent($$result3, "Image", $$Image, { "src": hypnosHead, "alt": "Hypnos", "width": 32, "height": 32, "class": "app-hypnos-head-nav me-2 rounded d-inline", "loading": "eager" })}${renderComponent($$result3, "Image", $$Image, { "src": hypnosLogo, "class": "app-hypnos-logo-nav d-none d-sm-inline d-md-inline d-lg-none d-xl-inline", "style": "margin-bottom: -6px;", "height": "36", "alt": "Hypnos", "loading": "eager" })}<span class="btn-label opacity-50 d-none d-sm-none d-md-inline d-lg-none d-xl-none d-xxl-inline">${app.config.subtitle}</span></div>`, "config": ($$result3) => renderTemplate`<div><button class="btn btn-lg" data-bs-toggle="offcanvas" data-bs-target="#app-main-navbar-menu-end" aria-controls="app-main-navbar-menu-end"><!-- <Iconx id="toggleLeft" />
        <span>ES</span>
        <Iconx id="home" /> -->${renderComponent($$result3, "Iconx", $$Iconx, { "id": "dots", "size": 24 })}</button></div>`, "menu-end": ($$result3) => renderTemplate`<div>${renderComponent($$result3, "Menu", $$Menu, { "id": "app-main-navbar-menu-end", "title": t("nav.config"), "placement": "offcanvas-end" }, { "default": ($$result4) => renderTemplate`<div><h4>Tema</h4>${renderComponent($$result4, "ThemeSelector", $$ThemeSelector, { "mode": 2 })}</div><div><h4>Idioma</h4>${renderComponent($$result4, "LocaleSelector", $$LocaleSelector, { "mode": 2 })}</div>` })}</div>`, "menu-start": ($$result3) => renderTemplate`<div>${renderComponent($$result3, "Menu", $$Menu, { "id": "app-main-navbar-menu-start", "title": t("nav.navigation") }, { "default": ($$result4) => renderTemplate`<div class="list-group w-100 text-start" data-bs-dismiss="offcanvas" id="app-navlinks">${renderComponent($$result4, "Navlinks", $$Navlinks, { "mode": 1 })}</div>` })}</div>`, "nav": ($$result3) => renderTemplate`<div class="d-none d-lg-inline"><div class="btn-group" id="app-navlinks">${renderComponent($$result3, "Navlinks", $$Navlinks, {})}</div></div>`, "tool": ($$result3) => renderTemplate`<div><div class="btn-group">${renderComponent($$result3, "Navcontact", $$Navcontact, {})}</div></div>`, "widget": ($$result3) => renderTemplate`<div class="text-end">${renderComponent($$result3, "Weather", $$Weather, { "mode": 1 })}</div>` })}` })}`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/components/nav/Navmain.astro", void 0);

const $$Astro$1 = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Footer;
  const lang = getLangFromUrl(Astro2.url);
  await getCollection(
    "site",
    (entry) => entry.id.startsWith(`${lang}/`) && !entry.id.startsWith(`${lang}/00`)
  );
  return renderTemplate`${maybeRenderHead()}<footer> <div class="row"> <div class="col text-center py-5 fs-3"> ${renderComponent($$result, "Image", $$Image, { "src": hypnosLogo, "height": "36", "alt": app.config.title, "loading": "eager" })} <span>${app.config.subtitle}</span> <span class="opacity-50 fw-lighter">${(/* @__PURE__ */ new Date()).getFullYear()}</span> </div> </div> <div class="row"> <div class="col text-center py-5"> <span class="fw-lighter"> ${renderComponent($$result, "Navlinks", $$Navlinks, {})} </span> </div> </div> <div class="row flex-nowrap py-5"> ${renderComponent($$result, "Navcommon", $$Navcommon, {})} </div> <div class="row text-center py-5"> <div class="col"> <div class="btn-group"> ${renderComponent($$result, "Navcontact", $$Navcontact, { "class": "btn-lg mx-3 mx-sm-3 mx-md-3 mx-lg-4 mx-xl-5 mx-xxl-5" })} </div> </div> </div> <div class="row p-5 text-center"></div> </footer>`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/components/section/Footer.astro", void 0);

const favicon = new Proxy({"src":"/astro-bootstrap-hypnos-preview/astro/favicon.Czy1EQHj.svg","width":128,"height":128,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/DEV/Astro/astro-bootstrap-hypnos/src/assets/favicon.svg";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("D:/DEV/Astro/astro-bootstrap-hypnos/src/assets/favicon.svg");
							return target[name];
						}
					});

const $$Astro = createAstro("https://joseantanaper.github.io/astro-bootstrap-hypnos-preview");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const faviconSvg = await getImage({ src: favicon, format: "svg" });
  const lang = getLangFromUrl(Astro2.url);
  const {
    header = false,
    navbar = false,
    subtitle,
    details,
    hidden = 0
  } = Astro2.props;
  return renderTemplate`<html${addAttribute(lang, "lang")}> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" type="image/svg+xml"${addAttribute(faviconSvg.src, "href")}><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>
      ${app.config.title}
      ${app.config.subtitle}
      ${subtitle ? " | " + subtitle : null}
    </title>${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}${renderHead()}</head> <body class="app-crystal-blur"> <video class="app-fullscreen-bg" autoplay muted loop id="myVideo"> <source${addAttribute(neuro720, "src")} type="video/mp4"> <source${addAttribute(neuro360, "src")} type="video/mp4"> </video> ${header && renderTemplate`${renderComponent($$result, "Header", $$Header, {})}`} ${navbar && renderTemplate`${renderComponent($$result, "Navmain", $$Navmain, {})}`} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})}   </body> </html>`;
}, "D:/DEV/Astro/astro-bootstrap-hypnos/src/layouts/Layout.astro", void 0);

export { $$Iconx as $, globalService as a, $$Weather as b, getCollection as c, $$Layout as d, $$Link as e, $$LocaleSelector as f, getLangFromUrl as g, $$Image as h, $$AddressCard as i, hypnosHead as j, languageSelector as l, useTranslations as u };
