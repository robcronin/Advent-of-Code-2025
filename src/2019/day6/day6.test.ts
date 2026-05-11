import { logAnswer } from '../../utils/logging';
import { day6, day6part2 } from './day6';
import { data, testData, testDataPart2 } from './day6.data';

describe('2019 day 6', () => {
  it('test cases', () => {
    expect(day6(testData)).toBe(42);
  });

  it('answer', () => {
    const answer = day6(data);
    logAnswer(answer, 6, 1);
    expect(typeof answer).toBe('number');
  });
});

describe('2019 day 6 part 2', () => {
  it('test cases', () => {
    expect(day6part2(testDataPart2)).toBe(4);
  });

  it('answer', () => {
    const answer = day6part2(data);
    logAnswer(answer, 6, 2);
    expect(typeof answer).toBe('number');
  });
});
