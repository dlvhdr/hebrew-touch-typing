import classNames from 'classnames';
import React from 'react';
import {ExerciseType} from '../../constants/practiceAndReviewLetterSets';
import {
  assertLettersExercise,
  isLettersExercise,
} from '../../utils/exerciseUtils';
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
        {selectedExercise.type === ExerciseType.REVIEW
          ? 'שיעור'
          : selectedExercise.type === ExerciseType.PRACTICE
          ? 'תרגול'
          : selectedExercise.label}
      </h1>
      {isLettersExercise(selectedExercise) && (
        <>
          <div className={styles.divider} />
          <div className={styles.newLetters}>
            <LetterKeycap
              letter={assertLettersExercise(selectedExercise).newLetters[0]}
            />
            <LetterKeycap
              letter={assertLettersExercise(selectedExercise).newLetters[1]}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ExerciseTitle;
