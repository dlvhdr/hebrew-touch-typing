import React from 'react';
import {screen} from '@testing-library/react';
import ExerciseMenuItem from '../ExerciseMenuItem';
import {LettersExercise} from '../../../utils/generateLetterExercises';
import {renderWithProviders} from '../../../utils/renderWithProviders';
import {ExerciseType} from '../../../constants/practiceAndReviewLetterSets';

const exercise: LettersExercise = {
  index: 22,
  newLetters: ['כ', 'ח'],
  type: ExerciseType.PRACTICE,
  text: ['כח כחחחכ חכחכח'],
};

describe('ExerciseMenuItem', () => {
  it('should render the exercise number', () => {
    renderWithProviders(<ExerciseMenuItem exercise={exercise} />);

    expect(screen.getByText(/23/i)).toBeDefined();
  });

  it('should render the exercise name', () => {
    renderWithProviders(<ExerciseMenuItem exercise={exercise} />);

    expect(screen.getByText(/כ/i)).toBeDefined();
    expect(screen.getByText(/ח/i)).toBeDefined();
  });
});
