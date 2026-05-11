import { logAnswer } from '../../utils/logging';
import { day3, day3part2 } from './day3';
import { data, testData } from './day3.data';

describe('2019 day 3', () => {
  it('test cases', () => {
    expect(day3(testData)).toBe(6);
  });

  it('answer', () => {
    const answer = day3(data);
    logAnswer(answer, 3, 1);
    expect(typeof answer).toBe('number');
  });
});

describe('2019 day 3 part 2', () => {
  it('test cases', () => {
    expect(day3part2(testData)).toBe(30);
  });

  it('answer', () => {
    const answer = day3part2(data);
    logAnswer(answer, 3, 2);
    expect(typeof answer).toBe('number');
  });
});
