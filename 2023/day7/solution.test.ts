import { test } from 'vitest';
import { solve, parseData } from './solution';
import { readFileSync } from 'fs';
const content = readFileSync(`${__dirname}/input.test.txt`, 'utf8');

test('Solve part 1', ({ expect }) => {
  const expected = 6440; // replace with your expected output
  const result = solve(content);
  expect(result).toBe(expected);
});

test('Solve part 2', ({ expect }) => {
  const expected = 5905; // replace with your expected output
  const result = solve(content);
  expect(result).toBe(expected);
});

test('Parse data correctly', ({ expect }) => {
  const expected = [
    {
      bid: 765,
      hand: '32T3K',
      rank: 1,
    },
    {
      bid: 684,
      hand: 'T55J5',
      rank: 2,
    },
    {
      bid: 28,
      hand: 'KK677',
      rank: 3,
    },
    {
      bid: 220,
      hand: 'KTJJT',
      rank: 4,
    },
    {
      bid: 483,
      hand: 'QQQJA',
      rank: 5,
    },
  ];
  const result = parseData(content);
  expect(result).toStrictEqual(expected);
});
