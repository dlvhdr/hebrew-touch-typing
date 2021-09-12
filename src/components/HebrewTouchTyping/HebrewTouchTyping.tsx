import React, {KeyboardEvent, useRef, useState} from 'react';
import {ExerciseText} from '../../utils/generateLetterExercises';
import ExerciseTextBlock from '../ExerciseTextBlock/ExerciseTextBlock';
import KeyboardSvg from './keyboard-svg.svg';
import classNames from 'classnames';

import * as styles from './hebrew-touch-typing.scss';

interface HebrewTouchTypingProps {
  exercise: ExerciseText;
  className?: string;
}

const HebrewTouchTyping = ({
  exercise,
  className,
}: HebrewTouchTypingProps): React.ReactElement => {
  const text = exercise.join('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const onInputValueChange = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== text[textIndex]) {
      return;
    }

    setTextIndex(index => index + 1);
  };

  return (
    <div className={classNames(styles.root, className)}>
      <input
        aria-hidden="true"
        data-testid="input"
        className={styles.input}
        ref={inputRef}
        autoFocus={true}
        onBlur={() => inputRef.current?.focus()}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyPress={onInputValueChange}
      ></input>
      <ExerciseTextBlock exercise={exercise} userInputText={inputValue} />
      <object
        id="keyboard-svg"
        className={styles.keyboardSvg}
        type="image/svg+xml"
        data={KeyboardSvg}
      >
        Keyboard SVG
      </object>
    </div>
  );
};

export default HebrewTouchTyping;
