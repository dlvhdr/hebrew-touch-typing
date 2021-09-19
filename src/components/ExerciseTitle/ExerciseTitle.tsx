import classNames from 'classnames';
import React from 'react';
import {ExerciseType} from '../../constants/practiceAndReviewLetterSets';
import {useExerciseContext} from '../ExerciseContext/ExerciseContext';
import LetterKeycap from '../LetterKeycap/LetterKeycap';
import * as styles from './exercise-title.scss';

interface ExerciseTitleProps {
  className?: string;
}

const ExerciseTitle = ({className}: ExerciseTitleProps): JSX.Element | null => {
  const {selectedExercise} = useExerciseContext();
  if (selectedExercise == null) {
    return null;
  }

  return (
    <div className={classNames(styles.root, className)}>
      <h1 className={styles.title}>
        {selectedExercise.type === ExerciseType.REVIEW ? 'שיעור' : 'תרגול'}
      </h1>
      <div className={styles.divider} />
      <div className={styles.newLetters}>
        <LetterKeycap letter={selectedExercise.newLetters[0]} />
        <LetterKeycap letter={selectedExercise.newLetters[1]} />
      </div>
    </div>
  );
};

export default ExerciseTitle;
