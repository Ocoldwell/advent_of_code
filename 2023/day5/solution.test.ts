import { test } from "vitest";
import { solve } from "./solution";
import { readFileSync } from "fs";
const content = readFileSync(`${__dirname}/input.test.txt`, "utf8");
const content2 = readFileSync(`${__dirname}/input.txt`, "utf8");

test("Find lowest location number corresponding to initial seeds", ({
  expect,
}) => {
  const partOneAnswer = 35;
  const partTwoAnswer = 46;
  const result = solve(content);
  expect(result?.partOneMin).toBe(partOneAnswer);
  expect(result?.partTwoMin).toBe(partTwoAnswer);
});

test("Find lowest location number corresponding to actual input seeds", ({
  expect,
}) => {
  const partOneAnswer = 650599855;
  const partTwoAnswer = 1240035;
  const result = solve(content2);
  expect(result?.partOneMin).toBe(partOneAnswer);
  expect(result?.partTwoMin).toBe(partTwoAnswer);
});
