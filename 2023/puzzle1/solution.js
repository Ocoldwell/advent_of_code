const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8');
const content = data.split('\n');
const reduction = [];
const digitObject = {
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

for (let i = 0; i < content.length; i++) {
  // we create a regex to match all numbers & digits and we use a lookahead to match all numbers & digits
  // part one we can filter by numbers only const re = /(?=(0|1|2|3|4|5|6|7|8|9))/g
  // part two calculated below
  const re = /(?=(0|1|2|3|4|5|6|7|8|9|one|two|three|four|five|six|seven|eight|nine))/g;
  // we create an array of all matched numbers & digits & remove the first element
  const matched = Array.from(content[i].matchAll(re), (m) => m[1]);
  // we convert the string numbers & digits into numbers
  const m = matched.map((x) => (digitObject[x] !== undefined ? digitObject[x] : +x));
  // we convert the array into a two digit number
  const number = m[0] * 10 + m[m.length - 1];
  reduction.push(number);
}
const sum = reduction.reduce((a, b) => a + b, 0);
console.log(sum);
console.log(reduction);
