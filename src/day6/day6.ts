import { maxArr, sumArr } from '../utils/array';

type Operation = '+' | '*';
type Problem = {
  inputs: number[];
  rtlInputs: number[];
  operation: Operation;
};

const parseProblems = (input: string[]): Problem[] => {
  const rows = input.map((line) => line.split(/\s+/));
  const problems: Problem[] = [];
  let currentOffset = 0;
  for (let i = 0; i < rows[0].length; i++) {
    const inputs = [];
    for (let j = 0; j < rows.length - 1; j++) {
      inputs.push(+rows[j][i]);
    }
    const operation = rows[rows.length - 1][i] as Operation;

    const maxOffset = maxArr(inputs, (x) => x.toString().length);
    const rtlInputs = [];
    for (let k = 0; k < maxOffset; k++) {
      let num = '';
      for (let j = 0; j < rows.length - 1; j++) {
        num += input[j][currentOffset + k] ?? '0';
      }
      rtlInputs.push(+num);
    }
    problems.push({ inputs, rtlInputs, operation });
    currentOffset += maxOffset + 1;
  }
  return problems;
};

const calculateProblem = (problem: Problem, isRtl?: boolean): number => {
  const { inputs, rtlInputs, operation } = problem;
  const inputsToUse = isRtl ? rtlInputs : inputs;
  if (operation === '+') return sumArr(inputsToUse, (x) => x);
  else return inputsToUse.reduce((acc, num) => acc * num, 1);
};

export const day6 = (input: string[]) => {
  const problems = parseProblems(input);
  return sumArr(problems, (problem) => calculateProblem(problem));
};

export const day6part2 = (input: string[]) => {
  const problems = parseProblems(input);
  return sumArr(problems, (problem) => calculateProblem(problem, true));
};
