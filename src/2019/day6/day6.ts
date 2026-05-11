const buildParents = (input: string[]): Map<string, string> => {
  const parents = new Map<string, string>();
  for (const line of input) {
    const [parent, child] = line.split(')');
    parents.set(child, parent);
  }
  return parents;
};

const depthFrom = (parents: Map<string, string>, node: string): number => {
  let depth = 0;
  let current = node;
  while (parents.has(current)) {
    current = parents.get(current) as string;
    depth++;
  }
  return depth;
};

const ancestorList = (
  parents: Map<string, string>,
  node: string,
): string[] => {
  const list: string[] = [];
  let current = node;
  while (parents.has(current)) {
    current = parents.get(current) as string;
    list.push(current);
  }
  return list;
};

export const day6 = (input: string[]): number => {
  if (input.length === 0) return 0;
  const parents = buildParents(input);
  let total = 0;
  for (const child of parents.keys()) total += depthFrom(parents, child);
  return total;
};

export const day6part2 = (input: string[]): number => {
  if (input.length === 0) return 0;
  const parents = buildParents(input);
  if (!parents.has('YOU') || !parents.has('SAN')) return 0;
  const youAncestors = ancestorList(parents, 'YOU');
  const sanAncestors = ancestorList(parents, 'SAN');
  const sanIndex = new Map<string, number>();
  sanAncestors.forEach((node, idx) => sanIndex.set(node, idx));
  for (let i = 0; i < youAncestors.length; i++) {
    const j = sanIndex.get(youAncestors[i]);
    if (j !== undefined) return i + j;
  }
  return -1;
};
