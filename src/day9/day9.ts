export const day9 = (input: string[]) => {
  const points = input.map((line) => line.split(',').map(Number));

  let maxArea = 0;
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[j];
      const area = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
      if (area > maxArea) maxArea = area;
    }
  }
  return maxArea;
};
