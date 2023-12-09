import { readFileSync } from "fs";
const content = readFileSync(`${__dirname}/input.txt`, "utf8");
// Solution for day 6

const parseLine = (line: string, replaceString: string): number[] =>
  line
    .replace(replaceString, "")
    .trim()
    .split(" ")
    .filter((s) => s)
    .map((s) => +s);

function parseData(string: string) {
  const lines = string.split("\n");
  const times = parseLine(lines[0], "Time: ");
  const distances = parseLine(lines[1], "Distance: ");
  const joinedTimes = +times.join("");
  const joinedDistances = +distances.join("");
  return { times, distances, joinedTimes, joinedDistances };
}

//Brute force solution
function calculateWinsAndProduct(times: number[], distances: number[]) {
  console.time("calculateWinsAndProduct");
  // we could potentially wrap this in BigInt for very large numbers.
  // Part one is the product of all the wins for each button press.
  let totalProduct = 1;
  let totalWins = 0;
  times.forEach((time, index) => {
    let wins = 0;
    const recordDistance = distances[index];
    //we don't need to check the button at 0 or the last button as the sled will not move.
    for (let buttonPress = 1; buttonPress < time - 1; buttonPress++) {
      // The distance travelled by a sled is equal to the time of the race minus the time it took to press the button, multiplied by the time it took to press the button.
      const distanceTravelled = (time - buttonPress) * buttonPress;
      // if the distance travelled is greater than the record distance, then the sled wins.
      if (distanceTravelled > recordDistance) {
        wins++;
      }
    }
    totalProduct *= wins;
    totalWins += wins;
  });
  console.timeEnd("calculateWinsAndProduct");
  return { totalProduct, totalWins };
}

export function solve(content: string) {
  const { times, joinedTimes, distances, joinedDistances } = parseData(content);
  const { totalProduct: partOneAnswer } = calculateWinsAndProduct(
    times,
    distances,
  );
  // Part two is the sum of totalWins of all the wins for each button press, but the times and distances are joined together.
  const { totalWins: partTwoAnswer } = calculateWinsAndProduct(
    [joinedTimes],
    [joinedDistances],
  );
  return { partOneAnswer, partTwoAnswer };
}

solve(content);
