import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const year = process.argv[2];
const day = process.argv[3];
const dirname = path.dirname(fileURLToPath(import.meta.url));

const solutionDir = path.join(dirname, `../${year}/day${day}`);
fs.mkdirSync(solutionDir, { recursive: true });

const solutionPath = path.join(solutionDir, `/solution.ts`);
if (fs.existsSync(solutionPath)) {
  console.log('Solution already exists');
  process.exit(1);
}

const tsconfig = path.join(solutionDir, `/tsconfig.json`);
const packageJsonCopy = path.join(solutionDir, `/package.json`);

const content = `
// Solution for day ${day}

export function solve() {
  // TODO: Implement solution
  console.log('Solution for day ${day} not implemented yet!');
}

solve();
`;
fs.writeFileSync(solutionPath, content);

const testContent = `
import { test } from 'vitest'
import { solve } from './solution'

test('Test case 1', ({ expect }) => {
  const input = '...' // replace with your input
  const expected = '...' // replace with your expected output
  const result = solve(input)
  expect(result).toBe(expected)
})

// Add more test cases as needed
`;

const testPath = path.join(solutionDir, 'solution.test.ts');
fs.writeFileSync(testPath, testContent);

const tsconfigContent = fs.readFileSync(`${dirname}/template.tsconfig.json`, 'utf-8');
fs.writeFileSync(tsconfig, tsconfigContent);

//Load template package.json
const templatePackageJsonPath = path.join(dirname, `./template.package.json`);
const packageJsonContent = JSON.parse(fs.readFileSync(templatePackageJsonPath, 'utf-8'));
//Write to name
packageJsonContent.name = `@${year}/day${day}`;
fs.writeFileSync(packageJsonCopy, JSON.stringify(packageJsonContent, null, 2));

// Load global package.json
const packageJsonPath = path.join(dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// Add new script
packageJson.scripts[`${year}-${day}`] = `ts-node ${year}/day${day}/solution.ts`;

// Save package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));