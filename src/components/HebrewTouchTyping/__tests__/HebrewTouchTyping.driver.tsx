import React from 'react';
import {screen, fireEvent} from '@testing-library/react';
import HebrewTouchTyping from '../HebrewTouchTyping';
import {renderWithProviders} from '../../../utils/renderWithProviders';
import {LettersExercise} from '../../../utils/generateLetterExercises';
import {ExerciseType} from '../../../constants/practiceAndReviewLetterSets';
import SideBar from '../../SideBar/SideBar';
import userEvent from '@testing-library/user-event';

export type HebrewTouchTypingDriver = {
  when: {
    render: () => Element;
    textIsTyped: (text: string) => void;
    exerciseIsSelected: (exerciseNumberLabel: string) => void;
  };
  get: {
    textLength: () => number;
    statelessLetters: () => HTMLElement[];
    correctLetters: () => Promise<HTMLElement[]>;
    incorrectLetters: () => HTMLElement[];
    currentLetter: () => HTMLElement | null;
  };
};
export const getDriver = (): HebrewTouchTypingDriver => {
  const initialExercise: LettersExercise = {
    index: 0,
    type: ExerciseType.REVIEW,
    text: ['שורה 1 ', 'שורה 2'],
    newLetters: ['1', '2'],
  };
  return {
    when: {
      render: (): Element => {
        const {baseElement} = renderWithProviders(
          <>
            <SideBar />
            <HebrewTouchTyping />
          </>,
          {
            initialExercise,
          },
        );
        return baseElement;
      },
      textIsTyped: (text: string) => {
        const input = screen.getByTestId('input');
        fireEvent.change(input, {
          target: {value: text},
        });
      },
      exerciseIsSelected: (exerciseNumberLabel: string) => {
        userEvent.click(screen.getByText(exerciseNumberLabel));
      },
    },
    get: {
      textLength: () => initialExercise.text.join('').length,
      statelessLetters: () => {
        return screen.queryAllByTestId('letter');
      },
      correctLetters: async () => {
        return await screen.findAllByTestId('correctLetter').catch(() => []);
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
