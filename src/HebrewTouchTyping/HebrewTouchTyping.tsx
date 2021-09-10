import React, { KeyboardEvent, useRef, useState } from 'react';
import { ExerciseText } from '../utils/generateLetterExercises';
import ExerciseTextBlock from './ExerciseTextBlock';

import './hebrew-touch-typing.scss';

interface HebrewTouchTypingProps {
  exercise: ExerciseText;
}

const HebrewTouchTyping = ({
  exercise,
}: HebrewTouchTypingProps): React.ReactElement => {
  const text = exercise.join("");
  const inputRef = useRef<HTMLInputElement | null>(null)
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
      <input
        aria-hidden="true"
        data-testid="input"
        className="input"
        ref={inputRef}
        autoFocus={true}
        onBlur={() => inputRef.current?.focus()}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={onInputValueChange}
      ></input>
      <ExerciseTextBlock exercise={exercise} userInputText={inputValue} />
    </div>
  );
};

export default HebrewTouchTyping;
