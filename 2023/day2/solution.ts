import fs from "fs";
const content = fs.readFileSync(`${__dirname}/input.txt`, "utf8");
const split = content.split("\n");

type Bag = {
  red: number;
  green: number;
  blue: number;
};
// We can change this to be a set of cubes to compare against
const compare: Bag = {
  red: 12,
  green: 13,
  blue: 14,
};

const createGuessBag = (red: number, green: number, blue: number): Bag => ({
  red,
  green,
  blue,
});

const isValidGame = (guess: Bag, bag: Bag): boolean => {
  if (guess.red > bag.red || guess.green > bag.green || guess.blue > bag.blue) {
    return false;
  }
  return true;
};

const createBag = (colourGuess: string): Bag => {
  // We split the guesses by , and then we split each colour by space after trimming any whitespace
  const colours = colourGuess.split(",");
  const bag = createGuessBag(0, 0, 0);
  for (const colour of colours) {
    const [num, value] = colour.trim().split(" ");
    bag[value as keyof Bag] = +num;
  }
  return bag;
};

export const parseInput = (line: string): Bag[] => {
  // The tuple is not used it contains the first part of the line which is the id of the game, we could use this
  // but the id is the index + 1 so we can just use the index and use the guesses. Each guess is separated by a ;
  const [, guesses] = line.split(":");
  return guesses.split(";").map(createBag);
};

export const calculateMinimum = (bags: Bag[]): Bag => {
  return bags.reduce(
    (min, bag) => {
      min.red = Math.max(min.red, bag.red);
      min.green = Math.max(min.green, bag.green);
      min.blue = Math.max(min.blue, bag.blue);
      return min;
    },
    createGuessBag(0, 0, 0),
  );
};
export const calculate = (input: string[], comparison: Bag) => {
  let sum = 0;
  let sumOfPowerOfSetOfCubes = 0;
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    // We parse each line into an array of bags
    const bags = parseInput(line);
    // This checks if each guess is valid based on the inital bag we are comparing against
    const isValid = bags.every((bag) => isValidGame(bag, comparison));
    // The id of a game is the index + 1, we could access it from the parsing but this is easier
    if (isValid) sum += i + 1;
    // This is the minimum of each colour of cube from given guesses
    const minimum = calculateMinimum(bags);
    // This is the power of the set of cubes
    sumOfPowerOfSetOfCubes += minimum.red * minimum.green * minimum.blue;
  }
  return { sum, sumOfPowerOfSetOfCubes };
};
const { sum, sumOfPowerOfSetOfCubes } = calculate(split, compare);
console.log(sum); // part one answer
console.log(sumOfPowerOfSetOfCubes); // part two answer
