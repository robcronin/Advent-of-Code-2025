import { createGridFromInput, Grid } from '../utils/grid';

enum Value {
  EMPTY = '.',
  RAY = 'S',
  SPLIT = '^',
}

export const day7 = (input: string[]) => {
  const grid = createGridFromInput(input);
  let numSplits = 0;
  for (let x = 0; x < grid.numRows - 1; x++) {
    for (let y = 0; y < grid.numCols; y++) {
      if (grid.get({ x, y }) === Value.RAY) {
        if (grid.get({ x: x + 1, y }) === Value.SPLIT) {
          numSplits++;
          grid.setIfValid({ x: x + 1, y: y - 1 }, Value.RAY);
          grid.setIfValid({ x: x + 1, y: y + 1 }, Value.RAY);
        } else {
          grid.set({ x: x + 1, y }, Value.RAY);
        }
      }
    }
  }
  return numSplits;
};

const getRayColInRow = (grid: Grid<string>, row: number) => {
  let startingCol = 0;
  for (let y = 0; y < grid.numCols; y++) {
    const value = grid.get({ x: row, y });
    if (value === 'S' || value === '|') {
      startingCol = y;
      break;
    }
  }
  return startingCol;
};

const getNumTimelines = (
  grid: Grid<string>,
  row: number,
  cache: Record<string, number> = {},
): number => {
  if (row === grid.numRows - 1) return 0;
  const y = getRayColInRow(grid, row);
  const key = `${row},${y}`;
  if (cache[key]) return cache[key];

  let ans = 0;
  if (grid.get({ x: row + 1, y }) === Value.EMPTY) {
    grid.set({ x: row + 1, y }, Value.RAY);
    ans = getNumTimelines(grid, row + 1, cache);
  } else {
    const leftGrid = grid.createDeepCopy();
    leftGrid.set({ x: row + 1, y: y - 1 }, Value.RAY);
    const leftNum = getNumTimelines(leftGrid, row + 1, cache);

    const rightGrid = grid.createDeepCopy();
    rightGrid.set({ x: row + 1, y: y + 1 }, Value.RAY);
    const rightNum = getNumTimelines(rightGrid, row + 1, cache);

    ans = leftNum + rightNum + 1;
  }

  cache[key] = ans;
  return ans;
};

export const day7part2 = (input: string[]) => {
  const grid = createGridFromInput(input);
  return getNumTimelines(grid, 0) + 1;
};
