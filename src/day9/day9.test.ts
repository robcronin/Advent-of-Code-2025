import { logAnswer } from '../utils/logging';
import { day9 } from './day9';
import { data, testData } from './day9.data';

describe('day 9', () => {
  it('test cases', () => {
    expect(day9(testData)).toBe(50);
  });

  it('answer', () => {
    const answer = day9(data);
    logAnswer(answer, 9, 1);
    expect(typeof answer).toBe('number');
  });
});
