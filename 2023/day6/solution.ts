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
    const test: number[] = [];
    times.forEach((time, index) => {
      const recordDistance = distances[index];
      for (let buttonPress = 1; buttonPress <= time; buttonPress++) {
        const distance = buttonPress * time;
        console.log(buttonPress);
        if (distance >= recordDistance) {
          console.log(`Part 1: ${buttonPress}`);
          test.push(buttonPress);
          break;
        }
      }
    })
    console.log(test);
  }

  solve(content);
