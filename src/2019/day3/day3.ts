const tracePath = (wire: string): Map<string, number> => {
  const path = new Map<string, number>();
  let x = 0;
  let y = 0;
  let step = 0;
  for (const move of wire.split(',')) {
    const dir = move[0];
    const dist = Number(move.slice(1));
    for (let i = 0; i < dist; i++) {
      if (dir === 'U') y++;
      else if (dir === 'D') y--;
      else if (dir === 'R') x++;
      else if (dir === 'L') x--;
      step++;
      const key = `${x},${y}`;
      if (!path.has(key)) path.set(key, step);
    }
  }
  return path;
};

export const day3 = (input: string[]): number => {
  if (input.length < 2) return 0;
  const a = tracePath(input[0]);
  const b = tracePath(input[1]);
  let best = Infinity;
  for (const key of a.keys()) {
    if (b.has(key)) {
      const [x, y] = key.split(',').map(Number);
      const dist = Math.abs(x) + Math.abs(y);
      if (dist < best) best = dist;
    }
  }
  return best === Infinity ? 0 : best;
};

export const day3part2 = (input: string[]): number => {
  if (input.length < 2) return 0;
  const a = tracePath(input[0]);
  const b = tracePath(input[1]);
  let best = Infinity;
  for (const [key, stepsA] of a) {
    const stepsB = b.get(key);
    if (stepsB !== undefined && stepsA + stepsB < best) best = stepsA + stepsB;
  }
  return best === Infinity ? 0 : best;
};
