import React, {useMemo} from 'react';
import {
  getFullListOfPracticeAndReviewExercises,
  getListOfTextExercises,
} from '../../utils/generateLetterExercises';
import ExerciseList from '../ExerciseList/ExerciseList';

import * as styles from './side-bar.scss';

const SideBar: React.FC = () => {
  const lettersExercises = useMemo(() => {
    return getFullListOfPracticeAndReviewExercises();
  }, []);

  const textExercises = useMemo(() => {
    return getListOfTextExercises();
  }, []);

  return (
    <div className={styles.root}>
      <h1>הקלדה עיוורת</h1>
      <ExerciseList
        className={styles.list}
        title="שיעורי אותיות"
        emoji="⌨️"
        exercises={lettersExercises}
      />
      <ExerciseList title="טקסטים" emoji="️📖" exercises={textExercises} />
    </div>
  );
};

export default SideBar;
