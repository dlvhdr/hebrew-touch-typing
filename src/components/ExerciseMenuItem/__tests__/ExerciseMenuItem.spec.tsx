import React from 'react';
import {screen} from '@testing-library/react';
import ExerciseMenuItem from '../ExerciseMenuItem';
import {
  ExerciseType,
  LettersExercise,
} from '../../../utils/generateLetterExercises';
import {renderWithProviders} from '../../../utils/renderWithProviders';

const exercise: LettersExercise = {
  index: 22,
  newLetters: ['כ', 'ח'],
  type: ExerciseType.PRACTICE,
  text: ['כח כחחחכ חכחכח'],
};

describe('ExerciseMenuItem', () => {
  it('should render the exercise number', () => {
    renderWithProviders(<ExerciseMenuItem exercise={exercise} />);

    screen.debug();
    expect(screen.getByText(/23/i)).toBeDefined();
  });

  it('should render the exercise name', () => {
    renderWithProviders(<ExerciseMenuItem exercise={exercise} />);

    expect(screen.getByText(/כ/i)).toBeDefined();
    expect(screen.getByText(/ח/i)).toBeDefined();
  });
});
