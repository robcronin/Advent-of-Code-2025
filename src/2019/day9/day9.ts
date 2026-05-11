import { runIntcode } from '../utils/intcode';

const runBoost = (program: number[], inputValue: number): number => {
  const outputs = runIntcode(program, [inputValue]);
  if (outputs.length === 0) return 0;
  return outputs[outputs.length - 1];
};

export const day9 = (input: string[]): number => {
  if (input.length === 0) return 0;
  return runBoost(input as unknown as number[], 1);
};

export const day9part2 = (input: string[]): number => {
  if (input.length === 0) return 0;
  return runBoost(input as unknown as number[], 2);
};
