import fs from "fs";
const content = fs.readFileSync(`${__dirname}/input.txt`, "utf8");
const contentMatrix = content.split("\n").map((line) => line.split(""));

type MatrixPosition = {
  i: number;
  j: number;
};

function processMatrix(contentMatrix: string[][]): number[] {
  let number = "";
  let start: MatrixPosition | null = null;
  let end: MatrixPosition | null = null;
  const parts: number[] = [];

  for (let i = 0; i < contentMatrix.length; i++) {
    for (let j = 0; j < contentMatrix[i].length; j++) {
      const element = contentMatrix[i][j];
      if (!isNaN(+element)) {
        if (number.length === 0) {
          start = { i, j };
        }
        number += element;
        end = { i, j };
      } else {
        if (number.length > 0 && start !== null && end !== null) {
          parts.push(
            ...getPartsFromSubMatrix(contentMatrix, start, end, number),
          );
        }
        number = "";
      }
    }
  }

  return parts;
}

function getPartsFromSubMatrix(
  contentMatrix: string[][],
  start: MatrixPosition,
  end: MatrixPosition,
  number: string,
): number[] {
  const parts: number[] = [];

  for (
    let x = Math.max(0, start.i - 1);
    x <= Math.min(end.i + 1, contentMatrix.length - 1);
    x++
  ) {
    for (
      let y = Math.max(0, start.j - 1);
      y <= Math.min(end.j + 1, contentMatrix[x].length - 1);
      y++
    ) {
      if (contentMatrix[x][y] !== "." && isNaN(+contentMatrix[x][y])) {
        parts.push(+number);
      }
    }
  }

  return parts;
}

export function partOne() {
  const parts = processMatrix(contentMatrix);
  const sum = parts.reduce((a, b) => a + b, 0);
  return sum;
}

function findAdjacentNumbers(contentMatrix: string[][], i: number, j: number) {
  const lines = [
    i > 0 ? contentMatrix[i - 1] : undefined,
    contentMatrix[i],
    i < contentMatrix.length - 1 ? contentMatrix[i + 1] : undefined,
  ];

  const adjacentNumbers: number[] = [];

  lines.forEach((line, lineIndex) => {
    if (line) {
      let numberLeft = "";
      let numberRight = "";
      let left = isNaN(+line[j]) ? j - 1 : j;
      while (left >= 0 && !isNaN(+line[left])) {
        numberLeft = line[left] + numberLeft;
        left--;
      }
      let right = j + 1;
      while (right < line.length && !isNaN(+line[right])) {
        numberRight += line[right];
        right++;
      }
      if (numberLeft && numberRight) {
        if (isNaN(+line[j]) && lineIndex === 1) {
          // Check if numbers are on the same line and there's a symbol between them
          adjacentNumbers.push(+numberLeft, +numberRight);
        } else {
          // Check if numbers are on the same line and there's no symbol between them
          adjacentNumbers.push(+(numberLeft + numberRight));
        }
      } else {
        adjacentNumbers.push(
          ...[numberLeft, numberRight].filter(Boolean).map(Number),
        );
      }
    }
  });

  return adjacentNumbers;
}

function calculateGearRatios(gears: number[][]) {
  return gears.reduce((acc, [part1, part2]) => acc + part1 * part2, 0);
}

function findGears(contentMatrix: string[][]): [number, number][] {
  const gears: [number, number][] = [];
  for (let i = 0; i < contentMatrix.length; i++) {
    for (let j = 0; j < contentMatrix[i].length; j++) {
      if (contentMatrix[i][j] === "*") {
        const foundNumbers: number[] = findAdjacentNumbers(contentMatrix, i, j);
        if (foundNumbers.length === 2) {
          gears.push([foundNumbers[0], foundNumbers[1]]);
        }
      }
    }
  }
  return gears;
}

export function partTwo() {
  const gears = findGears(contentMatrix);
  const sum = calculateGearRatios(gears);
  return sum;
}

const sumOfParts = partOne();
const sumOfGearRatios = partTwo();
console.log("Part 1:", sumOfParts);
console.log("Part 2:", sumOfGearRatios);
