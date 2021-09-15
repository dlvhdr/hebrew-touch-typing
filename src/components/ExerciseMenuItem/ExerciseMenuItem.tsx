import React from 'react';
import {
  ExerciseType,
  LettersExercise,
} from '../../utils/generateLetterExercises';
import {useExerciseContext} from '../ExerciseContext/ExerciseContext';
import LetterKeycap from '../LetterKeycap/LetterKeycap';
import * as styles from './exercise-menu-item.scss';

interface ExerciseMenuItemProps {
  exercise: LettersExercise;
}

const ExerciseMenuItem: React.FC<ExerciseMenuItemProps> = ({exercise}) => {
  const {setSelectedExercise} = useExerciseContext();

  return (
    <div
      className={styles.root}
      data-testid="exercise-menu-item"
      role="button"
      onClick={() => setSelectedExercise(exercise)}
    >
      <div className={styles.lessonType}>
        {exercise.type === ExerciseType.PRACTICE ? 'תרגול' : 'שיעור'}
      </div>
      <div className={styles.keycaps}>
        {exercise.newLetters.map(letter => (
          <LetterKeycap key={letter} letter={letter} />
        ))}
      </div>
      <div className={styles.exerciseNumberPill}>{exercise.index + 1}</div>
    </div>
  );
};

export default ExerciseMenuItem;
