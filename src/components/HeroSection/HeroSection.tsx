import React from 'react';
import {KeyboardWarriorSvg} from '../HebrewTouchTyping/KeyboardWarriorSvg';
import * as styles from './hero-section.scss';

const HeroSection = (): JSX.Element => {
  return (
    <div className={styles.emptyState}>
      <h1>האתר ללמוד בו הקלדה עיוורת בעברית</h1>
      <KeyboardWarriorSvg />
    </div>
  );
};

export default HeroSection;
