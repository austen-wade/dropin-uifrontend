import { expect, test } from "bun:test";

import { checkGuess, type GameColor } from '../src/scripts/components/wordle/util.tsx';

const word = 'apple';
const guess = 'aplyp';
const expectedColors: GameColor[] = ['green', 'green', 'yellow', '', 'yellow'];
const actualColors = checkGuess(guess, word);

test('checkGuess', () => {
  expect(actualColors).toEqual(expectedColors);
});