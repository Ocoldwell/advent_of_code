/**
 * @typedef {Object} Bag
 * @property {number} red - The red value.
 * @property {number} green - The green value.
 * @property {number} blue - The blue value.
 */


const fs = require('fs');
const content = fs.readFileSync('./input.txt', 'utf8');
const split = content.split('\n');

/** @type {Bag} */
// We can change this to be a set of cubes to compare against
const bag = {
  red: 12,
  green: 13,
  blue: 14,
};

/**
 * Creates a guess object with the specified red, green, and blue values.
 *
 * @param {number} red - The red value of the guess.
 * @param {number} green - The green value of the guess.
 * @param {number} blue - The blue value of the guess.
 * @returns {Bag} - The guess object with red, green, and blue properties.
 */
const createGuess = (red, green, blue) => ({ red, green, blue });

/**
 * Checks if a game guess is valid based on the available colors in the bag.
 * @param {Bag} guess - The game guess object.
 * @param {number} guess.red - The number of red color in the guess.
 * @param {number} guess.green - The number of green color in the guess.
 * @param {number} guess.blue - The number of blue color in the guess.
 * @param {Object} bag - The bag object containing the available colors.
 * @param {number} bag.red - The number of red color available in the bag.
 * @param {number} bag.green - The number of green color available in the bag.
 * @param {number} bag.blue - The number of blue color available in the bag.
 * @returns {boolean} - True if the guess is valid, false otherwise.
 */
const isValidGame = (guess) => {
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
  /** @type {Bag[]} */
  const guessesList = [];
  const [_game, guesses] = line.split(':');
  const guess = guesses.split(';');
  for (colourGuess of guess) {
    const colours = colourGuess.split(',');
    const guess = createGuess(0, 0, 0);
    for (let colour of colours) {
      let [num, value] = colour.trim().split(' ');
      guess[value] = +num;
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
  for (let guess of guessesList) {
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
