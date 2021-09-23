import classNames from 'classnames';
import React, {useState} from 'react';
import {Exercise} from '../../utils/generateLetterExercises';
import ExerciseMenuItem from '../ExerciseMenuItem/ExerciseMenuItem';
import * as styles from './exercise-list.scss';
import ExpandIcon from './ExpandIcon';

interface ExerciseListProps {
  exercises: Exercise[];
  title: string;
  emoji: string;
  className?: string;
}

const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  title,
  emoji,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={classNames(styles.root, className)}>
      <button
        className={styles.header}
        aria-label="expand or collapse toggle"
        onClick={() => setIsExpanded(expanded => !expanded)}
      >
        <ExpandIcon isExpanded={isExpanded} />
        <h3>{title}</h3>
        <span>{emoji}</span>
      </button>
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
