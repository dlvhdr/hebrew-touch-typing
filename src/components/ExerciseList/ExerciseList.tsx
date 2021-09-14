import React, {useMemo, useState} from 'react';
import {getFullListOfPracticeAndReviewExercises} from '../../utils/generateLetterExercises';
import ExerciseMenuItem from '../ExerciseMenuItem/ExerciseMenuItem';
import * as styles from './exercise-list.scss';
import ExpandIcon from './ExpandIcon';

const ExerciseList: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const exercises = useMemo(() => {
    return getFullListOfPracticeAndReviewExercises();
  }, []);

  return (
    <div className={styles.root}>
      <div
        className={styles.header}
        role="button"
        aria-label="expand or collapse toggle"
        onClick={() => setIsExpanded(expanded => !expanded)}
      >
        <ExpandIcon isExpanded={isExpanded} />
        <h3>שיעורי אותיות</h3>
        <span>⌨️</span>
      </div>
      {isExpanded ? (
        <div className={styles.exercises}>
          {exercises.map(exercise => (
            <ExerciseMenuItem key={exercise.index} exercise={exercise} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ExerciseList;
