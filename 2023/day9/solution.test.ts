import { test } from "vitest";
import { solve } from "./solution";
import { readFileSync } from "fs";
const content = readFileSync(`${__dirname}/input.txt`, "utf8");

test("Part one", ({ expect }) => {
  const input = content;
  const expected = 1806615041;
  const result = solve(input);
  expect(result).toBe(expected);
});

test("Part two", ({ expect }) => {
  const input = content;
  const expected = 1211;
  const result = solve(input, true);
  expect(result).toBe(expected);
});
