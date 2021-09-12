import React, {useMemo} from 'react';
import HebrewTouchTyping from '../components/HebrewTouchTyping/HebrewTouchTyping';

import './root.scss';
import {getFullListOfPracticeAndReviewExercises} from '../utils/generateLetterExercises';

const HebrewTouchTypingPage = (): React.ReactElement => {
  const exercises = useMemo(() => {
    return getFullListOfPracticeAndReviewExercises();
  }, []);
  const exerciseNumber = useMemo(() => {
    return Math.floor(Math.random() * exercises.length);
  }, []);

  return <HebrewTouchTyping exercise={exercises[exerciseNumber].text} />;
};

export default HebrewTouchTypingPage;
