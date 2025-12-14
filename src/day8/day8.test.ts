import { logAnswer } from '../utils/logging';
import { day8, day8part2 } from './day8';
import { data, testData } from './day8.data';

describe('day 8', () => {
  it('test cases', () => {
    expect(day8(testData, 10)).toBe(40);
  });

  it('answer', () => {
    const answer = day8(data, 1000);
    logAnswer(answer, 8, 1);
    expect(answer).toBe(123420);
  });
});

describe('day 8 part 2', () => {
  it('test cases', () => {
    expect(day8part2(testData)).toBe(25272);
  });

  it('answer', () => {
    const answer = day8part2(data);
    logAnswer(answer, 8, 2);
    expect(answer).toBe(673096646);
  });
});
