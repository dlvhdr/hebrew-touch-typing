import React from 'react';
import {ExerciseType} from '../../utils/generateLetterExercises';
import {useExerciseContext} from '../ExerciseContext/ExerciseContext';
import * as styles from './exercise-title.scss';

const ExerciseTitle = (): JSX.Element | null => {
  const {selectedExercise} = useExerciseContext();
  if (selectedExercise == null) {
    return null;
  }

  return (
    <div>
      <h1 className={styles.title}>
        {selectedExercise.type === ExerciseType.REVIEW ? 'שיעור' : 'תרגול'}
      </h1>
    </div>
  );
};

export default ExerciseTitle;
