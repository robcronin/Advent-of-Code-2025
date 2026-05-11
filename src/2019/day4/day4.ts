const toDigits = (n: number): number[] => n.toString().split('').map(Number);

const isNonDecreasing = (ds: number[]): boolean => {
  for (let i = 1; i < ds.length; i++) {
    if (ds[i] < ds[i - 1]) return false;
  }
  return true;
};

const hasAdjacentPair = (ds: number[]): boolean => {
  for (let i = 1; i < ds.length; i++) {
    if (ds[i] === ds[i - 1]) return true;
  }
  return false;
};

const hasGroupOfExactlyTwo = (ds: number[]): boolean => {
  let i = 0;
  while (i < ds.length) {
    let j = i;
    while (j < ds.length && ds[j] === ds[i]) j++;
    if (j - i === 2) return true;
    i = j;
  }
  return false;
};

export const isValidPart1 = (n: number): boolean => {
  const ds = toDigits(n);
  return ds.length === 6 && isNonDecreasing(ds) && hasAdjacentPair(ds);
};

export const isValidPart2 = (n: number): boolean => {
  const ds = toDigits(n);
  return ds.length === 6 && isNonDecreasing(ds) && hasGroupOfExactlyTwo(ds);
};

const parseRange = (input: string[]): [number, number] => {
  const [low, high] = input[0].split('-').map(Number);
  return [low, high];
};

export const day4 = (input: string[]): number => {
  if (input.length === 0) return 0;
  const [low, high] = parseRange(input);
  let count = 0;
  for (let n = low; n <= high; n++) if (isValidPart1(n)) count++;
  return count;
};

export const day4part2 = (input: string[]): number => {
  if (input.length === 0) return 0;
  const [low, high] = parseRange(input);
  let count = 0;
  for (let n = low; n <= high; n++) if (isValidPart2(n)) count++;
  return count;
};
