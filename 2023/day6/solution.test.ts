
    import { test } from 'vitest';
    import { solve } from './solution';
    import { readFileSync } from 'fs';
    const content = readFileSync(`${__dirname}/input.txt`, 'utf8');

    test('Solution 6', ({ expect }) => {
      const part1 = 449820;
      const part2 = 42250895;
      const {partOneAnswer, partTwoAnswer}= solve(content);
      expect(partOneAnswer).toBe(part1);
      expect(partTwoAnswer).toBe(part2);
    })

    // Add more test cases as needed