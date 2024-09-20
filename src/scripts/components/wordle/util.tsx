import { type RefObject } from "react";

export type GameColor = 'green' | 'yellow' | '';

export function checkGuess(guess: string, word: string) {
  const colors: GameColor[] = Array(5).fill('');

  for (let i = 0; i < 5; i++) {
    if (guess[i] === word[i]) {
      colors[i] = 'green';
    } else if (word.includes(guess[i])) {
      colors[i] = 'yellow';
    }
  }

  return colors;
}

export function shakeByRef(ref: RefObject<HTMLDivElement>) {
  if (ref.current) {
    ref.current.classList.add('shake');
    setTimeout(() => {
      if (ref.current) {
        ref.current.classList.remove('shake');
      }
    }, 500);
  }
}
