import { readFileSync } from "fs";
const content = readFileSync(`${__dirname}/input.txt`, "utf8");

const parseData = (input: string) => {
  return input.split("\n");
};

export function solve(content: string, partTwo = false) {
  const lines = parseData(content);
  let total = 0;
  for (const line of lines) {
    const sequence = line.split(" ").filter(Boolean).map(Number);
    const seq = partTwo ? sequence.reverse() : sequence;

    let lastNumber = seq.at(-1);
    const seqLen = seq.length;

    for (let i = 1; i < seqLen; i++) {
      for (let j = seqLen - 1; j >= -1; j--) {
        seq[j] -= seq[j - 1];
      }
      lastNumber! += seq.at(-1)!;
    }
    total += lastNumber!;
  }

  return total;
}

const partOne = solve(content);
const partTwo = solve(content, true);
console.table({ partOne, partTwo });
