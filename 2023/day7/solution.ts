// Solution for day 7
import { readFileSync } from 'fs';
const content = readFileSync(`${__dirname}/input.txt`, 'utf8');

type HandData = {
  hand: string;
  bid: number;
  rank: number;
  cardValue?: number[];
};

type HandType = {
  type: 'fiveOfAKind' | 'fourOfAKind' | 'fullHouse' | 'threeOfAKind' | 'twoPair' | 'onePair' | 'highCard';
  condition: boolean;
};

const HandRank: Record<HandType["type"], number> = {
  fiveOfAKind: 7,
  fourOfAKind: 6,
  fullHouse: 5,
  threeOfAKind: 4,
  twoPair: 3,
  onePair: 2,
  highCard: 1,
};

export function parseData(inputData: string): HandData[] {
  const lines = inputData.split('\n');
  const data: HandData[] = lines
    .map((line) => line.split(' '))
    .map((line, index) => ({ hand: line[0], bid: +line[1], rank: index + 1 }))
  return data;
}
// The weakest hand is given a rank of 1 and the strongest hand is given a rank of the length of the input + 1
// The hand type are five of a kind, four of a kind, full house, three of a kind, two pair, one pair, and high card.
// If a hand is the same type as another hand, the hand with the highest card in the first position wins, if equal
//  we check the second position and so on.
const cardCountMap = (handArray: string[]): Map<string, number> => {
  const cardCounts = new Map<string, number>();
  handArray.forEach(card => {
    cardCounts.set(card, (cardCounts.get(card) || 0) + 1);
  });
  return cardCounts;
};

const cardValue = (char: string, partTwo: boolean = false): number => {
  switch (char) {
    case 'A':
      return 14;
    case 'K':
      return 13;
    case 'Q':
      return 12;
    case 'J':
      return partTwo ? 1 : 11;
    case 'T':
      return 10;
    default:
      return +char;
  }
};

const handRanker = (hand: HandData): HandData => {
  const handArray = hand.hand.split('');
  const cardCounts = cardCountMap(handArray);
  const counts = Array.from(cardCounts.values());
  const handTypes: HandType[] = [
    { type: 'fiveOfAKind', condition: counts.includes(5) },
    { type: 'fourOfAKind', condition: counts.includes(4) },
    { type: 'fullHouse', condition: counts.includes(3) && counts.includes(2) },
    { type: 'threeOfAKind', condition: counts.includes(3) && counts.filter((count) => count === 2).length !== 1 },
    { type: 'twoPair', condition: counts.filter((count) => count === 2).length === 2 },
    { type: 'onePair', condition: counts.filter((count) => count === 2).length === 1 },
    { type: 'highCard', condition: true },
  ];
  const handType = handTypes.find((handType) => handType.condition)!.type;
  const handRank = HandRank[handType];
  hand.rank = handRank;
  hand.cardValue = handArray.map(char => cardValue(char));
  return hand;
};

const jokerHandRanker = (hand: HandData): HandData => {
  const handArray = hand.hand.split('');
  const arrayNoJokers = handArray.filter((char) => char !== 'J');
  const numberOfJokers = handArray.filter((char) => char === 'J').length;
  const cardCounts = cardCountMap(arrayNoJokers);
  const counts = Array.from(cardCounts.values());

  const handTypes: HandType[] = [
    { type: 'fiveOfAKind', condition: counts.some((count) => count + numberOfJokers >= 5) || numberOfJokers === 5 },
    { type: 'fourOfAKind', condition: counts.some((count) => count + numberOfJokers >= 4) },
    {
      type: 'fullHouse',
      condition:
        (counts.includes(3) && counts.includes(2)) ||
        (counts.filter((count) => count === 2).length === 2 && numberOfJokers === 1) ||
        (counts.includes(3) && numberOfJokers === 1),
    },
    { type: 'threeOfAKind', condition: counts.some((count) => count + numberOfJokers >= 3) },
    { type: 'twoPair', condition: counts.filter((count) => count === 2).length === 2 || numberOfJokers === 2 },
    { type: 'onePair', condition: counts.filter((count) => count === 2).length === 1 || numberOfJokers === 1 },
    { type: 'highCard', condition: true },
  ];

  const handType = handTypes.find((handType) => handType.condition);
  const handRank = HandRank[handType!.type];
  hand.rank = handRank;
  hand.cardValue = handArray.map((char) => cardValue(char, true));
  return hand;
}

const compareHands = (handA: HandData, handB: HandData): number => {
  if (handA.rank !== handB.rank) {
    return 0;
  }
  const a = handA.cardValue!;
  const b = handB.cardValue!;
  for (let i = 0; i < a.length; i++) {
    if (a[i] > b[i]) {
      return 1;
    } else if (a[i] < b[i]) {
      return -1;
    }
  }
  return 0;
}

const rankHands = (hands: HandData[], partTwo: boolean = false): HandData[] => {
  // We add a rank to each hand, add an array of CardValues and then sort by the rank.
  const initialHandRanks = hands.map(partTwo ? jokerHandRanker : handRanker).sort((a, b) => a.rank - b.rank);
  // We then sort by the card values within each rank.
  let i = 0;
  while (i < initialHandRanks.length) {
    let j = i;
    while (j < initialHandRanks.length && initialHandRanks[j].rank === initialHandRanks[i].rank) {
      j++;
    }
    const sameRankHands = initialHandRanks.slice(i, j);
    sameRankHands.sort(compareHands);
    initialHandRanks.splice(i, j - i, ...sameRankHands);
    i = j;
  }
  const rankedHands = initialHandRanks.map((hand, index) => ({ ...hand, rank: index + 1 }));
  return rankedHands;
}

export function solve(content: string) {
  const data = parseData(content);
  const ranks1 = rankHands(data)
  const ranks2 = rankHands(data, true)

  const totalWinnings = ranks1.reduce((total, hand) => total + (hand.bid * hand.rank), 0);
  const jokerWinnings = ranks2.reduce((total, hand) => total + (hand.bid * hand.rank), 0);
  return {totalWinnings, jokerWinnings};
}

const values = solve(content);
console.table(values);

