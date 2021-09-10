import React from 'react';
import HebrewTouchTyping from '../HebrewTouchTyping/HebrewTouchTyping';
import { exercise } from '../exercises/hebrew-origins';

import './root.scss';

const HebrewTouchTypingPage = (): React.ReactElement => {
  return (
    <HebrewTouchTyping
      exercise={exercise}
    />
  );
};

export default HebrewTouchTypingPage;
