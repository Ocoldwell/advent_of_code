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

const content = `
// Solution for day ${day}

function solve() {
  // TODO: Implement solution
}

solve();
`;
fs.writeFileSync(solutionPath, content);
const tsconfigContent = fs.readFileSync(`${dirname}/template.json`, 'utf-8');
fs.writeFileSync(tsconfig, tsconfigContent);


// Load package.json
const packageJsonPath = path.join(dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

// Add new script
packageJson.scripts[`${year}-${day}`] = `ts-node ${year}/day${day}/solution.ts`;

// Save package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));