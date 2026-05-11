const fuelForMass = (mass: number): number => Math.floor(mass / 3) - 2;

const totalFuel = (mass: number): number => {
  let total = 0;
  let current = fuelForMass(mass);
  while (current > 0) {
    total += current;
    current = fuelForMass(current);
  }
  return total;
};

export const day1 = (input: string[]) => {
  if (input.length === 0) return 0;
  return input.reduce((sum, line) => sum + fuelForMass(Number(line)), 0);
};

export const day1part2 = (input: string[]) => {
  if (input.length === 0) return 0;
  return input.reduce((sum, line) => sum + totalFuel(Number(line)), 0);
};
