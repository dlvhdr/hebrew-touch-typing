import {render, RenderOptions, RenderResult} from '@testing-library/react';
import React, {ReactElement} from 'react';
import {ExerciseProvider} from '../components/ExerciseContext/ExerciseContext';
import {UserDataProvider} from '../components/UserDataProvider/UserDataProvider';
import {LettersExercise} from './generateLetterExercises';

export const renderWithProviders = (
  element: ReactElement,
  {initialExercise}: {initialExercise: LettersExercise | null} = {
    initialExercise: null,
  },
  renderOptions?: Omit<RenderOptions, 'wrapper'>,
): RenderResult => {
  const CustomExerciseProvider: React.FC = ({children}): JSX.Element => {
    return (
      <ExerciseProvider initialExercise={initialExercise}>
        <UserDataProvider>{children}</UserDataProvider>
      </ExerciseProvider>
    );
  };
  return render(element, {wrapper: CustomExerciseProvider, ...renderOptions});
};
