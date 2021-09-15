import React from 'react';
import HebrewTouchTyping from '../HebrewTouchTyping/HebrewTouchTyping';
import SideBar from '../SideBar/SideBar';
import {ExerciseProvider} from '../ExerciseContext/ExerciseContext';
import * as styles from './root.scss';

const HebrewTouchTypingPage = (): React.ReactElement => {
  return (
    <div className={styles.root}>
      <ExerciseProvider>
        <SideBar />
        <HebrewTouchTyping className={styles.mainContent} />
      </ExerciseProvider>
    </div>
  );
};

export default HebrewTouchTypingPage;
