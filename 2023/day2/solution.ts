import fs from 'fs';
const content = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
const split = content.split('\n');

type Bag = {
  red: number;
  green: number;
  blue: number;
};
// We can change this to be a set of cubes to compare against
const bag: Bag = {
  red: 12,
  green: 13,
  blue: 14,
};

const createGuess = (red: number, green: number, blue: number): Bag => ({ red, green, blue });

const isValidGame = (guess: Bag): boolean => {
  if (guess.red > bag.red || guess.green > bag.green || guess.blue > bag.blue) {
    return false;
  }
  return true;
};

const createBag = (colourGuess: string): Bag => {
  const colours = colourGuess.split(',');
  const bag = createGuess(0, 0, 0);
  for (const colour of colours) {
    const [num, value] = colour.trim().split(' ');
    bag[value as keyof Bag] = +num;
  }
  return bag;
}

const parseInput = (line: string): Bag[] => {
  const[, guesses] = line.split(':');
  return guesses.split(';').map(createBag);
}

const calculateMinimum = (bags: Bag[]): Bag => {
  return bags.reduce((min, bag) => {
    min.red = Math.max(min.red, bag.red);
    min.green = Math.max(min.green, bag.green);
    min.blue = Math.max(min.blue, bag.blue);
    return min;
  }, createGuess(0, 0, 0));
}
const calculate = () => {
  let sum = 0;
  let sumOfPowerOfSetOfCubes = 0;
  for (let i = 0; i < split.length; i++) {
    // This is parsing the input
    const line = split[i];
    // This is where we will store each look at the cubes we store it as an array of bag objects.
    const bags = parseInput(line);
    // This checks if a game is valid -> a game is a line
    const isValid = bags.every(isValidGame);
    // The id of a game is the index + 1, we could also access it from the _game variable but this is easier
    if (isValid) sum += i + 1;
    // This is the minimum of each colour of cube
    const minimum = calculateMinimum(bags);
    // This is the power of the set of cubes
    sumOfPowerOfSetOfCubes += minimum.red * minimum.green * minimum.blue;
  }
  return { sum, sumOfPowerOfSetOfCubes };
}
const { sum, sumOfPowerOfSetOfCubes } = calculate();
console.log(sum); // part one answer
console.log(sumOfPowerOfSetOfCubes); // part two answer

