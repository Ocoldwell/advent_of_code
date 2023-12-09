import { test } from "vitest";
import { partOne, partTwo } from "./solution";
import { readFileSync } from "fs";
const content = readFileSync(`${__dirname}/input.txt`, "utf8");
const test1 = `RL
    
AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;
const test2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

test("Part 1: Test case 1", ({ expect }) => {
  const input = test1;
  const expected = 2;
  const result = partOne(input);
  expect(result).toBe(expected);
});

test("Part 1: Test case 2", ({ expect }) => {
  const input = test2;
  const expected = 6;
  const result = partOne(input);
  expect(result).toBe(expected);
});

test("Part 1: Actual input", ({ expect }) => {
  const input = content;
  const expected = 12361;
  const result = partOne(input);
  expect(result).toBe(expected);
});

test("Part 2: Actual input", ({ expect }) => {
  const input = content;
  const expected = 18215611419223;
  const result = partTwo(input);
  expect(result).toBe(expected);
});

// Add more test cases as needed
