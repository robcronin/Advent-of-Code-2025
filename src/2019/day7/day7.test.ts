import { logAnswer } from '../../utils/logging';
import { day7, day7part2 } from './day7';
import { data, testData, testDataPart2 } from './day7.data';

describe('2019 day 7', () => {
  it('test cases (phases [4,3,2,1,0] -> 43210)', () => {
    expect(day7(testData)).toBe(43210);
  });

  it('answer', () => {
    const answer = day7(data);
    logAnswer(answer, 7, 1);
    expect(typeof answer).toBe('number');
  });
});

describe('2019 day 7 part 2', () => {
  it('test cases (phases [9,8,7,6,5] -> 139629729)', () => {
    expect(day7part2(testDataPart2)).toBe(139629729);
  });

  it('answer', () => {
    const answer = day7part2(data);
    logAnswer(answer, 7, 2);
    expect(typeof answer).toBe('number');
  });
});
