import { useEffect, useState, useRef, type ChangeEvent, type KeyboardEvent } from 'react';
import { BlockRow } from './BlockRow';
import { ActiveRow } from './ActiveRow';
import { shakeByRef, checkGuess } from './util';
import words from './words.json';
import { Outcome } from './Outcome';

type AppProps = {
  word: string;
}

export type GameState = 'playing' | 'win' | 'lose';

function Wordle({ word }: AppProps) {
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  useEffect(() => { setGuess('') }, [guesses]);

  const [gameState, setGameState] = useState<GameState>('playing');
  const isPlaying = () => gameState === 'playing';

  const guessRef = useRef<HTMLInputElement>(null);
  const blocksRef = useRef<HTMLDivElement>(null);

  const focusInput = () => guessRef.current?.focus();
  useEffect(() => { focusInput() }, []);

  useEffect(() => {
    if (guesses.includes(word)) {
      setGameState('win');
    } else if (guesses.length > 4) {
      setGameState('lose');
    }
  }, [guesses, word]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setGuess(e.target.value.slice(0, 5));
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter'
      && guess.length === 5
      && isPlaying()) {
      if (!words.includes(guess)) {
        shakeByRef(blocksRef);
        return;
      }
      setGuesses([...guesses, guess]);
      focusInput();
    }
  }

  return (
    <div className="wordle">
      <div className="guess-wrapper" onClick={focusInput} ref={blocksRef}>
        {guesses.map((guessed, _) => (
          <BlockRow key={guessed} value={guessed} colors={checkGuess(guessed, word)} />
        ))}

        {isPlaying() && <ActiveRow value={guess} />}

        {Array.from({ length: 4 - guesses.length }).map((_, i) => (
          <BlockRow key={i} value="" />
        ))}

        <input
          ref={guessRef}
          type="text"
          value={guess}
          onChange={handleChange}
          onKeyDown={handleKeyDown} />
      </div>

      <Outcome
        gameState={gameState}
        word={word} />
    </div>
  );
}

export default Wordle;