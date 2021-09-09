import React from 'react';
import HebrewTouchTyping from '../HebrewTouchTyping/HebrewTouchTyping';
import { exercise } from '../exercises/hebrew-origins';

const HebrewTouchTypingPage = (): React.ReactElement => {
  return (
    <HebrewTouchTyping
      exercise={{
        text: 'שורה 1 שורה 2',
        lines: [7],
      }}
    />
  );
};

export default HebrewTouchTypingPage;
