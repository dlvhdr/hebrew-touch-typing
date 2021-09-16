import React, {KeyboardEvent, useRef, useState} from 'react';
import ExerciseTextBlock from '../ExerciseTextBlock/ExerciseTextBlock';
import classNames from 'classnames';
import * as styles from './hebrew-touch-typing.scss';
import ExerciseTitle from '../ExerciseTitle/ExerciseTitle';
import {useExerciseContext} from '../ExerciseContext/ExerciseContext';
import {KeyboardWarriorSvg} from './KeyboardWarriorSvg';

interface HebrewTouchTypingProps {
  className?: string;
}

const HebrewTouchTyping = ({
  className,
}: HebrewTouchTypingProps): React.ReactElement | null => {
  const {selectedExercise} = useExerciseContext();
  if (selectedExercise == null) {
    return (
      <div className={styles.emptyState}>
        <h1>האתר ללמוד בו הקדלה עיוורת בעברית</h1>
        <KeyboardWarriorSvg />
      </div>
    );
  }

  const text = selectedExercise.text.join('');
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
      <ExerciseTitle className={styles.title} />
      <ExerciseTextBlock userInputText={inputValue} />
      {/* <object
        id="keyboard-svg"
        className={styles.keyboardSvg}
        type="image/svg+xml"
        data={KeyboardSvg}
      >
        Keyboard SVG
      </object> */}
    </div>
  );
};

export default HebrewTouchTyping;
