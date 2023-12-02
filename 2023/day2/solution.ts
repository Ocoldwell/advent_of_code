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

let sum = 0;
let sumOfPowerOfSetOfCubes = 0;
for (let i = 0; i < split.length; i++) {
  // This is parsing the input
  const line = split[i];
  // This is where we will store each look at the cubes we store it as an array of bag objects.
  const guessesList: Bag[] = [];
  const[, guesses] = line.split(':');
  const guess = guesses.split(';');
  for (const colourGuess of guess) {
    const colours = colourGuess.split(',');
    const guess = createGuess(0, 0, 0);
    for (const colour of colours) {
      const [num, value] = colour.trim().split(' ');
      guess[value as keyof Bag] = +num;
    }
    guessesList.push(guess);
  }
  // This checks if a game is valid -> a game is a line
  const isValid = guessesList.every(isValidGame);
  // The id of a game is the index + 1, we could also access it from the _game variable but this is easier
  if (isValid) sum += i + 1;
  // This is the minimum of each colour of cube
  const minimum = createGuess(0, 0, 0);
  // This is the maximum of each colour of cube to get the minimum of each colour of cube
  for (const guess of guessesList) {
    minimum.red = Math.max(minimum.red, guess.red);
    minimum.green = Math.max(minimum.green, guess.green);
    minimum.blue = Math.max(minimum.blue, guess.blue);
  }
  // This is the power of the set of cubes
  const powerOfSetOfCubes = minimum.red * minimum.green * minimum.blue;
  sumOfPowerOfSetOfCubes += powerOfSetOfCubes;
}
console.log(sum); // part one answer
console.log(sumOfPowerOfSetOfCubes); // part two answer
