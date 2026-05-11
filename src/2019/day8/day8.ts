const splitIntoLayers = (input: string, layerSize: number): string[] => {
  const layers: string[] = [];
  for (let i = 0; i < input.length; i += layerSize) {
    layers.push(input.slice(i, i + layerSize));
  }
  return layers;
};

const countChar = (s: string, c: string): number => {
  let n = 0;
  for (const ch of s) if (ch === c) n++;
  return n;
};

export const solvePart1 = (
  input: string,
  width: number,
  height: number,
): number => {
  const layers = splitIntoLayers(input, width * height);
  let best = layers[0];
  let bestZeros = countChar(layers[0], '0');
  for (let i = 1; i < layers.length; i++) {
    const z = countChar(layers[i], '0');
    if (z < bestZeros) {
      best = layers[i];
      bestZeros = z;
    }
  }
  return countChar(best, '1') * countChar(best, '2');
};

export const solvePart2 = (
  input: string,
  width: number,
  height: number,
): string => {
  const layerSize = width * height;
  const layers = splitIntoLayers(input, layerSize);
  const composite: string[] = [];
  for (let p = 0; p < layerSize; p++) {
    let pixel = '2';
    for (const layer of layers) {
      if (layer[p] !== '2') {
        pixel = layer[p];
        break;
      }
    }
    composite.push(pixel);
  }
  const rows: string[] = [];
  for (let row = 0; row < height; row++) {
    let line = '';
    for (let col = 0; col < width; col++) {
      line += composite[row * width + col] === '1' ? '#' : ' ';
    }
    rows.push(line);
  }
  return rows.join('\n');
};

const WIDTH = 25;
const HEIGHT = 6;

export const day8 = (input: string[]): number => {
  if (input.length === 0) return 0;
  return solvePart1(input[0], WIDTH, HEIGHT);
};

export const day8part2 = (input: string[]): string => {
  if (input.length === 0) return '';
  return solvePart2(input[0], WIDTH, HEIGHT);
};
