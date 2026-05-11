import { IntcodeMachine } from '../utils/intcode';

const runProgramReturnFirst = (program: number[]): number => {
  const machine = new IntcodeMachine(program);
  machine.runToHalt();
  return machine.getMemorySnapshot(program.length)[0];
};

export const day2 = (input: string[], modify = true): number => {
  if (input.length === 0) return 0;
  const program = (input as unknown as number[]).slice();
  if (modify) {
    program[1] = 12;
    program[2] = 2;
  }
  return runProgramReturnFirst(program);
};

const TARGET = 19690720;

export const day2part2 = (input: string[]): number => {
  if (input.length === 0) return 0;
  const program = input as unknown as number[];
  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const memory = program.slice();
      memory[1] = noun;
      memory[2] = verb;
      try {
        if (runProgramReturnFirst(memory) === TARGET) return 100 * noun + verb;
      } catch {
        // ignore invalid noun/verb combinations
      }
    }
  }
  return -1;
};
