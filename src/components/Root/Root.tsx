import React from 'react';
import HebrewTouchTyping from '../HebrewTouchTyping/HebrewTouchTyping';
import SideBar from '../SideBar/SideBar';
import {ExerciseProvider} from '../ExerciseContext/ExerciseContext';
import * as styles from './root.scss';
import {UserDataProvider} from '../UserDataProvider/UserDataProvider';

const HebrewTouchTypingPage = (): React.ReactElement => {
  return (
    <div className={styles.root}>
      <a href="https://dlvhdr.me" className={styles.dlvhdr}>
        <h3>DLVHDR</h3>
      </a>
      <ExerciseProvider>
        <UserDataProvider>
          <SideBar />
          <HebrewTouchTyping />
        </UserDataProvider>
      </ExerciseProvider>
    </div>
  );
};

export default HebrewTouchTypingPage;
