import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import HebrewTouchTyping from '../HebrewTouchTyping';

export type HebrewTouchTypingDriver = {
  when: {
    render: () => Element;
    textIsTyped: (text: string) => void;
  };
  get: {
    textLength: () => number;
    statelessLetters: () => HTMLElement[];
    correctLetters: () => HTMLElement[];
    incorrectLetters: () => HTMLElement[];
    currentLetter: () => HTMLElement | null;
  };
};
export const getDriver = (): HebrewTouchTypingDriver => {
  const text = ['שורה 1 ', 'שורה 2'];
  return {
    when: {
      render: (): Element => {
        const {baseElement} = render(<HebrewTouchTyping exercise={text} />);
        return baseElement;
      },
      textIsTyped: (text: string) => {
        const input = screen.getByTestId('input');
        fireEvent.change(input, {
          target: {value: text},
        });
      },
    },
    get: {
      textLength: () => text.join('').length,
      statelessLetters: () => {
        return screen.queryAllByTestId('letter');
      },
      correctLetters: () => {
        return screen.queryAllByTestId('correctLetter');
      },
      incorrectLetters: () => {
        return screen.queryAllByTestId('incorrectLetter');
      },
      currentLetter: () => {
        return screen.queryByTestId('currentLetter');
      },
    },
  };
};
