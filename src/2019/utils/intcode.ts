const MAX_STEPS = 10_000_000;

const MODE_POSITION = 0;
const MODE_IMMEDIATE = 1;
const MODE_RELATIVE = 2;

export const parseProgram = (input: string): number[] =>
  input.split(',').map((s) => Number(s.trim()));

export type StepResult = {
  output?: number;
  halted: boolean;
  awaitingInput: boolean;
};

export class IntcodeMachine {
  private memory: Map<number, number>;
  private pointer = 0;
  private relativeBase = 0;
  private inputQueue: number[] = [];
  private steps = 0;
  public outputs: number[] = [];
  public halted = false;
  public awaitingInput = false;

  constructor(program: number[]) {
    this.memory = new Map();
    program.forEach((v, i) => this.memory.set(i, v));
  }

  public pushInput(n: number): void {
    this.inputQueue.push(n);
    this.awaitingInput = false;
  }

  public getMemorySnapshot(size: number): number[] {
    return Array.from({ length: size }, (_, i) => this.read(i));
  }

  public step(): void {
    if (this.halted || this.awaitingInput) return;
    if (++this.steps > MAX_STEPS)
      throw new Error('Intcode step limit exceeded');

    const instruction = this.read(this.pointer);
    const opcode = instruction % 100;
    const modes = Math.floor(instruction / 100);

    switch (opcode) {
      case 1: {
        const a = this.readParam(modes, 1);
        const b = this.readParam(modes, 2);
        this.write(this.writeAddr(modes, 3), a + b);
        this.pointer += 4;
        break;
      }
      case 2: {
        const a = this.readParam(modes, 1);
        const b = this.readParam(modes, 2);
        this.write(this.writeAddr(modes, 3), a * b);
        this.pointer += 4;
        break;
      }
      case 3: {
        if (this.inputQueue.length === 0) {
          this.awaitingInput = true;
          return;
        }
        const value = this.inputQueue.shift() as number;
        this.write(this.writeAddr(modes, 1), value);
        this.pointer += 2;
        break;
      }
      case 4: {
        this.outputs.push(this.readParam(modes, 1));
        this.pointer += 2;
        break;
      }
      case 5: {
        const cond = this.readParam(modes, 1);
        const target = this.readParam(modes, 2);
        this.pointer = cond !== 0 ? target : this.pointer + 3;
        break;
      }
      case 6: {
        const cond = this.readParam(modes, 1);
        const target = this.readParam(modes, 2);
        this.pointer = cond === 0 ? target : this.pointer + 3;
        break;
      }
      case 7: {
        const a = this.readParam(modes, 1);
        const b = this.readParam(modes, 2);
        this.write(this.writeAddr(modes, 3), a < b ? 1 : 0);
        this.pointer += 4;
        break;
      }
      case 8: {
        const a = this.readParam(modes, 1);
        const b = this.readParam(modes, 2);
        this.write(this.writeAddr(modes, 3), a === b ? 1 : 0);
        this.pointer += 4;
        break;
      }
      case 9: {
        this.relativeBase += this.readParam(modes, 1);
        this.pointer += 2;
        break;
      }
      case 99: {
        this.halted = true;
        break;
      }
      default:
        throw new Error(`Unknown opcode ${opcode} at ptr ${this.pointer}`);
    }
  }

  public runUntilOutputOrHalt(): StepResult {
    const startOutputs = this.outputs.length;
    while (
      !this.halted &&
      !this.awaitingInput &&
      this.outputs.length === startOutputs
    ) {
      this.step();
    }
    return {
      output:
        this.outputs.length > startOutputs
          ? this.outputs[this.outputs.length - 1]
          : undefined,
      halted: this.halted,
      awaitingInput: this.awaitingInput,
    };
  }

  public runToHalt(): number[] {
    while (!this.halted) {
      if (this.awaitingInput)
        throw new Error('Intcode awaiting input with empty queue');
      this.step();
    }
    return this.outputs;
  }

  private read(addr: number): number {
    return this.memory.get(addr) ?? 0;
  }

  private write(addr: number, value: number): void {
    this.memory.set(addr, value);
  }

  private modeAt(modes: number, paramIndex: number): number {
    return Math.floor(modes / Math.pow(10, paramIndex - 1)) % 10;
  }

  private readParam(modes: number, paramIndex: number): number {
    const mode = this.modeAt(modes, paramIndex);
    const raw = this.read(this.pointer + paramIndex);
    if (mode === MODE_POSITION) return this.read(raw);
    if (mode === MODE_IMMEDIATE) return raw;
    if (mode === MODE_RELATIVE) return this.read(this.relativeBase + raw);
    throw new Error(`Unknown read mode ${mode}`);
  }

  private writeAddr(modes: number, paramIndex: number): number {
    const mode = this.modeAt(modes, paramIndex);
    const raw = this.read(this.pointer + paramIndex);
    if (mode === MODE_POSITION) return raw;
    if (mode === MODE_RELATIVE) return this.relativeBase + raw;
    throw new Error(`Cannot write in mode ${mode}`);
  }
}

export const runIntcode = (
  program: number[],
  inputs: number[] = [],
): number[] => {
  const machine = new IntcodeMachine(program);
  inputs.forEach((i) => machine.pushInput(i));
  return machine.runToHalt();
};

export const runIntcodeMemory = (program: number[]): number[] => {
  const machine = new IntcodeMachine(program);
  machine.runToHalt();
  return machine.getMemorySnapshot(program.length);
};
