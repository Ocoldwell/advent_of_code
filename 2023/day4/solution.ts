import fs from 'fs';
const content = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
// Solution for day 4

export const parseData = (inputData: string): Map<number, {winners: number[], scratchcard: number[], copies: number}> => {
  const lines = inputData.split('\n');
  const splitIdNumbers = lines.map((line) => line.split(': ')[1].split(' | '));
  const map = new Map();
  for (const [index, [winners, scratchcard]] of splitIdNumbers.entries()) {
    const winnersArray = winners.split(' ').map(w => w.trim()).filter(w => w !== '');
    const scratchcardArray = scratchcard.split(' ').map(w => w.trim()).filter(w => w !== '');
    const winnersAndScratchObj = {
      winners: winnersArray.map((winner: string) => +winner),
      scratchcard: scratchcardArray.map((winner: string) => +winner),
      copies: 1,
    };

    map.set(index, winnersAndScratchObj);
  }
  return map;
}

const doubleNumber = (num: number, times: number) => num << times
type Card = {
  index: number,
  wins: number
}
function getCopies(all: Card[], cards = all): Card[] {
  return cards.concat(
    cards.flatMap((c) => (c.wins ? getCopies(all, all.slice(c.index + 1, c.index + 1 + c.wins)) : []))
  );
}


export function solve(inputData: string) {
  const data = parseData(inputData);
  let sum = 0;
  const cards = [];

  for (const [index, winnersAndScratchObj] of data) {
    const isNumberWinner: boolean[] = [];
    const { winners, scratchcard } = winnersAndScratchObj;
      const winnersSet = new Set(winners);
      scratchcard.forEach((number) => {
        if (winnersSet.has(number)) {
          isNumberWinner.push(true);
        }
      });
     
      if (isNumberWinner.length > 0) {
          const points = doubleNumber(1, isNumberWinner.length -1);
          sum += points;
      }
      cards.push({ index: index, wins: isNumberWinner.length });
  }

  const totalCards = getCopies(cards).length;
  return {sum, totalCards}
}

solve(content);


// 5625994