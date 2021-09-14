import React, {useMemo} from 'react';
import {getFullListOfPracticeAndReviewExercises} from '../../utils/generateLetterExercises';
import ExerciseMenuItem from '../ExerciseMenuItem/ExerciseMenuItem';

import * as styles from './side-bar.scss';

const SideBar: React.FC = () => {
  const exercises = useMemo(() => {
    return getFullListOfPracticeAndReviewExercises();
  }, []);

  return (
    <div className={styles.root}>
      <h1>הקלדה עיוורת</h1>
      <div className={styles.exercises}>
        {exercises.map(exercise => (
          <ExerciseMenuItem key={exercise.index} exercise={exercise} />
        ))}
      </div>
    </div>
  );
};

export default SideBar;
