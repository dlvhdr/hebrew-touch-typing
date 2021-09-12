import React, {useMemo} from 'react';
import HebrewTouchTyping from '../HebrewTouchTyping/HebrewTouchTyping';
import {getFullListOfPracticeAndReviewExercises} from '../../utils/generateLetterExercises';
import SideBar from '../SideBar/SideBar';

import * as styles from './root.scss';

const HebrewTouchTypingPage = (): React.ReactElement => {
  const exercises = useMemo(() => {
    return getFullListOfPracticeAndReviewExercises();
  }, []);
  const exerciseNumber = useMemo(() => {
    return Math.floor(Math.random() * exercises.length);
  }, []);

  return (
    <div className={styles.root}>
      <SideBar />
      <HebrewTouchTyping
        className={styles.mainContent}
        exercise={exercises[exerciseNumber].text}
      />
    </div>
  );
};

export default HebrewTouchTypingPage;
