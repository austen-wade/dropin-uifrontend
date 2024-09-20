import type { ReactNode } from 'react';
import { type GameState } from '.';

type OutcomeProps = {
  gameState: GameState;
  word: string;
};

function Reveal({ children }: { children?: ReactNode }) {
  return <div className="reveal">{children}</div>;
}

export function Outcome({ gameState, word }: OutcomeProps) {
  if (gameState === 'playing') {
    return <Reveal />;
  }

  return <Reveal>
    <p>
      {gameState === 'win' ? 'You win!' : 'Sorry, you ran out of guesses!'}
    </p>
    <p>
      <strong>Today's word is:</strong> {word}
    </p>
  </Reveal>;
}
