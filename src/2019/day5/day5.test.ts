import { logAnswer } from '../../utils/logging';
import { day5, day5part2 } from './day5';
import { data, testData } from './day5.data';

describe('2019 day 5', () => {
  it('test cases (echo program: input 1 -> output 1)', () => {
    expect(day5(testData)).toBe(1);
  });

  it('answer', () => {
    const answer = day5(data);
    logAnswer(answer, 5, 1);
    expect(typeof answer).toBe('number');
  });
});

describe('2019 day 5 part 2', () => {
  it('test cases (echo program: input 5 -> output 5)', () => {
    expect(day5part2(testData)).toBe(5);
  });

  it('answer', () => {
    const answer = day5part2(data);
    logAnswer(answer, 5, 2);
    expect(typeof answer).toBe('number');
  });
});
