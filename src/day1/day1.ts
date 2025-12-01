type Direction = 'L' | 'R';
type Rotation = {
  direction: Direction;
  distance: number;
};
const DIAL_SIZE = 100;

const parseInput = (input: string[]): Rotation[] =>
  input.map((line) => {
    const direction = line[0] as Direction;
    const distance = +line.slice(1);
    return { direction, distance };
  });

const runRotations = (rotations: Rotation[]) =>
  rotations.reduce(
    (acc, rotation) => {
      const { direction, distance } = rotation;
      const multiplier = direction === 'L' ? -1 : 1;
      const newPoint =
        (((acc.point + multiplier * distance) % DIAL_SIZE) + DIAL_SIZE) %
        DIAL_SIZE;

      const offsetNeeded =
        direction === 'L' ? acc.point : (DIAL_SIZE - acc.point) % DIAL_SIZE;

      const firstHitZero =
        offsetNeeded !== 0 && distance >= offsetNeeded ? 1 : 0;
      const extraRotationZeroes =
        distance > DIAL_SIZE
          ? Math.floor((distance - offsetNeeded) / DIAL_SIZE)
          : 0;

      return {
        point: newPoint,
        numExactZeroes: acc.numExactZeroes + (newPoint === 0 ? 1 : 0),
        numZeroPasses: acc.numZeroPasses + firstHitZero + extraRotationZeroes,
      };
    },
    { point: 50, numExactZeroes: 0, numZeroPasses: 0 },
  );

export const day1 = (input: string[]) =>
  runRotations(parseInput(input)).numExactZeroes;

export const day1part2 = (input: string[]) =>
  runRotations(parseInput(input)).numZeroPasses;
