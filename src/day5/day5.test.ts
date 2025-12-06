import { logAnswer } from '../utils/logging';
import { day5, day5part2 } from './day5';
import { data, testData, testData2 } from './day5.data';

describe('day 5', () => {
  it('test cases', () => {
    console.log(testData);
    expect(day5(testData)).toBe(3);
  });

  it('answer', () => {
    const answer = day5(data);
    logAnswer(answer, 5, 1);
    expect(answer).toBe(513);
  });
});

describe('day 5 part 2', () => {
  it('test cases', () => {
    expect(day5part2(testData)).toBe(14);
  });
  it('test cases 2', () => {
    expect(day5part2(testData2)).toBe(15);
  });

  it('answer', () => {
    const answer = day5part2(data);
    logAnswer(answer, 5, 2);
    expect(answer).toBe(339668510830757);
  });
});
