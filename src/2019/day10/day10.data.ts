import { parseInput } from '../../utils/input';

const testString = `.#..#
.....
#####
....#
...##`;

const testStringPart2 = `.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`;

const input = ``;

export const testData = parseInput(testString) as string[];
export const testDataPart2 = parseInput(testStringPart2) as string[];
export const data = parseInput(input) as string[];
