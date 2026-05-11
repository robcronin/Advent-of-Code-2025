import { runIntcode } from '../utils/intcode';

const runWithDiagnosticInput = (
  program: number[],
  inputValue: number,
): number => {
  const outputs = runIntcode(program, [inputValue]);
  if (outputs.length === 0) return 0;
  return outputs[outputs.length - 1];
};

export const day5 = (input: string[]): number => {
  if (input.length === 0) return 0;
  return runWithDiagnosticInput(input as unknown as number[], 1);
};

export const day5part2 = (input: string[]): number => {
  if (input.length === 0) return 0;
  return runWithDiagnosticInput(input as unknown as number[], 5);
};
