const { readFileSync } = require('fs');
const content = readFileSync(`${__dirname}/input.txt`, 'utf8');
  // Solution for day 6

  
  function parseData(string: string) {
    const lines = string.split('\n');
    const times = lines[0].replace('Time: ', '').trim().split(' ').filter((s) => s).map((s) => +s);
    const distances = lines[1].replace('Distance: ', '').trim().split(' ').filter((s) => s).map((s) => +s);
    console.log(times, distances);
    return { times, distances };
  }

  function partOne(times: number[], distances: number[]) {
    const allWins: number[][] = [];
    times.forEach((time, index) => {
      const wins: number[] = [];
      const recordDistance = distances[index];
      for (let buttonPress = 1; buttonPress <= time; buttonPress++) {
        const distanceTravelled = (time - buttonPress) * buttonPress;
        console.log(buttonPress, distanceTravelled, recordDistance, time);
        if (distanceTravelled > recordDistance) {
          wins.push(buttonPress);
        }
      }
      allWins.push(wins);
    });
    const multiple = allWins.reduce((acc, wins) => wins.length * acc, 1);
    return multiple;
  }

  function partTwo(times: number[], distances: number[]) {
    const timesConcat = +times.join('');
    const distancesConcat = +distances.join('');
    let wins = 0;
    const time = timesConcat
    const recordDistance = distancesConcat;
    for (let buttonPress = 1; buttonPress <= time; buttonPress++) {
      const distanceTravelled = (time - buttonPress) * buttonPress;
      if (distanceTravelled > recordDistance) {
        wins++;
      }
    }
    return wins;
  }

  export function solve(content: string) {
    const {times, distances} = parseData(content);
    const partOneAnswer = partOne(times, distances);
    const partTwoAnswer = partTwo(times, distances);
    return { partOneAnswer, partTwoAnswer};
  }
