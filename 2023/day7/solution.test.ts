import { test } from 'vitest';
import { solve, parseData } from './solution';
import { readFileSync } from 'fs';
const content = readFileSync(`${__dirname}/input.test.txt`, 'utf8');

test('Solve part 1', ({ expect }) => {
  const expected = 6592; // replace with your expected output
  const result = solve(content);
  expect(result.totalWinnings).toBe(expected);
});

test('Solve part 2', ({ expect }) => {
  const expected = 6839; // replace with your expected output
  const result = solve(content);
  expect(result.jokerWinnings).toBe(expected);
});