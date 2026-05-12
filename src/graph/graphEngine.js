const fs = require('fs');
const path = require('path');
const asciichart = require('asciichart');
const { PNG } = require('pngjs');
const { evaluate } = require('../calc/calcEngine');

function parseSize(size = '80x20') {
  const [widthText, heightText] = String(size).toLowerCase().split('x');
  const width = Math.max(20, Number(widthText) || 80);
  const height = Math.max(10, Number(heightText) || 20);
  return { width, height };
}

function ensureExportsDir() {
  const dir = path.join(process.cwd(), 'exports');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}

function sampleSeries(expression, width, minX = -10, maxX = 10) {
  const values = [];
  for (let i = 0; i < width; i += 1) {
    const x = minX + (i / (width - 1)) * (maxX - minX);
    try {
      const y = Number(evaluate(expression, { x }));
      values.push(Number.isFinite(y) ? y : NaN);
    } catch (_error) {
      values.push(NaN);
    }
  }
  return values;
}

function plotAscii(expression, options = {}) {
  const size = parseSize(options.size);
  const values = sampleSeries(expression, size.width, options.minX, options.maxX);
  const chart = asciichart.plot(values, { height: size.height - 3, format: (n) => n.toFixed(2) });
  return [chart, `x:[${options.minX ?? -10}, ${options.maxX ?? 10}]  y=f(x)  formula=${expression}`].join('\n');
}

function buildSvg(values, width, height) {
  const finite = values.filter((v) => Number.isFinite(v));
  const minY = finite.length ? Math.min(...finite) : -1;
  const maxY = finite.length ? Math.max(...finite) : 1;
  const range = maxY - minY || 1;

  const points = values
    .map((value, i) => {
      const x = (i / (values.length - 1 || 1)) * (width - 1);
      const y = Number.isFinite(value) ? height - 1 - ((value - minY) / range) * (height - 1) : null;
      return y === null ? null : `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .filter(Boolean)
    .join(' ');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n  <rect width="100%" height="100%" fill="white"/>\n  <line x1="0" y1="${height / 2}" x2="${width}" y2="${height / 2}" stroke="#ccc"/>\n  <line x1="${width / 2}" y1="0" x2="${width / 2}" y2="${height}" stroke="#ccc"/>\n  <polyline points="${points}" fill="none" stroke="#2563eb" stroke-width="2"/>\n</svg>\n`;
}

function drawPng(values, width, height, targetPath) {
  const png = new PNG({ width, height });

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = (width * y + x) << 2;
      png.data[idx] = 255;
      png.data[idx + 1] = 255;
      png.data[idx + 2] = 255;
      png.data[idx + 3] = 255;
    }
  }

  const finite = values.filter((v) => Number.isFinite(v));
  const minY = finite.length ? Math.min(...finite) : -1;
  const maxY = finite.length ? Math.max(...finite) : 1;
  const range = maxY - minY || 1;

  values.forEach((value, i) => {
    if (!Number.isFinite(value)) {
      return;
    }
    const px = Math.floor((i / (values.length - 1 || 1)) * (width - 1));
    const py = Math.floor(height - 1 - ((value - minY) / range) * (height - 1));
    const idx = (width * py + px) << 2;
    png.data[idx] = 37;
    png.data[idx + 1] = 99;
    png.data[idx + 2] = 235;
    png.data[idx + 3] = 255;
  });

  fs.writeFileSync(targetPath, PNG.sync.write(png));
}

function exportGraph(expression, options = {}) {
  const format = String(options.format || 'svg').toLowerCase();
  const size = parseSize(options.size || '640x360');
  const values = sampleSeries(expression, Math.max(64, size.width), options.minX, options.maxX);
  const timestamp = new Date().toISOString().replace(/[.:]/g, '-');
  const filePath = path.join(ensureExportsDir(), `graph-${timestamp}.${format}`);

  if (format === 'svg') {
    fs.writeFileSync(filePath, buildSvg(values, size.width, size.height));
    return filePath;
  }

  if (format === 'png') {
    drawPng(values, size.width, size.height, filePath);
    return filePath;
  }

  throw new Error('graph: format must be svg or png for export.');
}

module.exports = {
  parseSize,
  plotAscii,
  exportGraph,
};
