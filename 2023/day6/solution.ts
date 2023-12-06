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
  export function solve(content: string) {
    const {times, distances} = parseData(content);
    const allWins: number[][] = [];
    times.forEach((time, index) => {
      const wins: number[] = [];
      const recordDistance = distances[index];
      for (let buttonPress = 1; buttonPress <= time; buttonPress++) {
        const distanceTravelled = (time - buttonPress) * buttonPress;
        console.log(buttonPress, distanceTravelled, recordDistance, time);
        if (distanceTravelled > recordDistance) {
          console.log(`Part 1: ${buttonPress}`);
          wins.push(buttonPress);
        }
      }
      allWins.push(wins);
    })
    const test = allWins.reduce((acc, wins) => wins.length * acc, 1);
    console.log(test);
  }

  solve(content);
