import React from 'react';
import ReactDOM from 'react-dom/client';
import Wordle from './wordle/index';
import words from './wordle/words.json';

function getWord() {
  return words[Math.floor(Math.random() * words.length)].toLowerCase();
}

const el = document.getElementById('wordle');
if (el) {
  ReactDOM.createRoot(el).render(
    <React.StrictMode>
      <Wordle word={getWord()} />
    </React.StrictMode>,
  )
}