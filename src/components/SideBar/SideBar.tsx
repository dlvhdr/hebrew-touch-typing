import React from 'react';
import ExerciseList from '../ExerciseList/ExerciseList';

import * as styles from './side-bar.scss';

const SideBar: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>הקלדה עיוורת</h1>
      <ExerciseList />
    </div>
  );
};

export default SideBar;
