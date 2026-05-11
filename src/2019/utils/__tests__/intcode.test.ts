import { IntcodeMachine, parseProgram, runIntcode, runIntcodeMemory } from '../intcode';

describe('intcode', () => {
  describe('parseProgram', () => {
    it('parses comma-separated integers', () => {
      expect(parseProgram('1,2,3,4,99')).toEqual([1, 2, 3, 4, 99]);
    });
  });

  describe('add/mul/halt (day 2)', () => {
    it.each([
      [[1, 0, 0, 0, 99], [2, 0, 0, 0, 99]],
      [[2, 3, 0, 3, 99], [2, 3, 0, 6, 99]],
      [[2, 4, 4, 5, 99, 0], [2, 4, 4, 5, 99, 9801]],
      [[1, 1, 1, 4, 99, 5, 6, 0, 99], [30, 1, 1, 4, 2, 5, 6, 0, 99]],
    ])('runs %j -> %j', (program, expected) => {
      expect(runIntcodeMemory(program)).toEqual(expected);
    });

    it('runs example program to mem[0] = 3500', () => {
      expect(
        runIntcodeMemory([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50])[0],
      ).toBe(3500);
    });
  });

  describe('input/output and modes (day 5)', () => {
    it('echoes input', () => {
      expect(runIntcode([3, 0, 4, 0, 99], [42])).toEqual([42]);
    });

    it('handles immediate mode and negative numbers', () => {
      expect(runIntcodeMemory([1101, 100, -1, 4, 0])[4]).toBe(99);
    });

    it('position equal-to-8', () => {
      const prog = [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8];
      expect(runIntcode(prog, [8])).toEqual([1]);
      expect(runIntcode(prog, [7])).toEqual([0]);
    });

    it('position less-than-8', () => {
      const prog = [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8];
      expect(runIntcode(prog, [7])).toEqual([1]);
      expect(runIntcode(prog, [8])).toEqual([0]);
    });

    it('immediate equal-to-8', () => {
      const prog = [3, 3, 1108, -1, 8, 3, 4, 3, 99];
      expect(runIntcode(prog, [8])).toEqual([1]);
      expect(runIntcode(prog, [7])).toEqual([0]);
    });

    it('immediate less-than-8', () => {
      const prog = [3, 3, 1107, -1, 8, 3, 4, 3, 99];
      expect(runIntcode(prog, [7])).toEqual([1]);
      expect(runIntcode(prog, [8])).toEqual([0]);
    });

    it('jump tests output 0 for zero input, 1 otherwise (position mode)', () => {
      const prog = [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9];
      expect(runIntcode(prog, [0])).toEqual([0]);
      expect(runIntcode(prog, [5])).toEqual([1]);
    });

    it('larger comparison example: outputs 999/1000/1001 around 8', () => {
      const prog = [
        3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31,
        1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104, 999,
        1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99,
      ];
      expect(runIntcode(prog, [7])).toEqual([999]);
      expect(runIntcode(prog, [8])).toEqual([1000]);
      expect(runIntcode(prog, [9])).toEqual([1001]);
    });
  });

  describe('relative base and large memory (day 9)', () => {
    it('quine outputs itself', () => {
      const prog = [
        109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99,
      ];
      expect(runIntcode(prog)).toEqual(prog);
    });

    it('16-digit number', () => {
      expect(runIntcode([1102, 34915192, 34915192, 7, 4, 7, 99, 0])).toEqual([
        1219070632396864,
      ]);
    });

    it('outputs large literal', () => {
      expect(runIntcode([104, 1125899906842624, 99])).toEqual([
        1125899906842624,
      ]);
    });
  });

  describe('IntcodeMachine pause-on-input', () => {
    it('pauses when input queue empty and resumes on pushInput', () => {
      const m = new IntcodeMachine([3, 0, 4, 0, 99]);
      const r1 = m.runUntilOutputOrHalt();
      expect(r1.awaitingInput).toBe(true);
      expect(r1.halted).toBe(false);
      m.pushInput(7);
      const r2 = m.runUntilOutputOrHalt();
      expect(r2.output).toBe(7);
      m.runUntilOutputOrHalt();
      expect(m.halted).toBe(true);
    });
  });
});
