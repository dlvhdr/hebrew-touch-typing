import React from 'react';
import * as styles from './letter-keycap.scss';

interface LetterKeycapProps {
  letter: string;
}

const LetterKeycap: React.FC<LetterKeycapProps> = ({letter}) => {
  return (
    <div className={styles.root}>
      <span className={styles.letter}>{letter}</span>
    </div>
  );
};

export default LetterKeycap;
