import { getPermutations } from '../../utils/permute';
import { IntcodeMachine } from '../utils/intcode';

const runAmplifierChain = (program: number[], phases: number[]): number => {
  let signal = 0;
  for (const phase of phases) {
    const m = new IntcodeMachine(program);
    m.pushInput(phase);
    m.pushInput(signal);
    m.runToHalt();
    signal = m.outputs[m.outputs.length - 1];
  }
  return signal;
};

const runFeedbackLoop = (program: number[], phases: number[]): number => {
  const machines = phases.map((phase) => {
    const m = new IntcodeMachine(program);
    m.pushInput(phase);
    return m;
  });
  let signal = 0;
  let lastOutputOfE = 0;
  let safety = 0;
  const last = machines.length - 1;
  while (!machines[last].halted) {
    if (++safety > 1_000_000)
      throw new Error('Day 7 part 2 feedback-loop guard exceeded');
    for (let i = 0; i < machines.length; i++) {
      const m = machines[i];
      if (m.halted) continue;
      m.pushInput(signal);
      const result = m.runUntilOutputOrHalt();
      if (result.output !== undefined) {
        signal = result.output;
        if (i === last) lastOutputOfE = result.output;
      }
    }
  }
  return lastOutputOfE;
};

const maxOverPermutations = (
  program: number[],
  phases: number[],
  runner: (program: number[], phases: number[]) => number,
): number => {
  let best = -Infinity;
  for (const perm of getPermutations(phases)) {
    const signal = runner(program, perm);
    if (signal > best) best = signal;
  }
  return best === -Infinity ? 0 : best;
};

export const day7 = (input: string[]): number => {
  if (input.length === 0) return 0;
  return maxOverPermutations(
    input as unknown as number[],
    [0, 1, 2, 3, 4],
    runAmplifierChain,
  );
};

export const day7part2 = (input: string[]): number => {
  if (input.length === 0) return 0;
  return maxOverPermutations(
    input as unknown as number[],
    [5, 6, 7, 8, 9],
    runFeedbackLoop,
  );
};
