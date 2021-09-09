import React, { KeyboardEvent, useState } from 'react';
import './hebrew-touch-typing.scss';
import ExerciseText from './ExerciseText';
import { HEBREW_LETTERS } from '../constants/hebrewLetters';

export interface Exercise {
  text: string;
  lines: number[];
}

interface HebrewTouchTypingProps {
  exercise: Exercise;
}

const HebrewTouchTyping = ({
  exercise,
}: HebrewTouchTypingProps): React.ReactElement => {
  const { text } = exercise;
  const [inputValue, setInputValue] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const onInputValueChange = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== text[textIndex]) {
      return;
    }

    setTextIndex((index) => index + 1);
  };

  return (
    <div className="root">
      <h1>הקלדה עיוורת</h1>
      <p>Index: {textIndex}</p>
      <p>Text Length: {inputValue.length}</p>
      <input
        data-testid="input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={onInputValueChange}
      ></input>
      <ExerciseText exercise={exercise} userInputText={inputValue} />
      <div className="keyboard">
        {HEBREW_LETTERS.map((hebrewKey) => (
          <span key={hebrewKey} className="hebrew-key">
            {hebrewKey}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HebrewTouchTyping;
