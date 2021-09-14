import React, {useMemo} from 'react';
import {getFullListOfPracticeAndReviewExercises} from '../../utils/generateLetterExercises';
import ExerciseList from '../ExerciseList/ExerciseList';

import * as styles from './side-bar.scss';

const SideBar: React.FC = () => {
  const exercises = useMemo(() => {
    return getFullListOfPracticeAndReviewExercises();
  }, []);

  return (
    <div className={styles.root}>
      <h1>הקלדה עיוורת</h1>
      <ExerciseList
        className={styles.list}
        title="שיעורי אותיות"
        emoji="⌨️"
        exercises={exercises}
      />
      <ExerciseList title="טקסטים" emoji="️📖" exercises={[]} />
    </div>
  );
};

export default SideBar;
