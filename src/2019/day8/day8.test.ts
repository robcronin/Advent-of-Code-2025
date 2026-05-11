import { logAnswer } from '../../utils/logging';
import { day8, day8part2, solvePart1, solvePart2 } from './day8';
import { data } from './day8.data';

describe('2019 day 8 — solvePart1', () => {
  it('returns count_1 * count_2 in layer with fewest 0s', () => {
    expect(solvePart1('123456789012', 3, 2)).toBe(1);
  });
});

describe('2019 day 8 — solvePart2', () => {
  it('composites layers using first non-2 per pixel', () => {
    expect(solvePart2('0222112222120000', 2, 2)).toBe(' #\n# ');
  });
});

describe('2019 day 8', () => {
  it('answer', () => {
    const answer = day8(data);
    logAnswer(answer, 8, 1);
    expect(typeof answer).toBe('number');
  });
});

describe('2019 day 8 part 2', () => {
  it('answer', () => {
    const answer = day8part2(data);
    logAnswer(answer, 8, 2, true);
    expect(typeof answer).toBe('string');
  });
});
