import React from 'react';
import {render, screen} from '@testing-library/react';
import ExerciseMenuItem from '../ExerciseMenuItem';
import {
  ExerciseType,
  LettersExercise,
} from '../../../utils/generateLetterExercises';

const exercise: LettersExercise = {
  index: 22,
  newLetters: ['כ', 'ח'],
  type: ExerciseType.PRACTICE,
  text: ['כח כחחחכ חכחכח'],
};

describe('ExerciseMenuItem', () => {
  it('should render the exercise number', () => {
    render(<ExerciseMenuItem exercise={exercise} />);

    expect(screen.getByText(/23/i)).toBeDefined();
  });

  it('should render the exercise name', () => {
    render(<ExerciseMenuItem exercise={exercise} />);

    expect(screen.getByText(/כ/i)).toBeDefined();
    expect(screen.getByText(/ח/i)).toBeDefined();
  });
});
