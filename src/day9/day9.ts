import { Coords, Grid } from '../utils/grid';

const parseRedTiles = (input: string[]): Coords[] =>
  input.map((line) => {
    const [col, row] = line.split(',').map(Number);
    return { x: row, y: col };
  });

const buildGrid = (redTiles: Coords[]) => {
  const numRows = Math.max(...redTiles.map((p) => p.x)) + 1;
  const numCols = Math.max(...redTiles.map((p) => p.y)) + 1;
  const grid = new Grid<boolean>(numRows, numCols, false);
  redTiles.forEach((p) => grid.set(p, true));
  return grid;
};

export const day9 = (input: string[]) => {
  const validInput = input.filter((line) => line.trim() !== '');
  if (validInput.length === 0) return 0;
  const grid = buildGrid(parseRedTiles(validInput));
  const redTiles = grid.findValueInGrid(true);

  let maxArea = 0;
  for (let i = 0; i < redTiles.length; i++) {
    for (let j = i + 1; j < redTiles.length; j++) {
      const { x: x1, y: y1 } = redTiles[i];
      const { x: x2, y: y2 } = redTiles[j];
      const area = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
      if (area > maxArea) maxArea = area;
    }
  }
  return maxArea;
};
