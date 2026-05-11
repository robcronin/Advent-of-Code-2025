import { logAnswer } from '../../utils/logging';
import { day10, day10part2 } from './day10';
import { data, testData, testDataPart2 } from './day10.data';

describe('2019 day 10', () => {
  it('test cases (5x5 map -> 8 visible from best station)', () => {
    expect(day10(testData)).toBe(8);
  });

  it('test cases (20x20 map -> 210 visible from (11,13))', () => {
    expect(day10(testDataPart2)).toBe(210);
  });

  it('answer', () => {
    const answer = day10(data);
    logAnswer(answer, 10, 1);
    expect(typeof answer).toBe('number');
  });
});

describe('2019 day 10 part 2', () => {
  it('test cases (200th vaporization on 20x20 -> 802)', () => {
    expect(day10part2(testDataPart2, 200)).toBe(802);
  });

  it('answer', () => {
    const answer = day10part2(data);
    logAnswer(answer, 10, 2);
    expect(typeof answer).toBe('number');
  });
});
