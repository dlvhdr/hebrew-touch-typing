import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import ExerciseTextBlock from '../ExerciseTextBlock/ExerciseTextBlock';
import classNames from 'classnames';
import * as styles from './hebrew-touch-typing.scss';
import ExerciseTitle from '../ExerciseTitle/ExerciseTitle';
import {useExerciseContext} from '../ExerciseContext/ExerciseContext';
import ExerciseCompleteCard from '../ExerciseCompleteCard/ExerciseCompleteCard';
import HeroSection from '../HeroSection/HeroSection';
import {useWPM} from '../../utils/useWPM';
import {KeyboardSvg} from '../KeyboardSvg/KeyboardSvg';
import {useUserDataContext} from '../UserDataProvider/UserDataProvider';
import {normalizeGeresh} from '../../utils/normalizeGeresh';

interface HebrewTouchTypingProps {
  className?: string;
}

const HebrewTouchTyping = ({
  className,
}: HebrewTouchTypingProps): React.ReactElement | null => {
  const {selectedExercise} = useExerciseContext();
  const [isExerciseComplete, setIsExerciseComplete] = useState(false);
  const text = useMemo(
    () => selectedExercise?.text.join('') ?? '',
    [selectedExercise],
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState('');
  const {wpm, elapsedTimeSeconds, resetWPM} = useWPM(inputValue, text);
  const isFinished = text.length === inputValue.length;
  const {persistExerciseIfNewRecord} = useUserDataContext();

  const currentLetter = useMemo(() => {
    return text[Math.max(0, inputValue.length)];
  }, [inputValue, text]);

  useEffect(() => {
    setInputValue('');
    setIsExerciseComplete(false);
    resetWPM();
  }, [resetWPM, selectedExercise]);

  const onExerciseCompleted = useCallback(() => {
    if (selectedExercise == null) {
      return;
    }

    persistExerciseIfNewRecord({
      exerciseIndex: selectedExercise.index,
      wpmRecord: wpm,
    });
    setIsExerciseComplete(true);
  }, [persistExerciseIfNewRecord, selectedExercise, wpm]);

  const onInputChanged = useCallback(
    (newText: string) => {
      if (selectedExercise == null || isExerciseComplete) {
        return;
      }

      const normalizedText = normalizeGeresh(newText);
      setInputValue(normalizedText);
      if (newText.length === text.length) {
        onExerciseCompleted();
      }
    },
    [isExerciseComplete, onExerciseCompleted, selectedExercise, text.length],
  );

  if (selectedExercise == null) {
    return <HeroSection />;
  }

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
        onChange={e => onInputChanged(e.target.value)}
      ></input>
      <ExerciseTitle className={styles.title} />
      <ExerciseTextBlock userInputText={inputValue} />
      <div
        className={classNames(styles.wpm, {
          [styles.wpmShown]: elapsedTimeSeconds > 1 && !isFinished,
        })}
      >
        {wpm.toFixed(0)} WPM
      </div>
      {isExerciseComplete ? (
        <ExerciseCompleteCard
          wpm={wpm}
          inputText={inputValue}
          exerciseText={text}
        />
      ) : (
        <KeyboardSvg currentLetter={currentLetter} />
      )}
    </div>
  );
};

export default HebrewTouchTyping;
