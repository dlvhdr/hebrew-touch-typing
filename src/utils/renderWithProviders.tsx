import {render, RenderResult} from '@testing-library/react';
import React from 'react';
import {ExerciseProvider} from '../components/ExerciseContext/ExerciseContext';
import {LettersExercise} from './generateLetterExercises';

export const renderWithProviders = (
  element: React.ReactNode,
  {initialExercise}: {initialExercise: LettersExercise | null} = {
    initialExercise: null,
  },
): RenderResult => {
  return render(
    <ExerciseProvider initialExercise={initialExercise}>
      {element}
    </ExerciseProvider>,
  );
};
