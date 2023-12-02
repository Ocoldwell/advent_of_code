import { test, expect } from 'vitest';
import { calculate, calculateMinimum, parseInput } from './solution';

test('calculate', () => {
  // Arrange
  const split = [
    'Game 1: 1 red, 5 blue, 1 green; 16 blue, 3 red; 6 blue, 5 red; 4 red, 7 blue, 1 green',
    'Game 2: 4 blue; 4 red, 3 blue, 1 green; 4 red, 9 blue, 2 green; 5 blue, 7 green, 4 red',
    'Game 3: 10 blue; 7 blue, 1 green; 19 blue, 1 green, 9 red',
  ];
  const bag = {
    red: 12,
    green: 13,
    blue: 14,
  };
  // Act
  const result = calculate(split, bag);

  // Assert
  expect(result.sum).toBe(2);
  expect(result.sumOfPowerOfSetOfCubes).toBe(503);
});

test('calculateMinimum', ()=> {
  // Arrange
  const bags = [
    { red: 1, green: 5, blue: 1 },
    { red: 16, green: 0, blue: 3 },
    { red: 6, green: 0, blue: 5 },
    { red: 4, green: 7, blue: 1 },
  ];
  // Act
  const result = calculateMinimum(bags);
  // Assert
  expect(result.red).toBe(16);
  expect(result.green).toBe(7);
  expect(result.blue).toBe(5);
})

test('parseInput', () => {
  const input = 'Game 1: 1 red, 5 blue, 1 green; 16 blue, 3 red; 6 blue, 5 red; 4 red, 7 blue, 1 green';
  // Act
  const result = parseInput(input);
  // Assert
  expect(result.length).toBe(4);
  expect(result[0].red).toBe(1);
  expect(result[0].green).toBe(1);
  expect(result[0].blue).toBe(5);
  expect(result[1].red).toBe(3);
  expect(result[1].green).toBe(0);
  expect(result[1].blue).toBe(16);
  expect(result[2].red).toBe(5);
  expect(result[2].green).toBe(0);
  expect(result[2].blue).toBe(6);
  expect(result[3].red).toBe(4);
  expect(result[3].green).toBe(1);
  expect(result[3].blue).toBe(7);
});