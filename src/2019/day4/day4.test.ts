import { logAnswer } from '../../utils/logging';
import { day4, day4part2, isValidPart1, isValidPart2 } from './day4';
import { data, testData } from './day4.data';

describe('2019 day 4 — isValidPart1', () => {
  it.each([
    [111111, true],
    [223450, false],
    [123789, false],
  ])('isValidPart1(%i) = %s', (n, expected) => {
    expect(isValidPart1(n)).toBe(expected);
  });
});

describe('2019 day 4 — isValidPart2', () => {
  it.each([
    [112233, true],
    [123444, false],
    [111122, true],
  ])('isValidPart2(%i) = %s', (n, expected) => {
    expect(isValidPart2(n)).toBe(expected);
  });
});

describe('2019 day 4', () => {
  it('test cases (range 111111-111122)', () => {
    // 111111-111119 are all P1-valid (10 values? Let me recount: 111111..111119 = 9 values, plus 111122 = 10)
    expect(day4(testData)).toBe(10);
  });

  it('answer', () => {
    const answer = day4(data);
    logAnswer(answer, 4, 1);
    expect(typeof answer).toBe('number');
  });
});

describe('2019 day 4 part 2', () => {
  it('test cases (range 111111-111122)', () => {
    // Only 111122 has a group of exactly 2 (the trailing "22")
    expect(day4part2(testData)).toBe(1);
  });

  it('answer', () => {
    const answer = day4part2(data);
    logAnswer(answer, 4, 2);
    expect(typeof answer).toBe('number');
  });
});
