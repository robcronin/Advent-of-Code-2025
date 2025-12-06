import { countArr, sumArr } from '../utils/array';
import { parseInput } from '../utils/input';

type Range = { start: number; end: number };
type Ingredients = number[];

const parseIngredients = (
  input: string[],
): { freshRanges: Range[]; ingredientIds: Ingredients } => {
  const [rangeStrings, ingredientIds] = input.map((lines) => parseInput(lines));
  const freshRanges = rangeStrings.map((rangeString) => {
    const [start, end] = (rangeString as string).split('-');
    return { start: +start, end: +end };
  });
  return { freshRanges, ingredientIds: ingredientIds as number[] };
};

const isIngredientFresh = (ingredientId: number, freshRanges: Range[]) =>
  freshRanges.some((range) => {
    const { start, end } = range;
    return ingredientId >= start && ingredientId <= end;
  });

export const day5 = (input: string[]) => {
  const { freshRanges, ingredientIds } = parseIngredients(input);
  return countArr(ingredientIds, (ingredientId) =>
    isIngredientFresh(ingredientId, freshRanges),
  );
};

export const day5part2 = (input: string[]) => {
  const { freshRanges } = parseIngredients(input);
  let mergedRanges: Range[] = [];
  freshRanges.forEach((range) => {
    mergedRanges.push(range);
    let needsMerge = true;
    while (needsMerge) {
      needsMerge = false;

      mergedRanges = mergedRanges
        .sort((rangeA, rangeB) => rangeA.start - rangeB.start)
        .filter((range) => !(range.start === -1 && range.end === -1));

      for (let i = 0; i < mergedRanges.length - 1; i++) {
        if (mergedRanges[i].end >= mergedRanges[i + 1].start) {
          needsMerge = true;
          mergedRanges[i].end = Math.max(
            mergedRanges[i].end,
            mergedRanges[i + 1].end,
          );
          mergedRanges[i + 1].start = -1;
          mergedRanges[i + 1].end = -1;
        }
      }
    }
  });

  return sumArr(mergedRanges, (range) => range.end - range.start + 1);
};
