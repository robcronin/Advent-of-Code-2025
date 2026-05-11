import { logAnswer } from '../../utils/logging';
import { day9, day9part2 } from './day9';
import { data, testData } from './day9.data';

describe('2019 day 9', () => {
  it('test cases (16-digit multiplication program)', () => {
    expect(day9(testData)).toBe(1219070632396864);
  });

  it('answer', () => {
    const answer = day9(data);
    logAnswer(answer, 9, 1);
    expect(typeof answer).toBe('number');
  });
});

describe('2019 day 9 part 2', () => {
  it('test cases (16-digit program ignores input)', () => {
    expect(day9part2(testData)).toBe(1219070632396864);
  });

  it('answer', () => {
    const answer = day9part2(data);
    logAnswer(answer, 9, 2);
    expect(typeof answer).toBe('number');
  });
});
