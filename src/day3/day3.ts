import { maxArr, sumArr } from '../utils/array';

const getMaxValue = (string: string) =>
  maxArr(
    [...string].map((x) => +x),
    (x) => x,
  );

const getCacheKey = (bank: string, length: number) => `${bank}-${length}`;

const getMaxJoltage = (
  bank: string,
  length: number,
  cache: Record<string, number> = {},
): number => {
  const cacheKey = getCacheKey(bank, length);
  if (cache[cacheKey]) return cache[cacheKey];

  let maxStart = getMaxValue(bank.slice(0, bank.length - length + 1));
  if (length === 1) return maxStart;

  let max = 0;
  for (let i = 0; i <= bank.length - length; i++) {
    if (+bank[i] === maxStart) {
      max = Math.max(
        max,
        +`${maxStart}${getMaxJoltage(bank.slice(i + 1), length - 1, cache)}`,
      );
    }
  }
  cache[cacheKey] = max;
  return max;
};

export const day3 = (input: string[]) =>
  sumArr(input, (bank) => getMaxJoltage(bank, 2));

export const day3part2 = (input: string[]) =>
  sumArr(input, (bank) => getMaxJoltage(bank, 12));
