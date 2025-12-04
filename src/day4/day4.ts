import { countArr } from '../utils/array';
import { createGridFromInput, Grid } from '../utils/grid';

const countPossibleRemovals = (grid: Grid<string>, doRemove?: boolean) => {
  let numRemovals = 0;
  for (let x = 0; x < grid.numRows; x++) {
    for (let y = 0; y < grid.numCols; y++) {
      if (grid.get({ x, y }) === '@') {
        const neighbours = grid.getNeighbours({ x, y }, true);
        const rollNeighbours = countArr(neighbours, (n) => grid.get(n) === '@');
        if (rollNeighbours < 4) {
          numRemovals++;
          if (doRemove) grid.set({ x, y }, '.');
        }
      }
    }
  }
  return numRemovals;
};

export const day4 = (input: string[]) => {
  const grid = createGridFromInput(input);
  return countPossibleRemovals(grid);
};

export const day4part2 = (input: string[]) => {
  const grid = createGridFromInput(input);

  let removedThisTime: number;
  let totalRemovals = 0;
  do {
    removedThisTime = countPossibleRemovals(grid, true);
    totalRemovals += removedThisTime;
  } while (removedThisTime > 0);

  return totalRemovals;
};
