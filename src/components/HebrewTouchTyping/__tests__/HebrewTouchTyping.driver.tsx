import React from 'react';
import {screen, fireEvent} from '@testing-library/react';
import HebrewTouchTyping from '../HebrewTouchTyping';
import {renderWithProviders} from '../../../utils/renderWithProviders';
import {
  ExerciseType,
  LettersExercise,
} from '../../../utils/generateLetterExercises';

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
  const exercise: LettersExercise = {
    index: 0,
    type: ExerciseType.REVIEW,
    text,
    newLetters: ['1', '2'],
  };
  return {
    when: {
      render: (): Element => {
        const {baseElement} = renderWithProviders(<HebrewTouchTyping />, {
          initialExercise: exercise,
        });
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
