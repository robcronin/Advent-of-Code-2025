import { parseInput } from '../../utils/input';

const testString = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`;

const testStringPart2 = `${testString}
K)YOU
I)SAN`;

const input = ``;

export const testData = parseInput(testString) as string[];
export const testDataPart2 = parseInput(testStringPart2) as string[];
export const data = parseInput(input) as string[];
