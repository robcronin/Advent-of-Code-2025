import { getGcd } from '../../utils/maths';

type Point = { x: number; y: number };

const parseAsteroids = (grid: string[]): Point[] => {
  const result: Point[] = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === '#') result.push({ x, y });
    }
  }
  return result;
};

const countVisibleFrom = (asteroids: Point[], origin: Point): number => {
  const directions = new Set<string>();
  for (const a of asteroids) {
    if (a.x === origin.x && a.y === origin.y) continue;
    const dx = a.x - origin.x;
    const dy = a.y - origin.y;
    const g = getGcd(Math.abs(dx), Math.abs(dy));
    directions.add(`${dx / g},${dy / g}`);
  }
  return directions.size;
};

const findBestStation = (
  asteroids: Point[],
): { point: Point; count: number } => {
  let best = { point: asteroids[0], count: 0 };
  for (const a of asteroids) {
    const count = countVisibleFrom(asteroids, a);
    if (count > best.count) best = { point: a, count };
  }
  return best;
};

const computeAngle = (dx: number, dy: number): number => {
  const a = Math.atan2(dx, -dy);
  return (a + 2 * Math.PI) % (2 * Math.PI);
};

export const day10 = (input: string[]): number => {
  if (input.length === 0) return 0;
  const asteroids = parseAsteroids(input);
  if (asteroids.length === 0) return 0;
  return findBestStation(asteroids).count;
};

type Entry = { x: number; y: number; angle: number; dist: number };

export const day10part2 = (input: string[], targetIndex = 200): number => {
  if (input.length === 0) return 0;
  const asteroids = parseAsteroids(input);
  if (asteroids.length === 0) return 0;
  const station = findBestStation(asteroids).point;

  const others: Entry[] = [];
  for (const a of asteroids) {
    if (a.x === station.x && a.y === station.y) continue;
    const dx = a.x - station.x;
    const dy = a.y - station.y;
    others.push({
      x: a.x,
      y: a.y,
      angle: computeAngle(dx, dy),
      dist: dx * dx + dy * dy,
    });
  }

  const byAngle = new Map<number, Entry[]>();
  for (const e of others) {
    if (!byAngle.has(e.angle)) byAngle.set(e.angle, []);
    (byAngle.get(e.angle) as Entry[]).push(e);
  }
  for (const group of byAngle.values()) group.sort((a, b) => a.dist - b.dist);
  const sortedAngles = [...byAngle.keys()].sort((a, b) => a - b);

  let vaporized = 0;
  let target: Entry | null = null;
  let safety = 0;
  while (vaporized < targetIndex) {
    if (++safety > 1_000_000)
      throw new Error('Day 10 part 2 vaporization safety exceeded');
    let removedThisPass = 0;
    for (const angle of sortedAngles) {
      const group = byAngle.get(angle) as Entry[];
      if (group.length === 0) continue;
      const victim = group.shift() as Entry;
      vaporized++;
      removedThisPass++;
      if (vaporized === targetIndex) {
        target = victim;
        break;
      }
    }
    if (target) break;
    if (removedThisPass === 0) break;
  }
  if (!target) return 0;
  return target.x * 100 + target.y;
};
