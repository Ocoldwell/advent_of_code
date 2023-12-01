const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8');
const content = data.split('\n');

const reduction = [];
const wordToNumberMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};
// The aim is to find the sum of the first and last digit of each line in the input file of both words and numbers
for (let i = 0; i < content.length; i++) {
  // we create a regex to match all numbers & digits and we use a lookahead to match all numbers & digits
  // part one we can filter by numbers only const re = /(?=(0|1|2|3|4|5|6|7|8|9))/g
  // part two we filter for numbers and words
  const re = /(?=(0|1|2|3|4|5|6|7|8|9|one|two|three|four|five|six|seven|eight|nine))/g;
  // we create an array of all matched numbers & digits, m[1] = first capture group of the regex
  // we check if the matched number is a word and if so we convert it to a number otherwise we cast it to a number
  const matches = Array.from(content[i].matchAll(re), (m) => (wordToNumberMap[m[1]] ? wordToNumberMap[m[1]] : +m[1]));
  // we convert the array into a two digit number
  const number = matches[0] * 10 + matches[matches.length - 1];
  console.log(number);
  reduction.push(number);
}
const sum = reduction.reduce((a, b) => a + b, 0);
console.log(sum);
