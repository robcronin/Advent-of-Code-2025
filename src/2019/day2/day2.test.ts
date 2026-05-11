import { logAnswer } from '../../utils/logging';
import { day2, day2part2 } from './day2';
import { data, testData } from './day2.data';

describe('2019 day 2', () => {
  it('test cases (unmodified example program)', () => {
    expect(day2(testData, false)).toBe(3500);
  });

  it('answer', () => {
    const answer = day2(data);
    logAnswer(answer, 2, 1);
    expect(typeof answer).toBe('number');
  });
});

describe('2019 day 2 part 2', () => {
  it.skip('test cases (no canonical small example for noun/verb search)', () => {
    // intentionally skipped
  });

  it('answer', () => {
    const answer = day2part2(data);
    logAnswer(answer, 2, 2);
    expect(typeof answer).toBe('number');
  });
});
