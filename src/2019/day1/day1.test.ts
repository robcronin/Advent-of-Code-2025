import { logAnswer } from '../../utils/logging';
import { day1, day1part2 } from './day1';
import { data, testData } from './day1.data';

describe('2019 day 1', () => {
  it('test cases', () => {
    expect(day1(testData)).toBe(34241);
  });

  it('answer', () => {
    const answer = day1(data);
    logAnswer(answer, 1, 1);
    expect(typeof answer).toBe('number');
  });
});

describe('2019 day 1 part 2', () => {
  it('test cases', () => {
    expect(day1part2(testData)).toBe(51316);
  });

  it('answer', () => {
    const answer = day1part2(data);
    logAnswer(answer, 1, 2);
    expect(typeof answer).toBe('number');
  });
});
