import { sumArr } from '../utils/array';

type Range = { start: number; end: number };

const parseRanges = (input: string[]): Range[] =>
  input.map((line) => {
    const [start, end] = line.split('-');
    return { start: +start, end: +end };
  });

const simpleIsValidId = (id: number): boolean => {
  const idString = id.toString();
  const idLength = idString.length;
  return idString.slice(0, idLength / 2) !== idString.slice(idLength / 2);
};

const isValidId = (id: number): boolean => {
  const idString = id.toString();
  const idLength = idString.length;

  for (let repeatLength = 1; repeatLength <= idLength / 2; repeatLength++) {
    if (idLength % repeatLength === 0) {
      const potentialPattern = idString.slice(0, repeatLength);
      let isRepeating = true;
      for (let i = 1; i < idLength / repeatLength; i++) {
        if (
          idString.slice(i * repeatLength, (i + 1) * repeatLength) !==
          potentialPattern
        )
          isRepeating = false;
      }
      if (isRepeating) return false;
    }
  }
  return true;
};

const countInvalidIds = (ranges: Range[], isValidId: (id: number) => boolean) =>
  sumArr(ranges, (range) => {
    let innerSum = 0;
    for (let i = range.start; i <= range.end; i++) {
      if (!isValidId(i)) innerSum += i;
    }
    return innerSum;
  });

export const day2 = (input: string[]) => {
  const ranges = parseRanges(input);
  return countInvalidIds(ranges, simpleIsValidId);
};

export const day2part2 = (input: string[]) => {
  const ranges = parseRanges(input);
  return countInvalidIds(ranges, isValidId);
};
