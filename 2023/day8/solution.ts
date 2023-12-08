import { readFileSync } from 'fs';
const input = readFileSync(`${__dirname}/input.txt`, 'utf8');
// Solution for day 8

interface Node {
  name: string;
  children: Node[];
}

const gcd = (a: number, b: number): number => (a === 0 ? b : gcd(b % a, a));
const lcm = (...n: number[]): number => n.reduce((a, b) => (a * b) / gcd(a, b));

function parseDataIntoInstructionsAndNodes(input: string): { instructions: string; nodes: Node[] } {
  const lines = input.split('\n');
  const [instructions, ...data] = lines;
  const nodes: Node[] = [];
  const nodeMap: { [key: string]: Node } = {};

  data.forEach((line) => {
    const [name] = line.split(' = ');
    const node: Node = {
      name,
      children: [],
    };
    nodes.push(node);
    nodeMap[name] = node;
  });

  data.forEach((line) => {
    const [name, children] = line.split(' = ');
    const node = nodeMap[name];
    if (children && node) {
      const childNames = children.split(', ').map((child) => child.replace('(', '').replace(')', '').trim());
      childNames.forEach((childName) => {
        const childNode = nodeMap[childName];
        if (childNode) {
          node.children.push(childNode);
        }
      });
    }
  });

  return { instructions, nodes };
}

export function partOne(input: string) {
  const {instructions, nodes}= parseDataIntoInstructionsAndNodes(input);
  let start = nodes.find((node) => node.name === 'AAA');
  console.log(start);
  let numTraversalstoZZZ = 0;
  let i = 0;
  while (start && start.name !== 'ZZZ') {
    const instruction = instructions[i % instructions.length];
    if (start.children.length > 0) {
      if (instruction === 'R') {
        start = start.children[1];
      } else if (instruction === 'L') {
        start = start.children[0];
      }
      numTraversalstoZZZ++;
    }
    
    i++;
  }
  return numTraversalstoZZZ;
}

export function partTwo(input: string) {
  const { instructions, nodes } = parseDataIntoInstructionsAndNodes(input);
  const starts = nodes.filter((node) => node.name[2] === 'A');
  console.log(starts);
  const countsToFirstZ = starts.map((start) => {
    let numTraversalstothirdZ = 0;
    let i = 0;
    while (start && start.name[2] !== 'Z') {
      const instruction = instructions[i % instructions.length];
      if (start.children.length > 0) {
        if (instruction === 'R') {
          start = start.children[1];
        } else if (instruction === 'L') {
          start = start.children[0];
        }
        numTraversalstothirdZ++;
      }
      
      i++;
    }
    return numTraversalstothirdZ;
  });
  const numberTillAllAreZ = lcm(...countsToFirstZ);
  return numberTillAllAreZ;
}

const part1 = partOne(input);
console.table({ part1 });
const part2 = partTwo(input);
console.table({ part2 });