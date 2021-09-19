import React from 'react';
import {getNumOfCorrectCharacters} from '../../utils/exerciseUtils';
import {CheckmarkSvg} from './CheckmarkSvg';
import * as styles from './exercise-complete-card.scss';

interface ExerciseCompleteCardProps {
  wpm: number;
  inputText: string;
  exerciseText: string;
}

const ExerciseComponentCard = ({
  wpm,
  inputText,
  exerciseText,
}: ExerciseCompleteCardProps): JSX.Element => {
  const percent =
    (getNumOfCorrectCharacters(inputText, exerciseText) / exerciseText.length) *
    100;
  return (
    <div className={styles.root} data-testid="exercise-completed-card">
      <CheckmarkSvg />
      <div className={styles.stats}>
        <p>🔥 {wpm.toFixed(0)} WPM</p>
        <p>✨ {percent.toFixed(0)}%</p>
      </div>
    </div>
  );
};

export default ExerciseComponentCard;
