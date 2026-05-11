import { parseInput } from '../../utils/input';

const testString = `3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0`;
const testStringPart2 = `3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5`;

const input = ``;

export const testData = parseInput(testString) as string[];
export const testDataPart2 = parseInput(testStringPart2) as string[];
export const data = parseInput(input) as string[];
