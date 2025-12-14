type ClosestConnection = [string, string, number];
type CircuitMap = Record<string, number>;

const getClosestConnections = (junctions: string[]) => {
  const closestConnections: ClosestConnection[] = [];
  for (let i = 0; i < junctions.length - 1; i++) {
    const [a, b, c] = junctions[i].split(',').map(Number);
    for (let j = i + 1; j < junctions.length; j++) {
      const [x, y, z] = junctions[j].split(',').map(Number);
      const distance = (a - x) ** 2 + (b - y) ** 2 + (c - z) ** 2;
      closestConnections.push([junctions[i], junctions[j], distance]);
    }
  }
  return closestConnections.sort((a, b) => a[2] - b[2]);
};

const getCircuitSizes = (circuitMap: CircuitMap) => {
  const circuitSizeMap: Record<string, number> = Object.keys(circuitMap).reduce(
    (acc: Record<string, number>, key) => ({
      ...acc,
      [circuitMap[key]]: (acc[circuitMap[key]] || 0) + 1,
    }),
    {},
  );
  return Object.values(circuitSizeMap).sort((a, b) => b - a);
};

const getNumCircuits = (circuitMap: CircuitMap) => {
  const circuitKeys = new Set();
  Object.values(circuitMap).forEach((key) => circuitKeys.add(key));
  return circuitKeys.size;
};

export const day8 = (input: string[], numConnections: number) => {
  const closestConnections = getClosestConnections(input);
  const circuitMap: CircuitMap = input.reduce(
    (acc, line, index) => ({ ...acc, [line]: index }),
    {},
  );
  closestConnections.slice(0, numConnections).forEach(([a, b]) => {
    const circuitToCollapse = circuitMap[a];
    const circuitToBecome = circuitMap[b];
    Object.keys(circuitMap).forEach((key) => {
      if (circuitMap[key] === circuitToCollapse) {
        circuitMap[key] = circuitToBecome;
      }
    });
  });
  const circuitSizes = getCircuitSizes(circuitMap);
  return circuitSizes[0] * circuitSizes[1] * circuitSizes[2];
};

export const day8part2 = (input: string[]) => {
  const closestConnections = getClosestConnections(input);
  const circuitMap: CircuitMap = input.reduce(
    (acc, line, index) => ({ ...acc, [line]: index }),
    {},
  );

  for (const connection of closestConnections) {
    const [a, b] = connection;
    const circuitToCollapse = circuitMap[a];
    const circuitToBecome = circuitMap[b];
    Object.keys(circuitMap).forEach((key) => {
      if (circuitMap[key] === circuitToCollapse) {
        circuitMap[key] = circuitToBecome;
      }
    });

    if (getNumCircuits(circuitMap) === 1)
      return +a.split(',')[0] * +b.split(',')[0];
  }
};
