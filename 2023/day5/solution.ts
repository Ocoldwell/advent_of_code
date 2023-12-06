import fs from 'fs';
const content = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
// Solution for day 5
type MapData = {
  destination: number;
  source: number;
  range: number;
};
const parseLine = (line: number[]): MapData => {
  const [destination, source, range] = line;
  return { destination, source, range };
};
const parseMap = (map: string) => {
  const lines = map.split('\n');
  const [name, ...rest] = lines;
  const pName = name.replace(/:/g, '').replace('map', '').trim();
  const mapNumbers = rest.map((line) => line.split(' ').map((s) => +s));
  const mapData = mapNumbers.map(parseLine);
  return { name: pName, mapData };
};
const parseData = (inputData: string) => {
  const maps = inputData.split(/\n{2,}/);
  const seedString = maps.shift();
  const seeds = seedString
    ?.split(':')[1]
    .trim()
    .split(' ')
    .map((s) => +s);
  const mapDict: Record<string, MapData[]> = {};
  maps.forEach((mapString) => {
    const map = parseMap(mapString);
    mapDict[map.name] = map.mapData;
  });
  return { mapDict, seeds };
};

const mapValue = (value: number, map: MapData[]): number => {
  for (let i = 0; i < map.length; i++) {
    const { destination, source, range } = map[i];
    // We have to check if this equals 0 as there is one instance in the input where the destination + value
    //  - sorce = 0 which then sets the value to 0, rather than the value.
    if (value >= source && value < source + range) {
      return destination + value - source === 0 ? value : destination + value - source;   
    }
  }
  return value;
};

const partOne = (mapDict: Record<string, MapData[]>, seeds: number[]): number | undefined => {
  const maps = mapDict;
  let minValue: number = Number.MAX_VALUE;
  seeds.forEach((seed) => {
    let value = seed;
    for (const map in maps) {
      value = mapValue(value, maps[map]);
    }
    minValue = Math.min(minValue, value);
  });
  return minValue;
};

// Got initial solution from brute force. This is much more efficient, by finding the min and max of the range
// and only checking those values and setting the results from the map to check next as we only need to check
// the minimum value
function partTwo(mapDict: Record<string, MapData[]>, seeds: number[]) {
  console.time('partTwo');
  let minValue: number = Number.MAX_VALUE;
  const maps = Object.values(mapDict);
  for (let i = 0; i < seeds.length - 1; i += 2) {
    const start = seeds[i];
    const end = start + seeds[i + 1] -1;
    let valuesToCheck: number[] = [start, end];
    for (let k = 0; k < maps.length; k++) {
      const map = maps[k];
      const newValuesToCheck: number[] = [];
      map.forEach(({source, range}) => {
        // Get the min and max of the range
        if (source >= start && source <= end) valuesToCheck.push(source);
        if (source + range >= start && source + range <= end) valuesToCheck.push(source + range);
      });
      valuesToCheck.forEach((seed) => {
        const value = mapValue(seed, map);
        newValuesToCheck.push(value);
        minValue = Math.min(minValue, value);
      });
      valuesToCheck = newValuesToCheck;
    }
  }
  console.timeEnd('partTwo');
  return minValue;
}

export function solve(inputData: string) {
  const { seeds, mapDict } = parseData(inputData);
  if (seeds) {
    const partOneMin = partOne(mapDict, seeds);
    const partTwoMin = partTwo(mapDict, seeds);
    console.table({ partOneMin, partTwoMin });
    return {partOneMin, partTwoMin}
  }
}

solve(content);
